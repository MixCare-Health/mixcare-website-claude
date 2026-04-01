"use client";

import { useState } from "react";
import {
  ChevronDown, X, Maximize2,
  ShieldCheck, Stethoscope, Cpu, Banknote, Activity, Brain,
  CheckCircle2, Clock, MapPin, Globe, TrendingUp, Zap, Star, ArrowRight,
} from "lucide-react";

const ICONS  = [ShieldCheck, Stethoscope, Cpu, Banknote, Activity, Brain];
const COLORS = ["#0d9488", "#1e3a5f", "#0891b2", "#f97316", "#10b981", "#7c3aed"];

export type CapabilityText = { title: string; desc: string };

/* ── Browser-frame wrapper ─────────────────────────────────────────── */
function BrowserFrame({
  color, appLabel, children,
}: {
  color: string; appLabel: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-lg bg-white">
      {/* Chrome */}
      <div className="bg-slate-100 px-3 py-2 flex items-center gap-1.5 border-b border-slate-200">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 bg-white rounded px-2 py-0.5 text-[9px] text-slate-400 font-mono truncate">
          app.mixcarehealth.com
        </div>
      </div>
      {/* App header */}
      <div
        className="px-4 py-2.5 flex items-center gap-2 border-b border-slate-100 text-xs font-bold"
        style={{ background: `linear-gradient(135deg, ${color}18 0%, ${color}06 100%)`, color }}
      >
        <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: color }}>
          <span className="text-white text-[8px] font-black">M</span>
        </div>
        {appLabel}
        <div className="ml-auto flex gap-1">
          <div className="w-14 h-3 rounded-full bg-slate-200/60" />
          <div className="w-4 h-3 rounded bg-slate-200/60" />
        </div>
      </div>
      {/* Content */}
      <div className="bg-[#f8fafc]">{children}</div>
    </div>
  );
}

