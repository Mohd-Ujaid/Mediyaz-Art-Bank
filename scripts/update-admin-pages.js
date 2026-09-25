const fs = require('fs');
const path = require('path');

const mediyazRoot = path.resolve(__dirname, '../../../../mediyaz');

// 1. Update Egg page.tsx
const eggPagePath = path.join(mediyazRoot, 'src/app/admin/donor-registrations/egg/page.tsx');
let eggContent = fs.readFileSync(eggPagePath, 'utf8');

// Table Header replacement
const eggOldThead = `<th className="p-3.5">Registration ID</th>
                  <th className="p-3.5">Applicant Name</th>
                  <th className="p-3.5">Gender</th>`;

const eggNewThead = `<th className="p-3.5">Registration ID</th>
                  <th className="p-3.5">Applicant Name</th>
                  <th className="p-3.5">Agent / Sourced By</th>
                  <th className="p-3.5">Gender</th>`;

// Table Row replacement
const eggOldRow = `<td className="p-3.5 font-semibold text-foreground">
                      {reg.personalInfo?.fullName || "Awaiting Name"}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300 border border-pink-200">
                        Female
                      </span>
                    </td>`;

const eggNewRow = `<td className="p-3.5 font-semibold text-foreground">
                      {reg.personalInfo?.fullName || "Awaiting Name"}
                    </td>
                    <td className="p-3.5">
                      {reg.agentName || reg.agentId?.fullName || reg.agentCode ? (
                        <div className="space-y-0.5">
                          <div className="font-semibold text-teal-800 dark:text-teal-300 flex items-center gap-1">
                            <span className="text-xs">👤</span>
                            <span>{reg.agentName || reg.agentId?.fullName || "Agent"}</span>
                          </div>
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border border-teal-200">
                            {reg.agentCode || reg.agentId?.agentCode}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-foreground italic">Direct Walk-in</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300 border border-pink-200">
                        Female
                      </span>
                    </td>`;

// Dialog replacement - add Agent section above Grid Overview
const eggOldDialog = `{/* Grid Overview */}`;
const eggNewDialog = `{/* Sourcing Agent / Referral Information */}
              <div className="rounded-xl border p-4 bg-teal-50/40 dark:bg-teal-950/20 border-teal-200/60 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-teal-600" />
                  <span>Sourcing Agent / Referral Details</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Sourced By / Agent: </span>
                    <div className="font-bold text-foreground mt-0.5">
                      {selectedReg.agentName || selectedReg.agentId?.fullName || (selectedReg.agentCode ? \`Agent (\${selectedReg.agentCode})\` : "Direct Walk-in / Self")}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Agent Referral Code: </span>
                    <div className="font-mono font-bold text-teal-700 dark:text-teal-300 mt-0.5">
                      {selectedReg.agentCode || selectedReg.agentId?.agentCode || "None (Direct)"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Commission & Payout: </span>
                    <div className="font-bold text-foreground mt-0.5">
                      {selectedReg.agentPayout?.amount ? \`₹\${selectedReg.agentPayout.amount.toLocaleString()} (\${selectedReg.agentPayout.status || "PENDING"})\` : "Not Applicable"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Overview */}`;

if (eggContent.includes(eggOldThead)) {
  eggContent = eggContent.replace(eggOldThead, eggNewThead);
}
if (eggContent.includes(eggOldRow)) {
  eggContent = eggContent.replace(eggOldRow, eggNewRow);
}
if (eggContent.includes(eggOldDialog) && !eggContent.includes('Sourcing Agent / Referral Details')) {
  eggContent = eggContent.replace(eggOldDialog, eggNewDialog);
}
fs.writeFileSync(eggPagePath, eggContent, 'utf8');
console.log('Updated Egg admin page with agent columns and dialog card');

// 2. Update Sperm page.tsx
const spermPagePath = path.join(mediyazRoot, 'src/app/admin/donor-registrations/sperm/page.tsx');
let spermContent = fs.readFileSync(spermPagePath, 'utf8');

const spermOldThead = `<th className="p-3.5">Registration ID</th>
                  <th className="p-3.5">Donor Name</th>
                  <th className="p-3.5">Gender</th>`;

const spermNewThead = `<th className="p-3.5">Registration ID</th>
                  <th className="p-3.5">Donor Name</th>
                  <th className="p-3.5">Agent / Sourced By</th>
                  <th className="p-3.5">Gender</th>`;

const spermOldRow = `<td className="p-3.5 font-semibold text-foreground">
                      {reg.personalInfo?.fullName || "Awaiting Name"}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200">
                        Male
                      </span>
                    </td>`;

const spermNewRow = `<td className="p-3.5 font-semibold text-foreground">
                      {reg.personalInfo?.fullName || "Awaiting Name"}
                    </td>
                    <td className="p-3.5">
                      {reg.agentName || reg.agentId?.fullName || reg.agentCode ? (
                        <div className="space-y-0.5">
                          <div className="font-semibold text-teal-800 dark:text-teal-300 flex items-center gap-1">
                            <span className="text-xs">👤</span>
                            <span>{reg.agentName || reg.agentId?.fullName || "Agent"}</span>
                          </div>
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border border-teal-200">
                            {reg.agentCode || reg.agentId?.agentCode}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-foreground italic">Direct Walk-in</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200">
                        Male
                      </span>
                    </td>`;

const spermOldDialog = `{/* Grid Overview */}`;
const spermNewDialog = `{/* Sourcing Agent / Referral Information */}
              <div className="rounded-xl border p-4 bg-teal-50/40 dark:bg-teal-950/20 border-teal-200/60 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-2">
                  <Dna className="w-3.5 h-3.5 text-teal-600" />
                  <span>Sourcing Agent / Referral Details</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Sourced By / Agent: </span>
                    <div className="font-bold text-foreground mt-0.5">
                      {selectedReg.agentName || selectedReg.agentId?.fullName || (selectedReg.agentCode ? \`Agent (\${selectedReg.agentCode})\` : "Direct Walk-in / Self")}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Agent Referral Code: </span>
                    <div className="font-mono font-bold text-teal-700 dark:text-teal-300 mt-0.5">
                      {selectedReg.agentCode || selectedReg.agentId?.agentCode || "None (Direct)"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Commission & Payout: </span>
                    <div className="font-bold text-foreground mt-0.5">
                      {selectedReg.agentPayout?.amount ? \`₹\${selectedReg.agentPayout.amount.toLocaleString()} (\${selectedReg.agentPayout.status || "PENDING"})\` : "Not Applicable"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Overview */}`;

if (spermContent.includes(spermOldThead)) {
  spermContent = spermContent.replace(spermOldThead, spermNewThead);
}
if (spermContent.includes(spermOldRow)) {
  spermContent = spermContent.replace(spermOldRow, spermNewRow);
}
if (spermContent.includes(spermOldDialog) && !spermContent.includes('Sourcing Agent / Referral Details')) {
  spermContent = spermContent.replace(spermOldDialog, spermNewDialog);
}
fs.writeFileSync(spermPagePath, spermContent, 'utf8');
console.log('Updated Sperm admin page with agent columns and dialog card');
