import crypto from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.PARTNER_AUTH_SECRET || process.env.NEXTAUTH_SECRET || "mediyaz_secure_partner_secret_2026";
const TOKEN_MAX_AGE_DAYS = 30;

export interface PartnerSessionPayload {
  agentCode: string;
  issuedAt: number;
  expiresAt: number;
}

/**
 * Creates an HMAC-SHA256 signed session token for Refer Partners.
 */
export function signPartnerToken(agentCode: string): string {
  const cleanCode = agentCode.trim().toUpperCase();
  const issuedAt = Date.now();
  const expiresAt = issuedAt + TOKEN_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${cleanCode}:${issuedAt}:${expiresAt}`;
  const signature = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

/**
 * Verifies a signed partner session token.
 */
export function verifyPartnerToken(token: string): PartnerSessionPayload | null {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  try {
    const payload = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const expectedSignature = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");

    if (!crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"))) {
      return null;
    }

    const [agentCode, issuedAtStr, expiresAtStr] = payload.split(":");
    const expiresAt = Number(expiresAtStr);

    if (Date.now() > expiresAt) {
      return null; // Expired token
    }

    return {
      agentCode,
      issuedAt: Number(issuedAtStr),
      expiresAt,
    };
  } catch {
    return null;
  }
}

/**
 * Helper to get verified partner from request cookies or Authorization header.
 */
export async function getVerifiedPartner(req: Request): Promise<string | null> {
  // 1. Check Authorization header
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    const verified = verifyPartnerToken(token);
    if (verified) return verified.agentCode;
  }

  // 2. Check cookies
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("mediyaz_partner_token")?.value;
    if (token) {
      const verified = verifyPartnerToken(token);
      if (verified) return verified.agentCode;
    }
  } catch {
    // Fallback reading directly from request header cookie
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/mediyaz_partner_token=([^;]+)/);
    if (match) {
      const verified = verifyPartnerToken(match[1]);
      if (verified) return verified.agentCode;
    }
  }

  return null;
}
