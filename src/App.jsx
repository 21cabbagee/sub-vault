import React, { useState, useId } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  Trash2, 
  DollarSign, 
  Users, 
  ArrowRight, 
  Clock, 
  EyeOff, 
  Zap, 
  Award,
  Send,
  HelpCircle,
  FileCheck,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ParticlesCanvas from './components/ParticlesCanvas';
import OutcomeChart from './components/OutcomeChart';

const SAMPLE_ZOMBIES = [
  { id: 1, merchant: 'Equinox Luxury Fitness', category: 'Gym & Fitness', monthlyCost: 295.00, billingCycle: 'Monthly', status: 'Active Recurring', cancelDifficulty: 'High (Demands Certified Mail)' },
  { id: 2, merchant: 'Amazon AWS Cloud Services', category: 'Cloud Infrastructure', monthlyCost: 142.50, billingCycle: 'Monthly', status: 'Active Recurring', cancelDifficulty: 'Medium (Requires Root 2FA)' },
  { id: 3, merchant: 'The Wall Street Journal', category: 'Publishing', monthlyCost: 44.99, billingCycle: 'Monthly', status: 'Active Recurring', cancelDifficulty: 'High (Phone Retention Trap)' },
  { id: 4, merchant: 'Adobe Creative Cloud All Apps', category: 'Creative Software', monthlyCost: 89.99, billingCycle: 'Monthly', status: 'Active Recurring', cancelDifficulty: 'High ($300 Early Exit Penalty)' },
  { id: 5, merchant: 'Norton 360 Auto-Renewal', category: 'Legacy Antivirus', monthlyCost: 12.99, billingCycle: 'Annual ($155.88)', status: 'Active Recurring', cancelDifficulty: 'Medium (Silent Annual Debit)' },
  { id: 6, merchant: 'Whoop Peak Fitness Strap', category: 'Wearables SaaS', monthlyCost: 30.00, billingCycle: 'Monthly', status: 'Active Recurring', cancelDifficulty: 'Medium (Requires Return Hardware)' }
];