/* ── Individual mockup screens ─────────────────────────────────────── */
function Mockup0({ color }: { color: string }) { // Benefit Plans
  const tiers = ["Bronze", "Silver", "Gold"];
  return (
    <BrowserFrame color={color} appLabel="Benefit Plan Builder">
      <div className="p-4 space-y-3">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Plan Tier</p>
        <div className="grid grid-cols-3 gap-2">
          {tiers.map((t, i) => (
            <div
              key={t}
              className="rounded-lg border py-2.5 text-center text-[10px] font-bold transition-all"
              style={
                i === 1
                  ? { backgroundColor: color, borderColor: color, color: "#fff" }
                  : { borderColor: "#e2e8f0", color: "#64748b", backgroundColor: "#fff" }
              }
            >
              {i === 1 && <div className="text-[8px] mb-0.5 opacity-80">Selected</div>}
              {t}
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
            <span>Annual Coverage Limit</span><span className="font-bold" style={{ color }}>HK$3,000</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full w-3/5 rounded-full" style={{ backgroundColor: color }} />
          </div>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-500">Co-pay Rate</span>
          <div className="flex gap-1">
            {["0%","10%","20%","30%"].map((v,i)=>(
              <span key={v} className="px-1.5 py-0.5 rounded text-[9px] font-semibold" style={i===2?{backgroundColor:color,color:"#fff"}:{backgroundColor:"#f1f5f9",color:"#64748b"}}>{v}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {["Hong Kong","Macau","Singapore"].map((r,i)=>(
            <div key={r} className="flex items-center gap-1 text-[9px] font-semibold" style={{ color: i<2?color:"#94a3b8" }}>
              <CheckCircle2 size={9} /> {r}
            </div>
          ))}
        </div>
        <div className="pt-1">
          <div className="w-full py-2 rounded-lg text-center text-[10px] font-bold text-white" style={{ backgroundColor: color }}>
            Save Configuration
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function Mockup1({ color }: { color: string }) { // Panel Doctors
  const docs = [
    { name: "Dr. Sarah Chan", spec: "General Practice", loc: "Central, HK", avail: true },
    { name: "Dr. Michael Lam", spec: "Internal Medicine", loc: "Tsim Sha Tsui, HK", avail: true },
    { name: "Dr. Lee Wei", spec: "Paediatrician", loc: "Orchard, SG", avail: false },
  ];
  return (
    <BrowserFrame color={color} appLabel="Find a Panel Doctor">
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-slate-200 shadow-sm">
          <MapPin size={11} className="text-slate-400 flex-shrink-0" />
          <span className="text-[10px] text-slate-400">Search doctors near you…</span>
        </div>
        <div className="flex gap-1.5">
          {["Nearby","Available","All"].map((f,i)=>(
            <span key={f} className="text-[9px] font-semibold px-2 py-1 rounded-full" style={i===0?{backgroundColor:color,color:"#fff"}:{backgroundColor:"#f1f5f9",color:"#64748b"}}>{f}</span>
          ))}
        </div>
        <div className="space-y-2">
          {docs.map(d=>(
            <div key={d.name} className="bg-white rounded-xl p-3 border border-slate-100 flex items-start gap-2.5 shadow-sm">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold" style={{ backgroundColor: color + (d.avail?"":"80") }}>
                {d.name.split(" ").slice(-1)[0][0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-[10px] font-bold text-slate-800 truncate">{d.name}</p>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.avail?"#10b981":"#94a3b8" }} />
                    <span className="text-[8px]" style={{ color: d.avail?"#10b981":"#94a3b8" }}>{d.avail?"Available":"Busy"}</span>
                  </div>
                </div>
                <p className="text-[9px] text-slate-500">{d.spec}</p>
                <p className="text-[8px] text-slate-400 mt-0.5 flex items-center gap-0.5"><MapPin size={7}/>{d.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function Mockup2({ color }: { color: string }) { // AI Claims
  const claims = [
    { id:"CLMHK0234", type:"GP Visit",    amt:"HK$280",  status:"Approved",    ai:99 },
    { id:"CLMHK0233", type:"Specialist",  amt:"HK$620",  status:"Approved",    ai:97 },
    { id:"CLMHK0232", type:"Dental",      amt:"HK$480",  status:"Processing",  ai:null },
  ];
  return (
    <BrowserFrame color={color} appLabel="AI Claims Processing">
      <div className="p-4 space-y-3">
        {/* Pipeline */}
        <div className="flex items-center gap-0">
          {[["Submitted","3"],["AI Review","1"],["Approved","12"]].map(([label, count], i)=>(
            <div key={label} className="flex items-center">
              <div className={`flex flex-col items-center px-2 py-1.5 rounded-lg ${i===1?"text-white":"bg-white border border-slate-200"}`} style={i===1?{backgroundColor:color}:{}}>
                <p className="text-[11px] font-black" style={i===1?{color:"#fff"}:{color}}>{count}</p>
                <p className="text-[8px] font-medium" style={i===1?{color:"rgba(255,255,255,0.8)"}:{color:"#94a3b8"}}>{label}</p>
              </div>
              {i<2 && <div className="w-4 h-px mx-0.5" style={{ backgroundColor: color+"60" }} />}
            </div>
          ))}
        </div>
        {/* Claims list */}
        <div className="space-y-1.5">
          {claims.map(c=>(
            <div key={c.id} className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-slate-400">{c.id}</span>
                  <span className="text-[9px] font-semibold text-slate-700">{c.type}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-800">{c.amt}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full" style={c.status==="Approved"?{backgroundColor:color+"20",color}:{backgroundColor:"#fef3c7",color:"#d97706"}}>{c.status}</span>
                {c.ai && <span className="text-[8px] text-slate-400">AI: {c.ai}%</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-[9px] text-slate-400 bg-white rounded-lg px-3 py-2 border border-slate-100">
          <span>Avg. processing time</span><span className="font-bold" style={{ color }}>18h 24m</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

function Mockup3({ color }: { color: string }) { // Int'l Payouts
  const fx = [
    { flag:"🇭🇰", code:"HKD", bal:"128,450.00", chg:"+2.3%" },
    { flag:"🇸🇬", code:"SGD",  bal:" 18,200.00", chg:"+1.1%" },
    { flag:"🇲🇴", code:"MOP",  bal:"  4,620.00", chg:"+0.8%" },
  ];
  const recent = [
    { name:"John Doe",  amt:"HK$1,200", ccy:"HKD→HKD" },
    { name:"Wang Fang", amt:"S$340",    ccy:"SGD→SGD" },
    { name:"Maria T.",  amt:"HK$880",   ccy:"HKD→HKD" },
  ];
  return (
    <BrowserFrame color={color} appLabel="International Payouts">
      <div className="p-4 space-y-3">
        <div className="space-y-1.5">
          {fx.map(f=>(
            <div key={f.code} className="bg-white rounded-xl px-3 py-2.5 border border-slate-100 shadow-sm flex items-center gap-2.5">
              <span className="text-base">{f.flag}</span>
              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-800">{f.code} {f.bal}</p>
                <p className="text-[8px] text-slate-400">Balance</p>
              </div>
              <span className="text-[9px] font-bold" style={{ color }}>{f.chg}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recent Payouts</p>
        <div className="space-y-1.5">
          {recent.map(r=>(
            <div key={r.name} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-slate-100">
              <ArrowRight size={9} style={{ color }} className="flex-shrink-0" />
              <span className="flex-1 text-[10px] text-slate-700 font-medium">{r.name}</span>
              <span className="text-[10px] font-bold text-slate-800">{r.amt}</span>
              <span className="text-[8px] text-slate-400">{r.ccy}</span>
              <CheckCircle2 size={10} style={{ color }} />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function Mockup4({ color }: { color: string }) { // Usage Dashboard
  const bars = [38, 55, 43, 71, 58, 84, 66];
  const depts = [{ name:"Engineering", pct:32 }, { name:"Finance", pct:21 }, { name:"Operations", pct:18 }];
  return (
    <BrowserFrame color={color} appLabel="Real-Time Usage Dashboard">
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[["HK$42,800","Total Spend"],["186","Claims"],["74%","Utilisation"]].map(([v,l])=>(
            <div key={l} className="bg-white rounded-xl p-2.5 text-center border border-slate-100 shadow-sm">
              <p className="text-[11px] font-black" style={{ color }}>{v}</p>
              <p className="text-[8px] text-slate-400 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
        {/* Bar chart */}
        <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-slate-500">Monthly Spend</p>
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: color+"20", color }}>Live</span>
          </div>
          <div className="flex items-end gap-1 h-10">
            {bars.map((h,i)=>(
              <div key={i} className="flex-1 rounded-t-sm" style={{ height:`${h}%`, backgroundColor: i===5?color:color+"35" }} />
            ))}
          </div>
          <div className="flex mt-1">
            {["M","T","W","T","F","S","S"].map((d,i)=>(
              <span key={i} className="text-[8px] text-slate-300 flex-1 text-center">{d}</span>
            ))}
          </div>
        </div>
        {/* Dept breakdown */}
        <div className="space-y-1.5">
          {depts.map(d=>(
            <div key={d.name} className="flex items-center gap-2">
              <span className="text-[9px] text-slate-600 w-20 truncate">{d.name}</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width:`${d.pct*3}%`, backgroundColor: color }} />
              </div>
              <span className="text-[9px] font-bold" style={{ color }}>{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function Mockup5({ color }: { color: string }) { // AI Wellness
  const insights = [
    { icon:"⚡", text:"High stress indicators in Finance dept.", level:"warning" },
    { icon:"💪", text:"Fitness engagement up 23% this quarter", level:"good" },
    { icon:"🧠", text:"Mental wellness program recommended", level:"info" },
  ];
  const tags = ["Stress","Sleep","Activity","Nutrition"];
  return (
    <BrowserFrame color={color} appLabel="AI Wellness Insights">
      <div className="p-4 space-y-3">
        {/* Health score */}
        <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="relative w-14 h-14 flex-shrink-0">
            <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
              <circle cx="22" cy="22" r="18" fill="none" stroke="#e2e8f0" strokeWidth="4" />
              <circle cx="22" cy="22" r="18" fill="none" stroke={color} strokeWidth="4"
                strokeDasharray={`${2*Math.PI*18*0.78} ${2*Math.PI*18}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[12px] font-black" style={{ color }}>78</span>
              <span className="text-[6px] text-slate-400 -mt-0.5">/ 100</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-800">Population Health Score</p>
            <p className="text-[9px] text-slate-500 mt-0.5">Based on 342 employees</p>
            <div className="flex gap-0.5 mt-1">
              {[1,2,3,4].map(i=>(
                <div key={i} className="w-4 h-1.5 rounded-full" style={{ backgroundColor: i<=3?color:color+"30" }} />
              ))}
            </div>
          </div>
        </div>
        {/* AI insights */}
        <div className="space-y-1.5">
          {insights.map((ins,i)=>(
            <div key={i} className="bg-white rounded-xl px-3 py-2.5 border border-slate-100 shadow-sm flex items-start gap-2">
              <span className="text-sm flex-shrink-0 leading-none mt-0.5">{ins.icon}</span>
              <p className="text-[9px] text-slate-600 leading-relaxed">{ins.text}</p>
            </div>
          ))}
        </div>
        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap">
          {tags.map((tag,i)=>(
            <span key={tag} className="text-[9px] font-semibold px-2 py-1 rounded-full border" style={i===0?{backgroundColor:color,color:"#fff",borderColor:color}:{borderColor:"#e2e8f0",color:"#64748b"}}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

const MOCKUP_COMPONENTS = [Mockup0, Mockup1, Mockup2, Mockup3, Mockup4, Mockup5];

/* ── Lightbox ──────────────────────────────────────────────────────── */
function Lightbox({ idx, color, onClose }: { idx: number; color: string; onClose: () => void }) {
  const MockupComp = MOCKUP_COMPONENTS[idx];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
        >
          <X size={16} className="text-slate-700" />
        </button>
        <div className="scale-100">
          <MockupComp color={color} />
        </div>
        <p className="text-center text-white/50 text-xs mt-3">Click outside or press × to close</p>
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────────── */
export default function CapabilitiesPanel({ items }: { items: CapabilityText[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const activeIdx   = open ?? 0;
  const activeItem  = items[activeIdx];
  const ActiveIcon  = ICONS[activeIdx];
  const activeColor = COLORS[activeIdx];
  const ActiveMockup = MOCKUP_COMPONENTS[activeIdx];

  return (
    <>
      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox idx={lightbox} color={COLORS[lightbox]} onClose={() => setLightbox(null)} />
      )}

      {/* Layout */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">

        {/* ── Left: accordion ─────────────────────────────────────── */}
        <div className="space-y-2">
          {items.map((item, i) => {
            const Icon  = ICONS[i];
            const color = COLORS[i];
            const isOpen = open === i;
            const MobileComp = MOCKUP_COMPONENTS[i];

            return (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden border transition-all duration-200 ${
                  isOpen ? "border-slate-200 shadow-sm" : "border-slate-100 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                    isOpen ? "" : "bg-white hover:bg-slate-50"
                  }`}
                  style={
                    isOpen
                      ? { background: `linear-gradient(135deg, ${color}12 0%, ${color}04 100%)` }
                      : {}
                  }
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ backgroundColor: isOpen ? color : color + "18" }}
                  >
                    <Icon size={18} style={{ color: isOpen ? "#fff" : color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-semibold ${isOpen ? "text-slate-900" : "text-slate-700"}`}>
                      {item.title}
                    </span>
                    {!isOpen && (
                      <p className="text-xs text-slate-400 truncate mt-0.5">{item.desc.slice(0, 60)}…</p>
                    )}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    style={isOpen ? { color } : { color: "#94a3b8" }}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-white">
                    <div className="px-5 pt-4 pb-4">
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Mobile mockup */}
                    <div className="lg:hidden px-5 pb-5 space-y-2">
                      <div className="relative group cursor-pointer" onClick={() => setLightbox(i)}>
                        <MobileComp color={color} />
                        <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 shadow">
                            <Maximize2 size={12} /> Enlarge
                          </div>
                        </div>
                      </div>
                      <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        <Maximize2 size={9} /> Tap to enlarge
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Right: sticky panel (desktop) ───────────────────────── */}
        <div className="hidden lg:block lg:sticky lg:top-28 space-y-3">
          {/* Feature card */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
            <div className="h-1.5 transition-all duration-300" style={{ background: `linear-gradient(90deg, ${activeColor}, ${activeColor}55)` }} />
            <div className="px-7 pt-6 pb-5" style={{ background: `linear-gradient(135deg, ${activeColor}15 0%, ${activeColor}05 100%)` }}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md" style={{ backgroundColor: activeColor }}>
                  <ActiveIcon size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-snug">{activeItem.title}</h3>
                </div>
              </div>
            </div>
            <div className="px-7 py-5 bg-white border-t border-slate-100">
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{activeItem.desc}</p>
              <div className="flex gap-1.5 mb-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setOpen(i)}
                    className="flex-1 h-1.5 rounded-full transition-all duration-300"
                    style={{ backgroundColor: i === activeIdx ? activeColor : activeColor + "25" }}
                  />
                ))}
              </div>
              <p className="text-[11px] text-slate-400">{activeIdx + 1} of {items.length} capabilities</p>
            </div>
          </div>

          {/* Mockup */}
          <div
            className="relative group cursor-pointer"
            onClick={() => setLightbox(activeIdx)}
          >
            <ActiveMockup color={activeColor} />
            {/* Hover overlay */}
            <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/15 transition-all duration-200 flex items-center justify-center">
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
    </>
  );
}
