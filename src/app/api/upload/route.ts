import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Media } from "@/models/Media";
import { uploadToImageKit, deleteFromImageKit } from "@/features/file-upload/services/imagekit.service";
import { headers } from "next/headers";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

// POST: Upload file directly to ImageKit Cloud (no local file storage)
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const reqHeaders = await headers();

    // Rate Limit: Max 20 uploads per 10 minutes per IP
    const clientIp = reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || reqHeaders.get("x-real-ip") || "127.0.0.1";
    const { checkRateLimit } = await import("@/lib/rate-limiter");
    const rateCheck = checkRateLimit(`upload_${clientIp}`, 20, 10 * 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { success: false, error: "Too many file upload requests. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    let fileMetadata = { name: "", type: "", size: 0, folder: "documents", buffer: Buffer.alloc(0) };

    if (contentType.includes("application/json")) {
      const body = await req.json();
      fileMetadata.name = body.fileName;
      fileMetadata.type = body.mimeType;
      fileMetadata.folder = body.folder || "documents";
      fileMetadata.buffer = Buffer.from(body.fileData, "base64");
      fileMetadata.size = fileMetadata.buffer.length;
    } else {
      const formData = await req.formData();
      const file = formData.get("file") as File;

      if (!file) {
        return NextResponse.json({ success: false, error: "No file provided." }, { status: 400 });
      }

      fileMetadata.name = file.name;
      fileMetadata.type = file.type;
      fileMetadata.size = file.size;
      fileMetadata.folder = (formData.get("folder") as string) || "documents";
      const bytes = await file.arrayBuffer();
      fileMetadata.buffer = Buffer.from(bytes);
    }

    if (!fileMetadata.buffer.length) {
      return NextResponse.json({ success: false, error: "No file provided." }, { status: 400 });
    }

    // Security: File size check
    if (fileMetadata.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: "File size exceeds 10MB limit." }, { status: 400 });
    }

    // Security: MIME type check
    if (!ALLOWED_MIME_TYPES.includes(fileMetadata.type)) {
      return NextResponse.json({ success: false, error: "Forbidden file type. Only PDF and JPG/PNG images are allowed." }, { status: 400 });
    }

    const { randomBytes } = await import("crypto");
    const sanitizedName = fileMetadata.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const cryptoNonce = randomBytes(8).toString("hex");
    const uniqueFilename = `${Date.now()}-${cryptoNonce}-${sanitizedName}`;

    // Upload directly to ImageKit Cloud
    let uploadResponse;
    try {
      uploadResponse = await uploadToImageKit(fileMetadata.buffer, fileMetadata.folder, uniqueFilename);
    } catch (err: any) {
      console.error("[ImageKit upload error]:", err);
      return NextResponse.json(
        { success: false, error: `ImageKit cloud upload failed: ${err.message || "Unknown error"}` },
        { status: 500 }
      );
    }

    const mediaRecord = await Media.create({
      fileId: uploadResponse.fileId,
      url: uploadResponse.url,
      path: uploadResponse.filePath,
      fileName: fileMetadata.name,
      folder: uploadResponse.filePath.substring(0, uploadResponse.filePath.lastIndexOf('/')),
      type: fileMetadata.type,
      size: fileMetadata.size,
    });

    return NextResponse.json({
      success: true,
      message: "File uploaded to ImageKit Cloud!",
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      media: mediaRecord,
    });

  } catch (error: any) {
    console.error("File upload error:", error);
    return NextResponse.json({ success: false, error: error.message || "File upload failed." }, { status: 500 });
  }
}

// DELETE: Disallowed via public user portal (manage in Admin portal)
export async function DELETE() {
  return NextResponse.json(
    { success: false, error: "Forbidden: Media deletion is not permitted from public portal." },
    { status: 403 }
  );
}