export default function App() {
  const switchPeriodId = useId();
  const primaryTrusteeId = useId();
  const secondaryTrusteeId = useId();
  const deceasedNameId = useId();
  const executorNameId = useId();
  const probateStateId = useId();

  // State for Switch Protocol
  const [switchPeriod, setSwitchPeriod] = useState('60');
  const [heartbeatActive, setHeartbeatActive] = useState(true);
  const [lastCheckIn, setLastCheckIn] = useState('Today, 14:32 UTC');
  const [countdownDays, setCountdownDays] = useState(60);

  // Trustees
  const [trustees, setTrustees] = useState({
    primary: 'Elena Vance (Spouse) - elena.vance@vaultmail.io',
    secondary: 'Marcus Sterling (Estate Attorney) - marcus@sterlingprobate.com'
  });

  // Zombie Subscriptions
  const [subscriptions, setSubscriptions] = useState(SAMPLE_ZOMBIES);
  const [selectedToCancel, setSelectedToCancel] = useState([1, 3, 4]);

  // Legal Notice Generator State
  const [executorDetails, setExecutorDetails] = useState({
    deceasedName: 'Arthur Pendelton',
    executorName: 'Elena Vance-Pendelton',
    probateState: 'California (CA Probate Code § 8400)'
  });
  const [generatedNotice, setGeneratedNotice] = useState(null);

  // CAB Modal
  const [isCabModalOpen, setIsCabModalOpen] = useState(false);
  const [cabSubmitted, setCabSubmitted] = useState(false);
  const [cabForm, setCabForm] = useState({
    name: '',
    firm: '',
    email: '',
    tier: 'Estate Attorney & Family Office Partner'
  });

  // Calculate annual bleed
  const totalMonthlyBleed = subscriptions.reduce((sum, item) => sum + item.monthlyCost, 0);
  const totalAnnualBleed = Math.round(totalMonthlyBleed * 12);

  const selectedCancelTotalMonthly = subscriptions
    .filter(s => selectedToCancel.includes(s.id))
    .reduce((sum, item) => sum + item.monthlyCost, 0);
  const selectedCancelTotalAnnual = Math.round(selectedCancelTotalMonthly * 12);

  const toggleSelect = (id) => {
    setSelectedToCancel(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handlePingCheckin = () => {
    setCountdownDays(parseInt(switchPeriod));
    setLastCheckIn('Just now (Heartbeat Confirmed)');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleGenerateLetters = (e) => {
    e.preventDefault();
    const targeted = subscriptions.filter(s => selectedToCancel.includes(s.id));
    setGeneratedNotice({
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      merchants: targeted.map(t => t.merchant),
      deceased: executorDetails.deceasedName,
      executor: executorDetails.executorName,
      jurisdiction: executorDetails.probateState,
      totalSavedAnnual: selectedCancelTotalAnnual
    });
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCabSubmit = (e) => {
    e.preventDefault();
    setCabSubmitted(true);
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Banner: CAB Announcement */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-b border-emerald-500/30 px-4 py-2.5 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-300">Customer Advisory Board (CAB) Active:</span>
            <span className="text-slate-300">Join 10 estate planning attorneys & legacy wealth planners for 70% lifetime access ($29/yr).</span>
          </div>
          <button 
            onClick={() => setIsCabModalOpen(true)}
            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-full transition-all shadow-sm hover:scale-105"
          >
            Claim CAB Seat (4 Left) →
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black text-xl">
              🔐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">SubVault</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">AES-256 GCM</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">Digital Legacy & Zombie Subscription Vault</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#deadman-switch" className="hover:text-emerald-400 transition-colors">Dead-Man's Protocol</a>
            <a href="#zombie-scanner" className="hover:text-emerald-400 transition-colors">Subscription Scanner</a>
            <a href="#legal-generator" className="hover:text-emerald-400 transition-colors">1-Click Legal Canceler</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Vault Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCabModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Join CAB</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Casberry-style Particles Canvas */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Interactive WebGL / Casberry Canvas Simulation */}
        <ParticlesCanvas color="16, 185, 129" particleCount={50} connectionDistance={120} />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-emerald-300 shadow-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero-Knowledge Dead-Man's Switch • FTC Click-to-Cancel Ready • CCPA Mandated</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Digital Legacy Vault & Automated Zombie Subscription Canceler
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            When life halts, recurring bank debits don't. Protect your estate from thousands in draining zombie SaaS, gym memberships, and cloud charges with multi-sig trustee release and statutory cancellation letters.
          </p>

          {/* Larry Ellison Playbook: Confuse the Tenses & Sell Harder Than You Build */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong className="text-white">Service-as-a-Software Digital Estate Vault:</strong> Zero probate lawyer fees. Statutory cancellation letters fire autonomously via multi-sig trigger.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="#zombie-scanner" 
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
            >
              <span>Audit Zombie Subscriptions</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#deadman-switch" 
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Configure Dead-Man's Switch</span>
            </a>
          </div>

          {/* Bottoms-Up TAM & Market Metrics */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black text-emerald-400">$2.36B</div>
              <div className="text-xs text-slate-400 font-medium">Digital Legacy Vault TAM</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black text-white">$4,280</div>
              <div className="text-xs text-slate-400 font-medium">Avg Annual Zombie Drain / Estate</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black text-emerald-400">30M+</div>
              <div className="text-xs text-slate-400 font-medium">Target Households</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black text-white">1-Click</div>
              <div className="text-xs text-slate-400 font-medium">Statutory Cancellation Letters</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sequoia Framework Outcome Visualizer (Bklit UI + Julien Bek $1 vs $6 Ratio) */}
      <OutcomeChart onCtaClick={() => setIsCabModalOpen(true)} />

      {/* Feature 1: Dead-Man's Switch Protocol Simulator */}
      <section id="deadman-switch" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Multi-Party Cryptographic Safeguard</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Zero-Knowledge Dead-Man's Switch Protocol
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePingCheckin}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>Simulate "I'm Alive" Check-in</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Protocol Settings */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor={switchPeriodId} className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Heartbeat Verification Frequency:
                  </label>
                  <select 
                    id={switchPeriodId}
                    value={switchPeriod}
                    onChange={(e) => {
                      setSwitchPeriod(e.target.value);
                      setCountdownDays(parseInt(e.target.value));
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="30">Every 30 Days (Active Guardian)</option>
                    <option value="60">Every 60 Days (Recommended Standard)</option>
                    <option value="90">Every 90 Days (Quarterly Heartbeat)</option>
                    <option value="180">Every 180 Days (Semi-Annual)</option>
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    System pings encrypted SMS + mobile push. If unanswered across 14-day grace window, trustee quorum triggers.
                  </p>
                </div>

                <div>
                  <label htmlFor={primaryTrusteeId} className="block text-xs font-semibold text-slate-300 mb-1">
                    Primary Trustee (Designated Key Custodian):
                  </label>
                  <input 
                    id={primaryTrusteeId}
                    type="text" 
                    value={trustees.primary}
                    onChange={(e) => setTrustees({ ...trustees, primary: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor={secondaryTrusteeId} className="block text-xs font-semibold text-slate-300 mb-1">
                    Secondary Trustee (Estate Attorney / Executor):
                  </label>
                  <input 
                    id={secondaryTrusteeId}
                    type="text" 
                    value={trustees.secondary}
                    onChange={(e) => setTrustees({ ...trustees, secondary: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-400">
                <div className="font-semibold text-slate-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Knowledge Architecture:</span>
                </div>
                <p>
                  Your vault payload is split via Shamir's Secret Sharing (2-of-3 threshold). SubVault servers hold zero plaintext keys or bank passwords. Decryption requires physical trustee quorum affirmation.
                </p>
              </div>
            </div>

            {/* Protocol Status Monitor */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Live Switch Telemetry</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Armed & Guarded
                </span>
              </div>

              <div className="text-center py-4 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Days Until Next Heartbeat Expiry</div>
                <div className="text-5xl font-black text-white mt-2 tracking-tight">{countdownDays} <span className="text-lg font-normal text-slate-500">Days</span></div>
                <div className="text-xs text-emerald-400 mt-2">Last verified: {lastCheckIn}</div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Grace Notification Buffer:</span>
                  <span className="text-white font-medium">14 Days (3x SMS + Registered Mail)</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Trustee Unlock Quorum:</span>
                  <span className="text-white font-medium">2 of 2 Signature Approval</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-400">Payload Execution:</span>
                  <span className="text-emerald-400 font-medium">Statutory Letters Auto-Dispatched</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Zombie Subscription Scanner */}
      <section id="zombie-scanner" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Bleed Detection Engine</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Zombie Subscription & Recurring Charge Scanner
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Parser identifies ongoing debits from Chase, Amex, and Silicon Valley Bank statements.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-right">
              <div className="text-xs text-slate-400">Total Estate Bleed Detected:</div>
              <div className="text-xl font-black text-rose-400">${totalMonthlyBleed.toFixed(2)}/mo (${totalAnnualBleed.toLocaleString()}/yr)</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-4 w-12 text-center">Select</th>
                    <th className="p-4">Merchant & Service</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Billing Rate</th>
                    <th className="p-4">Cancellation Obstacle</th>
                    <th className="p-4 text-right">Annual Bleed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {subscriptions.map((sub) => {
                    const isSelected = selectedToCancel.includes(sub.id);
                    return (
                      <tr 
                        key={sub.id} 
                        onClick={() => toggleSelect(sub.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-emerald-950/20' : 'hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="p-4 text-center">
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => {}} // Controlled via row click
                            className="accent-emerald-500 h-4 w-4 rounded cursor-pointer"
                          />
                        </td>
                        <td className="p-4 font-bold text-white flex items-center gap-2">
                          <span>{sub.merchant}</span>
                        </td>
                        <td className="p-4 text-slate-400">{sub.category}</td>
                        <td className="p-4 text-slate-200 font-medium">
                          ${sub.monthlyCost.toFixed(2)} / mo
                        </td>
                        <td className="p-4 text-slate-400">{sub.cancelDifficulty}</td>
                        <td className="p-4 text-right font-black text-rose-400">
                          ${Math.round(sub.monthlyCost * 12).toLocaleString()} / yr
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                <strong className="text-white">{selectedToCancel.length} subscriptions selected</strong> for automated statutory termination ({`saving $${selectedCancelTotalAnnual.toLocaleString()}/yr`}).
              </div>
              <a 
                href="#legal-generator"
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
              >
                <span>Proceed to Statutory Cancellation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: 1-Click Legal Notice Generator */}
      <section id="legal-generator" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Statutory Power of Attorney</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              1-Click Legal Subscription Cancellation Letters
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Generate formal demand notices citing state probate codes and federal FTC Click-to-Cancel rules. Mandates immediate revocation of automatic debit authorization.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
            <form onSubmit={handleGenerateLetters} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor={deceasedNameId} className="block text-xs font-semibold text-slate-300 mb-1">
                    Account Holder Name
                  </label>
                  <input 
                    id={deceasedNameId}
                    type="text" 
                    value={executorDetails.deceasedName}
                    onChange={(e) => setExecutorDetails({ ...executorDetails, deceasedName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={executorNameId} className="block text-xs font-semibold text-slate-300 mb-1">
                    Designated Executor / Trustee
                  </label>
                  <input 
                    id={executorNameId}
                    type="text" 
                    value={executorDetails.executorName}
                    onChange={(e) => setExecutorDetails({ ...executorDetails, executorName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={probateStateId} className="block text-xs font-semibold text-slate-300 mb-1">
                    Legal Jurisdiction & Probate Code
                  </label>
                  <input 
                    id={probateStateId}
                    type="text" 
                    value={executorDetails.probateState}
                    onChange={(e) => setExecutorDetails({ ...executorDetails, probateState: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Draft Formal Legal Notice</span>
                </button>
              </div>
            </form>

            {/* Generated Letter Preview */}
            {generatedNotice && (
              <div className="mt-8 pt-8 border-t border-slate-800 animate-fadeIn">
                <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-6 font-mono text-xs text-slate-300 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-emerald-400 font-bold">FORMAL NOTICE OF TERMINATION & MANDATE REVOCATION</span>
                    <button 
                      onClick={() => alert('Legal notices compiled to PDF. Ready for certified delivery and online submission.')}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] font-sans font-bold flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Download Certified Notices (.PDF)</span>
                    </button>
                  </div>

                  <p><strong>DATE:</strong> {generatedNotice.date}</p>
                  <p><strong>TO BILLING DEPARTMENTS:</strong> {generatedNotice.merchants.join(', ')}</p>
                  <p><strong>RE:</strong> Immediate Revocation of Automated Recurring Billing & Account Closure</p>
                  <p><strong>ACCOUNT HOLDER:</strong> {generatedNotice.deceased} (Estate / Incapacity Status)</p>
                  <p><strong>EXECUTOR / LEGAL REPRESENTATIVE:</strong> {generatedNotice.executor}</p>
                  <p><strong>STATUTORY AUTHORITY:</strong> {generatedNotice.jurisdiction}</p>

                  <div className="bg-slate-900/80 p-4 rounded border border-slate-800 space-y-2 text-slate-300">
                    <p>
                      PLEASE TAKE FORMAL NOTICE that all contractual and automated pre-authorized debit agreements between the aforementioned merchants and {generatedNotice.deceased} are hereby TERMINATED EFFECTIVE IMMEDIATELY.
                    </p>
                    <p>
                      Pursuant to federal Electronic Fund Transfer Act (15 U.S.C. § 1693e) and FTC "Negative Option" guidelines, any subsequent debit attempt constitutes unauthorized conversion and willful violation. You are directed to delete payment tokenization records and cease all collection activity.
                    </p>
                  </div>

                  <div className="text-emerald-400 font-bold text-right">
                    Annual Waste Stopped: ${generatedNotice.totalSavedAnnual.toLocaleString()} / yr
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Vault Tiers</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              Transparent, High-Security Pricing
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Fraction of a single zombie subscription's annual cost. Zero lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1: Personal Vault */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-base font-bold text-white">Personal Vault</div>
                <div className="text-xs text-slate-400 mt-1">For single individuals & digital nomads</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">$49</span>
                  <span className="text-xs text-slate-400">/year</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dead-man's switch heartbeat monitor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1 designated trustee recipient</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Up to 20 recurring subscription watches</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Tier 2: Family Legacy (Highlighted) */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/50 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl shadow-emerald-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-full">
                Most Popular
              </div>
              <div>
                <div className="text-base font-bold text-white">Family Estate Vault</div>
                <div className="text-xs text-slate-400 mt-1">For comprehensive household security</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-emerald-400">$79</span>
                  <span className="text-xs text-slate-400">/year</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Shamir 2-of-3 multi-party trustee quorum</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited subscription bleed tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Automated statutory legal cancelation generator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Encrypted document & crypto seed phrase vault</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20"
              >
                Join CAB for 70% Off ($29/yr)
              </button>
            </div>

            {/* Tier 3: Estate Attorney Firm */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-base font-bold text-white">Probate & Legal Firm</div>
                <div className="text-xs text-slate-400 mt-1">For estate attorneys & wealth managers</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">$499</span>
                  <span className="text-xs text-slate-400">/year</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Multi-client estate dashboard (50 client estates)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Certified mail batch dispatch integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>White-labeled trustee communication portal</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setIsCabModalOpen(true)}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Contact Firm Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">SubVault</span>
            <span>• Digital Legacy Vault & Automated Zombie Subscription Canceler</span>
          </div>
          <div>
            Zero-knowledge cryptographic security with statutory probate enforcement.
          </div>
        </div>
      </footer>

      {/* CAB 10-Member Modal */}
      {isCabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setIsCabModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {!cabSubmitted ? (
              <form onSubmit={handleCabSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Award className="w-5 h-5" />
                  <span>SubVault Customer Advisory Board (CAB)</span>
                </div>
                <h3 className="text-xl font-black text-white">Claim 70% Lifetime Founding Rate</h3>
                <p className="text-xs text-slate-400">
                  Join 10 early estate attorneys and wealth planners shaping our zero-knowledge protocols. Lock in lifetime access at $29/year (normally $79/year).
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label htmlFor="full-name" className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <input 
                      id="full-name"
                      type="text" 
                      placeholder="e.g. Richard Hendricks"
                      value={cabForm.name}
                      onChange={(e) => setCabForm({ ...cabForm, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="firm-family" className="block text-xs font-semibold text-slate-300 mb-1">Firm or Family Office Name</label>
                    <input 
                      id="firm-family"
                      type="text" 
                      placeholder="e.g. Hendricks Family Trust"
                      value={cabForm.firm}
                      onChange={(e) => setCabForm({ ...cabForm, firm: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cab-email" className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input 
                      id="cab-email"
                      type="email" 
                      placeholder="richard@hendrickstrust.com"
                      value={cabForm.email}
                      onChange={(e) => setCabForm({ ...cabForm, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/25"
                >
                  Reserve CAB Seat & Lock 70% Rate
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-black text-white">CAB Seat Confirmed</h3>
                <p className="text-xs text-slate-300">
                  Welcome to SubVault CAB, <strong className="text-white">{cabForm.name}</strong>. Your 70% founding rate ($29/yr) has been reserved for <span className="text-emerald-400">{cabForm.firm}</span>.
                </p>
                <button 
                  onClick={() => { setIsCabModalOpen(false); setCabSubmitted(false); }}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                >
                  Return to Vault
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
