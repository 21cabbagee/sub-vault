import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, DollarSign, CheckCircle2, Lock, Trash2 } from 'lucide-react';

/**
 * OutcomeChart for SubVault (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares $1,800/yr zombie recurring SaaS subscriptions & estate probate delays ($6 agency/bank fee drag) with Autonomous Cryptographic Dead-Man's Cancellation ($1 software).
 */
export default function OutcomeChart({
  serviceName = "Zombie Subscription Elimination & Estate Digital Legacy",
  defaultMonthlyZombieSpend = 160,
  onCtaClick
}) {
  const [spend, setSpend] = useState(defaultMonthlyZombieSpend);

  // Financial equation: Average person has 12 recurring charges, bleeding spend for years post-incident
  const legacyAnnualBleed = spend * 12 + 1200; // includes uncancelled estate fees
  // SubVault flat subscription is $29/year
  const subVaultAnnualFee = 29;
  const netFamilySavings = legacyAnnualBleed - subVaultAnnualFee;
  const savingsPercent = Math.round(((legacyAnnualBleed - subVaultAnnualFee) / legacyAnnualBleed) * 100);

  const maxCost = Math.max(legacyAnnualBleed, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((subVaultAnnualFee / maxCost) * 100), 8);

  return (
    <div className="relative rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-950 border-emerald-500/40 text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs Zombie Card Bleed & Probate Agencies ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Family Wealth Protection: <span className="text-emerald-400">{savingsPercent}% Capital Safeguard</span>
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            When life events or memory lapses occur, gym memberships, software seats, and hidden cloud bills drain thousands of dollars unchecked. We replace manual bank dispute phone calls with an automated AES-256 dead-man's cancellation protocol.
          </p>
        </div>

        <div className="text-right bg-slate-950/80 border border-emerald-500/30 rounded-xl p-3 px-4 min-w-[190px]">
          <span className="text-[11px] text-slate-400 block font-medium">Annual Recurring Bleed Reclaimed</span>
          <span className="text-2xl md:text-3xl font-black text-emerald-400">
            ${netFamilySavings.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-300/80 flex items-center justify-end gap-1 font-semibold font-mono">
            <TrendingUp className="w-3 h-3" /> 1-Click FTC Canceler
          </span>
        </div>
      </div>

      {/* Interactive Volume Slider */}
      <div className="py-6 border-b border-white/10">
        <div className="flex items-center justify-between text-sm mb-3">
          <label className="text-slate-300 font-semibold flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Estimated Monthly Hidden / Unused Subscriptions:
          </label>
          <span className="text-base font-bold text-white bg-slate-950 px-3 py-1 rounded-lg border border-emerald-500/30 font-mono">
            ${spend} / month (${(spend * 12).toLocaleString()} / year)
          </span>
        </div>
        <input 
          type="range" 
          min={40} 
          max={600} 
          step={20}
          value={spend}
          onChange={(e) => setSpend(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
        />
        <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
          <span>$40 / mo (Basic Apps)</span>
          <span>$160 / mo (Average Family SaaS + Streaming)</span>
          <span>$600+ / mo (Freelancer & Small Agency Suite)</span>
        </div>
      </div>

      {/* Bklit UI Visual Comparison Chart & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
        {/* SVG Visual Bars */}
        <div className="md:col-span-5 bg-slate-950 rounded-xl p-5 border border-white/10">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between font-mono">
            <span>Annual Financial Drain Comparison</span>
            <span className="text-[10px] text-slate-500">Live Simulation</span>
          </div>

          <div className="space-y-4">
            {/* Legacy Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Unchecked Card Charges + Probate Friction ($6)
                </span>
                <span className="font-mono font-bold text-rose-300">${legacyAnnualBleed.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-rose-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-300 rounded-lg"
                  style={{ width: `${legacyBarHeight}%` }}
                />
              </div>
            </div>

            {/* Autonomous Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  SubVault Cryptographic Protocol ($1)
                </span>
                <span className="font-mono font-bold text-emerald-300">${subVaultAnnualFee.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden border border-emerald-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-lg shadow-lg shadow-emerald-500/30"
                  style={{ width: `${autoBarHeight}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Net Household Wealth Preserved:</span>
            <span className="text-sm font-bold text-emerald-400">+${netFamilySavings.toLocaleString()}</span>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="md:col-span-7 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Zero-Knowledge Cryptographic Vault</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Client-side AES-256 GCM encryption. Your master password and credentials never touch our servers in unencrypted form.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Multi-Sig Beneficiary Dead-Man's Switch</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                If check-in pings are missed for 60 consecutive days, your pre-designated trustee receives emergency access to execute instant cancellation orders.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Trash2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">1-Click FTC Click-to-Cancel Letters</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Generates legally binding cancellation notices under FTC Click-to-Cancel and CCPA guidelines, terminating aggressive merchant auto-renewals instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
