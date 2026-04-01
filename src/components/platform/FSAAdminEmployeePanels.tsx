"use client";

import { useState } from "react";
import { Maximize2, X, CheckCircle2 } from "lucide-react";

const ADMIN_COLOR = "#0d9488";
const EMPLOYEE_COLOR = "#1e3a5f";

/* ── Shared browser frame ──────────────────────────────────────────── */
function BrowserFrame({
  color,
  appLabel,
  children,
}: {
  color: string;
  appLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white">
      <div className="bg-slate-100 px-3 py-2 flex items-center gap-1.5 border-b border-slate-200">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 bg-white rounded px-2 py-0.5 text-[9px] text-slate-400 font-mono truncate">
          app.mixcarehealth.com
        </div>
      </div>
      <div
        className="px-3 py-2 flex items-center gap-2 border-b border-slate-100 text-xs font-bold"
        style={{ background: `linear-gradient(135deg, ${color}18 0%, ${color}06 100%)`, color }}
      >
        <div
          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-white text-[8px] font-black"
          style={{ backgroundColor: color }}
        >
          M
        </div>
        {appLabel}
      </div>
      <div className="bg-[#f8fafc]">{children}</div>
    </div>
  );
}

/* ── Admin dashboard mockup ────────────────────────────────────────── */
function AdminMockup() {
  const wallets = [
    { name: "Healthcare", alloc: 3000, used: 1240 },
    { name: "Wellness", alloc: 1500, used: 890 },
    { name: "Dental & Vision", alloc: 800, used: 120 },
  ];
  return (
    <BrowserFrame color={ADMIN_COLOR} appLabel="FSA Admin Portal">
      <div className="p-4 space-y-3">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[["342", "Employees"], ["3", "Wallets"], ["74%", "Utilised"]].map(([v, l]) => (
            <div key={l} className="bg-white rounded-xl p-2.5 text-center border border-slate-100 shadow-sm">
              <p className="text-[11px] font-black" style={{ color: ADMIN_COLOR }}>{v}</p>
              <p className="text-[8px] text-slate-400 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
        {/* Wallets */}
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Wallets</p>
        <div className="space-y-2">
          {wallets.map((w) => (
            <div key={w.name} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="font-bold text-slate-700">{w.name}</span>
                <span className="text-slate-500 font-mono">
                  HK${w.used.toLocaleString()} / HK${w.alloc.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(w.used / w.alloc) * 100}%`, backgroundColor: ADMIN_COLOR }}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <div
            className="flex-1 py-1.5 rounded-lg text-center text-[9px] font-bold text-white"
            style={{ backgroundColor: ADMIN_COLOR }}
          >
            + Add Employee
          </div>
          <div
            className="flex-1 py-1.5 rounded-lg text-center text-[9px] font-bold border"
            style={{ borderColor: ADMIN_COLOR, color: ADMIN_COLOR }}
          >
            Export Report
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ── Employee app mockup ───────────────────────────────────────────── */
function EmployeeMockup() {
  const transactions = [
    { name: "PacificCare Clinic", cat: "Healthcare", amt: "-HK$280", emoji: "🏥" },
    { name: "Pure Fitness", cat: "Wellness", amt: "-HK$580", emoji: "💪" },
    { name: "Mind Health Ctr.", cat: "Mental Health", amt: "-HK$480", emoji: "🧠" },
  ];
  return (
    <BrowserFrame color={EMPLOYEE_COLOR} appLabel="My Benefits · Sarah L.">
      <div className="p-4 space-y-3">
        {/* Balance card */}
        <div
          className="rounded-xl p-4 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${EMPLOYEE_COLOR} 0%, #2d5986 100%)` }}
        >
          <p className="text-[9px] uppercase tracking-widest opacity-70 mb-1">Available Balance</p>
          <p className="text-2xl font-black mb-0.5">HK$2,400</p>
          <p className="text-[9px] opacity-60">Healthcare Wallet</p>
        </div>
        {/* Category pills */}
        <div className="flex gap-1.5 flex-wrap">
          {["Medical", "Fitness", "Mental Health", "Dental"].map((c, i) => (
            <span
              key={c}
              className="text-[9px] font-semibold px-2 py-1 rounded-full"
              style={
                i === 0
                  ? { backgroundColor: EMPLOYEE_COLOR, color: "#fff" }
                  : { backgroundColor: "#f1f5f9", color: "#64748b" }
              }
            >
              {c}
            </span>
          ))}
        </div>
        {/* Transactions */}
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recent Spending</p>
        <div className="space-y-1.5">
          {transactions.map((tx) => (
            <div
              key={tx.name}
              className="bg-white rounded-xl px-3 py-2.5 border border-slate-100 flex items-center gap-2 shadow-sm"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                style={{ backgroundColor: EMPLOYEE_COLOR + "15" }}
              >
                {tx.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-slate-800 truncate">{tx.name}</p>
                <p className="text-[8px] text-slate-400">{tx.cat}</p>
              </div>
              <span className="text-[10px] font-bold" style={{ color: EMPLOYEE_COLOR }}>
                {tx.amt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ── Lightbox ──────────────────────────────────────────────────────── */
function Lightbox({
  type,
  onClose,
}: {
  type: "admin" | "employee";
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
        >
          <X size={16} className="text-slate-700" />
        </button>
        {type === "admin" ? <AdminMockup /> : <EmployeeMockup />}
        <p className="text-center text-white/50 text-xs mt-3">Click outside or × to close</p>
      </div>
    </div>
  );
}

/* ── Public component ──────────────────────────────────────────────── */
interface Props {
  headline: string;
  adminTitle: string;
  adminItems: string[];
  employeeTitle: string;
  employeeItems: string[];
}

export default function FSAAdminEmployeePanels({
  headline,
  adminTitle,
  adminItems,
  employeeTitle,
  employeeItems,
}: Props) {
  const [lightbox, setLightbox] = useState<"admin" | "employee" | null>(null);

  return (
    <>
      {lightbox && <Lightbox type={lightbox} onClose={() => setLightbox(null)} />}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">{headline}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* ── Admin ── */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl p-8 border border-slate-100" style={{ backgroundColor: "#f0fdfa" }}>
                <h3 className="text-xl font-bold mb-5" style={{ color: ADMIN_COLOR }}>
                  {adminTitle}
                </h3>
                <ul className="space-y-3">
                  {adminItems.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: ADMIN_COLOR }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group cursor-pointer" onClick={() => setLightbox("admin")}>
                <AdminMockup />
                <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 rounded-full px-4 py-2 flex items-center gap-2 text-sm font-semibold text-slate-700 shadow-lg">
                    <Maximize2 size={14} /> Click to enlarge
                  </div>
                </div>
              </div>
              <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                <Maximize2 size={9} /> Click mockup to enlarge
              </p>
            </div>

            {/* ── Employee ── */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl p-8 border border-slate-100" style={{ backgroundColor: "#eff6ff" }}>
                <h3 className="text-xl font-bold mb-5" style={{ color: EMPLOYEE_COLOR }}>
                  {employeeTitle}
                </h3>
                <ul className="space-y-3">
                  {employeeItems.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: EMPLOYEE_COLOR }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group cursor-pointer" onClick={() => setLightbox("employee")}>
                <EmployeeMockup />
                <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 rounded-full px-4 py-2 flex items-center gap-2 text-sm font-semibold text-slate-700 shadow-lg">
                    <Maximize2 size={14} /> Click to enlarge
                  </div>
                </div>
              </div>
              <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                <Maximize2 size={9} /> Click mockup to enlarge
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
