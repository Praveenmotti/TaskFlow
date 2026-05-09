import { Link } from 'react-router-dom'

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-[#0d0d1f] border border-purple-900/20 rounded-2xl p-6 hover:border-violet-500/30 transition-all hover:-translate-y-1">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-white font-bold text-base mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function StepCard({ num, icon, title, desc }) {
  return (
    <div className="text-center">
      <div className="relative inline-block mb-4">
        <div className="w-16 h-16 rounded-full bg-[#0d0d1f] border border-purple-900/30 flex items-center justify-center text-2xl mx-auto">
          {icon}
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center text-white text-xs font-black">
          {num}
        </div>
      </div>
      <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
      <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060612] text-white font-outfit overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#060612]/80 border-b border-purple-900/20 h-16 flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center font-black text-white">T</div>
            <span className="font-black text-lg bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">TaskFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-400 hover:text-white text-sm transition-colors">Features</a>
            <a href="#howitworks" className="text-slate-400 hover:text-white text-sm transition-colors">How it works</a>
            <a href="#pricing" className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-slate-400 hover:text-white text-sm font-medium px-4 py-2 rounded-xl border border-purple-900/30 hover:border-violet-500/40 transition-all">
              Login
            </Link>
            <Link to="/register" className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-violet-900/30">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-violet-700/10 blur-3xl -top-60 -left-40 pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-700/8 blur-3xl -bottom-40 -right-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-xs font-semibold text-violet-400 mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
            Now with Smart Prioritization
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
            <span className="text-white">Manage Your Tasks</span><br />
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Smarter & Faster
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop losing track of what matters. TaskFlow helps you organize, prioritize, and complete tasks with a beautifully simple system built for real productivity.
          </p>

          <div className="flex items-center justify-center gap-4 mb-14 flex-wrap">
            <Link to="/register"
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-violet-900/40 hover:-translate-y-1 text-base">
              🚀 Start for Free
            </Link>
            <Link to="/login"
              className="flex items-center gap-2 border border-white/10 hover:border-violet-500/40 bg-white/5 hover:bg-violet-500/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-base">
              Login →
            </Link>
          </div>

          {/* Stats bar */}
          <div className="inline-grid grid-cols-3 divide-x divide-purple-900/30 border border-purple-900/20 rounded-2xl bg-[#0d0d1f]/80 backdrop-blur overflow-hidden">
            {[['12K+','Active Users'],['98%','Satisfaction'],['2M+','Tasks Done']].map(([val,lbl]) => (
              <div key={lbl} className="px-8 py-4 text-center">
                <div className="text-2xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{val}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3">⚡ Features</p>
            <h2 className="text-4xl font-black mb-4">Everything you need to stay focused</h2>
            <p className="text-slate-400 max-w-lg mx-auto">We didn't just build a to-do list. We built the system that high-performers actually use.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard icon="🎯" title="Smart Task Management" desc="Create, edit, organize and track tasks with priority levels, due dates, and real-time status updates." />
            <FeatureCard icon="📊" title="Live Progress Dashboard" desc="Real-time stats show your completion rate, task distribution, and daily streaks." />
            <FeatureCard icon="🔔" title="Smart Deadline Reminders" desc="Never miss another deadline. Intelligent reminders adapt to your task priority automatically." />
            <FeatureCard icon="🏷️" title="Categories & Tags" desc="Organize tasks into Work, Personal, Learning projects. Filter and search in milliseconds." />
            <FeatureCard icon="🔐" title="Secure Authentication" desc="JWT tokens, bcrypt password hashing, and protected routes. Your data is yours alone." />
            <FeatureCard icon="📱" title="Works Everywhere" desc="Fully responsive on mobile, tablet, and desktop. Built with React SPA architecture." />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="howitworks" className="py-24 px-6 bg-[#0d0d1f]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3">🗺️ How it works</p>
            <h2 className="text-4xl font-black">Up and running in 2 minutes</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StepCard num="1" icon="📝" title="Create Account" desc="Sign up free, no credit card needed." />
            <StepCard num="2" icon="➕" title="Add Your Tasks" desc="Add tasks with title, priority and due date." />
            <StepCard num="3" icon="📋" title="Organize & Filter" desc="Sort by status, priority or project." />
            <StepCard num="4" icon="✅" title="Track & Complete" desc="Watch your progress in real-time." />
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3">💰 Pricing</p>
            <h2 className="text-4xl font-black">Simple, honest pricing</h2>
            <p className="text-slate-400 mt-3">No tricks. No hidden fees. Start free, upgrade when ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="bg-[#0d0d1f] border border-purple-900/20 rounded-2xl p-7">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Starter</p>
              <div className="text-4xl font-black mb-1">₹0<span className="text-lg font-normal text-slate-500">/mo</span></div>
              <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-purple-900/20">For individuals getting started.</p>
              {['Up to 20 tasks','Basic filtering','localStorage sync'].map(f=>(
                <p key={f} className="text-sm text-slate-300 mb-2 flex gap-2"><span className="text-green-400">✓</span>{f}</p>
              ))}
              <Link to="/register" className="mt-6 block w-full py-2.5 text-center rounded-xl border border-purple-900/30 text-slate-300 hover:border-violet-500/40 hover:text-white transition-all text-sm font-semibold">
                Get Started Free
              </Link>
            </div>
            {/* Pro */}
            <div className="bg-gradient-to-br from-violet-900/30 to-cyan-900/10 border border-violet-500/30 rounded-2xl p-7 relative shadow-2xl shadow-violet-900/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-violet-400 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Pro</p>
              <div className="text-4xl font-black mb-1">₹299<span className="text-lg font-normal text-slate-400">/mo</span></div>
              <p className="text-slate-400 text-sm mb-6 pb-6 border-b border-purple-500/20">For power users.</p>
              {['Unlimited tasks','All priority features','Cloud sync (MongoDB)','Analytics dashboard','Categories & tags'].map(f=>(
                <p key={f} className="text-sm text-slate-200 mb-2 flex gap-2"><span className="text-green-400">✓</span>{f}</p>
              ))}
              <Link to="/register" className="mt-6 block w-full py-2.5 text-center rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-bold transition-all text-sm shadow-lg shadow-violet-900/30">
                Start Pro Trial
              </Link>
            </div>
            {/* Team */}
            <div className="bg-[#0d0d1f] border border-purple-900/20 rounded-2xl p-7">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Team</p>
              <div className="text-4xl font-black mb-1">₹799<span className="text-lg font-normal text-slate-500">/mo</span></div>
              <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-purple-900/20">For small teams.</p>
              {['Everything in Pro','Up to 10 members','Shared task boards','Admin controls'].map(f=>(
                <p key={f} className="text-sm text-slate-300 mb-2 flex gap-2"><span className="text-green-400">✓</span>{f}</p>
              ))}
              <button className="mt-6 block w-full py-2.5 text-center rounded-xl border border-purple-900/30 text-slate-300 hover:border-violet-500/40 hover:text-white transition-all text-sm font-semibold">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12),transparent_65%)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Start managing tasks<br />
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">the right way today</span>
          </h2>
          <p className="text-slate-400 mb-8 text-lg">Join 12,000+ users. Free forever, no credit card needed.</p>
          <Link to="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-xl shadow-violet-900/40 hover:-translate-y-1 text-base">
            🚀 Create Free Account
          </Link>
          <p className="text-slate-600 text-xs mt-4">🔒 Secure · No spam · Cancel anytime</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-purple-900/20 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center font-black text-white text-sm">T</div>
            <span className="font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">TaskFlow</span>
          </div>
          <p className="text-slate-600 text-sm">Built with React · Tailwind · Node.js · MongoDB</p>
          <p className="text-slate-600 text-sm">© 2025 TaskFlow. Made with ❤️ in India</p>
        </div>
      </footer>

    </div>
  )
}