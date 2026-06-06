import { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart, Droplets, Search, MapPin, Shield, Zap, Users, Menu, X,
  ArrowUp, Moon, Sun, Star, Phone, Mail, ArrowRight, CheckCircle, Bell, Activity,
  Award, ChevronRight, Send, Clock, Globe, HeartHandshake, Eye
} from "lucide-react";

/* ─── Global Styles ───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,600;9..144,700;9..144,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; }
    .display { font-family: 'Fraunces', serif; }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeLeft { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
    @keyframes fadeRight{ from { opacity:0; transform:translateX(40px); }  to { opacity:1; transform:translateX(0); } }
    @keyframes scaleIn  { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
    @keyframes float    { 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-18px); } }
    @keyframes spinSlow { from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
    @keyframes pulseRing{
      0%  { box-shadow:0 0 0 0 rgba(220,38,38,0.5); }
      70% { box-shadow:0 0 0 20px rgba(220,38,38,0); }
      100%{ box-shadow:0 0 0 0 rgba(220,38,38,0); }
    }
    @keyframes gradientShift {
      0%  { background-position:0% 50%; }
      50% { background-position:100% 50%; }
      100%{ background-position:0% 50%; }
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes bloodDrop { 0%{transform:translateY(-20px);opacity:0} 100%{transform:translateY(0);opacity:1} }

    .anim-fade-up    { animation: fadeUp   0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
    .anim-fade-left  { animation: fadeLeft 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
    .anim-fade-right { animation: fadeRight 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
    .anim-scale-in   { animation: scaleIn  0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
    .anim-float      { animation: float 5s ease-in-out infinite; }
    .anim-spin-slow  { animation: spinSlow 12s linear infinite; }
    .anim-pulse-ring { animation: pulseRing 2.5s ease-in-out infinite; }
    .anim-gradient   { background-size:200% 200%; animation: gradientShift 5s ease infinite; }

    .hidden-anim { opacity:0; }

    /* Glassmorphism */
    .glass {
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.09);
    }
    .glass-light {
      background: rgba(255,255,255,0.75);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.9);
    }

    /* Feature Cards */
    .feat-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      padding: 2rem 1.75rem;
      transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
      cursor: default;
    }
    .feat-card:hover {
      background: rgba(220,38,38,0.06);
      border-color: rgba(220,38,38,0.35);
      transform: translateY(-10px);
      box-shadow: 0 30px 60px rgba(220,38,38,0.15), 0 0 0 1px rgba(220,38,38,0.1);
    }
    .feat-card-light {
      background: #fff;
      border: 1px solid rgba(220,38,38,0.12);
      border-radius: 20px;
      padding: 2rem 1.75rem;
      transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
      cursor: default;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }
    .feat-card-light:hover {
      transform: translateY(-10px);
      box-shadow: 0 30px 60px rgba(220,38,38,0.18);
      border-color: rgba(220,38,38,0.4);
    }

    /* Blood Group Cards */
    .bg-card {
      border-radius: 20px;
      transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .bg-card::before {
      content:'';
      position:absolute; inset:0;
      background:linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0));
      opacity:0; transition:opacity 0.3s;
    }
    .bg-card:hover { transform:scale(1.08) translateY(-6px); box-shadow:0 25px 55px rgba(220,38,38,0.35); }
    .bg-card:hover::before { opacity:1; }

    /* Buttons */
    .btn-red {
      background: linear-gradient(135deg,#DC2626,#7F1D1D);
      color:#fff;
      border: none;
      border-radius: 50px;
      padding: 0.85rem 2rem;
      font-family:'DM Sans',sans-serif;
      font-weight:600;
      font-size:0.95rem;
      cursor:pointer;
      position:relative; overflow:hidden;
      transition: all 0.3s ease;
      letter-spacing:0.02em;
    }
    .btn-red::after {
      content:'';
      position:absolute; top:0; left:-100%; width:100%; height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);
      transition:left 0.5s ease;
    }
    .btn-red:hover { transform:translateY(-3px); box-shadow:0 18px 45px rgba(220,38,38,0.5); }
    .btn-red:hover::after { left:100%; }

    .btn-outline {
      background:transparent;
      color:#fff;
      border:2px solid rgba(255,255,255,0.35);
      border-radius:50px;
      padding:0.8rem 2rem;
      font-family:'DM Sans',sans-serif;
      font-weight:500;
      font-size:0.95rem;
      cursor:pointer;
      transition:all 0.3s ease;
      letter-spacing:0.02em;
    }
    .btn-outline:hover { border-color:#DC2626; background:rgba(220,38,38,0.12); transform:translateY(-3px); }
    .btn-outline-dark {
      background:transparent;
      color:#1C1917;
      border:2px solid rgba(28,25,23,0.3);
      border-radius:50px;
      padding:0.8rem 2rem;
      font-family:'DM Sans',sans-serif;
      font-weight:500;
      font-size:0.95rem;
      cursor:pointer;
      transition:all 0.3s ease;
    }
    .btn-outline-dark:hover { border-color:#DC2626; color:#DC2626; transform:translateY(-3px); }

    /* Nav link hover */
    .nav-lnk {
      position:relative;
      transition:color 0.2s;
      text-decoration:none;
    }
    .nav-lnk::after {
      content:''; position:absolute; left:0; bottom:-4px;
      width:0; height:2px; background:#DC2626;
      transition:width 0.3s ease;
    }
    .nav-lnk:hover::after { width:100%; }

    /* Stat card */
    .stat-num {
      font-family:'Fraunces',serif;
      background:linear-gradient(135deg,#FCA5A5,#DC2626);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      background-clip:text;
    }

    /* Testimonials */
    .testi-card {
      border-radius:20px;
      padding:2rem;
      transition:all 0.35s ease;
    }
    .testi-card:hover { transform:translateY(-8px); }

    /* Scrollbar */
    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-track { background:#0C0A09; }
    ::-webkit-scrollbar-thumb { background:#DC2626; border-radius:10px; }

    /* CTA gradient */
    .cta-bg {
      background: linear-gradient(135deg,#450a0a,#7f1d1d,#991b1b,#dc2626);
      background-size:300% 300%;
      animation:gradientShift 6s ease infinite;
    }

    /* Input */
    .nl-input {
      background:rgba(255,255,255,0.08);
      border:1px solid rgba(255,255,255,0.15);
      border-radius:50px;
      padding:0.75rem 1.25rem;
      color:#fff;
      font-family:'DM Sans',sans-serif;
      font-size:0.9rem;
      outline:none;
      transition:border 0.2s;
      width:100%;
    }
    .nl-input::placeholder { color:rgba(255,255,255,0.4); }
    .nl-input:focus { border-color:rgba(220,38,38,0.6); }

    /* Hero badge */
    .hero-badge {
      display:inline-flex; align-items:center; gap:8px;
      background:rgba(220,38,38,0.15);
      border:1px solid rgba(220,38,38,0.3);
      border-radius:50px;
      padding:0.4rem 1.1rem;
      font-size:0.82rem;
      font-weight:500;
      color:#FCA5A5;
      letter-spacing:0.04em;
      text-transform:uppercase;
    }

    /* Decorative ring */
    .deco-ring {
      border-radius:50%;
      border:1px solid rgba(220,38,38,0.2);
      position:absolute; pointer-events:none;
    }

    .section-pad { padding: 6rem 0; }
    @media(max-width:768px){ .section-pad{padding:4rem 0;} }
  `}</style>
);

/* ─── Hero SVG Illustration ───────────────────────────────────── */
const HeroIllustration = () => (
  <svg viewBox="0 0 480 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg mx-auto">
    <defs>
      <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#DC2626" stopOpacity="0.25"/>
        <stop offset="100%" stopColor="#DC2626" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="drop1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444"/>
        <stop offset="100%" stopColor="#7F1D1D"/>
      </linearGradient>
      <linearGradient id="drop2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCA5A5"/>
        <stop offset="100%" stopColor="#DC2626"/>
      </linearGradient>
      <filter id="blur1"><feGaussianBlur stdDeviation="8"/></filter>
      <filter id="shadow1"><feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#DC2626" floodOpacity="0.4"/></filter>
    </defs>
    {/* Glow circles */}
    <circle cx="240" cy="260" r="200" fill="url(#glow1)" filter="url(#blur1)"/>
    <circle cx="240" cy="260" r="180" stroke="rgba(220,38,38,0.15)" strokeWidth="1" fill="none"/>
    <circle cx="240" cy="260" r="140" stroke="rgba(220,38,38,0.1)" strokeWidth="1" fill="none"/>
    {/* Heart shape */}
    <path d="M240 380 C240 380 110 295 110 210 C110 165 145 135 175 130 C205 125 225 145 240 165 C255 145 275 125 305 130 C335 135 370 165 370 210 C370 295 240 380 240 380Z" fill="url(#drop1)" filter="url(#shadow1)" opacity="0.95"/>
    {/* Heart shine */}
    <path d="M175 155 C165 170 158 190 162 210" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round"/>
    {/* Blood drop 1 */}
    <path d="M150 110 C150 110 130 85 130 72 C130 60 140 52 150 52 C160 52 170 60 170 72 C170 85 150 110 150 110Z" fill="url(#drop2)" opacity="0.85"/>
    {/* Blood drop 2 */}
    <path d="M340 130 C340 130 323 108 323 97 C323 87 331 80 340 80 C349 80 357 87 357 97 C357 108 340 130 340 130Z" fill="url(#drop2)" opacity="0.7"/>
    {/* Blood drop 3 small */}
    <path d="M95 200 C95 200 83 183 83 175 C83 167 89 162 95 162 C101 162 107 167 107 175 C107 183 95 200 95 200Z" fill="url(#drop2)" opacity="0.55"/>
    {/* Cross / plus icon in heart */}
    <rect x="228" y="230" width="24" height="8" rx="4" fill="rgba(255,255,255,0.9)"/>
    <rect x="236" y="222" width="8" height="24" rx="4" fill="rgba(255,255,255,0.9)"/>
    {/* ECG line */}
    <path d="M60 420 L130 420 L155 380 L175 460 L200 390 L220 420 L420 420" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
    {/* Floating particles */}
    <circle cx="80"  cy="140" r="4" fill="#FCA5A5" opacity="0.6"/>
    <circle cx="400" cy="180" r="3" fill="#FCA5A5" opacity="0.5"/>
    <circle cx="60"  cy="320" r="5" fill="#EF4444" opacity="0.4"/>
    <circle cx="420" cy="310" r="4" fill="#EF4444" opacity="0.45"/>
    <circle cx="200" cy="60"  r="3" fill="#FCA5A5" opacity="0.55"/>
    <circle cx="380" cy="90"  r="4" fill="#FCA5A5" opacity="0.4"/>
    {/* Stats badges */}
    <rect x="30" y="230" width="110" height="54" rx="14" fill="rgba(220,38,38,0.15)" stroke="rgba(220,38,38,0.3)" strokeWidth="1"/>
    <text x="85" y="253" textAnchor="middle" fill="#FCA5A5" fontFamily="Fraunces,serif" fontSize="16" fontWeight="700">50K+</text>
    <text x="85" y="272" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontFamily="DM Sans,sans-serif" fontSize="10">Donors</text>
    <rect x="340" y="310" width="110" height="54" rx="14" fill="rgba(220,38,38,0.15)" stroke="rgba(220,38,38,0.3)" strokeWidth="1"/>
    <text x="395" y="333" textAnchor="middle" fill="#FCA5A5" fontFamily="Fraunces,serif" fontSize="16" fontWeight="700">120K+</text>
    <text x="395" y="352" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontFamily="DM Sans,sans-serif" fontSize="10">Lives Saved</text>
  </svg>
);

/* ─── Hooks ───────────────────────────────────────────────────── */
function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function useCounter(end, duration, trigger) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let cur = 0;
    const step = end / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setVal(end); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [trigger, end, duration]);
  return val;
}

/* ─── Navbar ──────────────────────────────────────────────────── */
function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Home","About","Donate","Contact"];
  const navBg = scrolled
    ? dark ? "rgba(12,10,9,0.92)" : "rgba(255,255,255,0.92)"
    : "transparent";
  const border = scrolled
    ? dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)"
    : "1px solid transparent";

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, background:navBg, backdropFilter:scrolled?"blur(24px)":"none", border, transition:"all 0.4s ease" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:72 }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
          <div style={{ width:38, height:38, background:"linear-gradient(135deg,#DC2626,#7F1D1D)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Heart size={18} fill="white" color="white"/>
          </div>
          <span className="display" style={{ fontSize:"1.3rem", fontWeight:700, color:dark?"#F9FAFB":"#1C1917" }}>
            BloodLink
          </span>
        </div>
        {/* Desktop links */}
        <div style={{ display:"flex", gap:"2rem", alignItems:"center" }} className="desktop-nav" id="desktop-links">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-lnk"
              style={{ color:dark?"rgba(255,255,255,0.8)":"rgba(28,25,23,0.75)", fontWeight:500, fontSize:"0.95rem", textDecoration:"none" }}>
              {l}
            </a>
          ))}
        </div>
        {/* Right buttons */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <button onClick={() => setDark(!dark)} style={{ background:"none", border:`1px solid ${dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.15)"}`, borderRadius:8, width:38, height:38, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:dark?"#fff":"#1C1917", transition:"all 0.2s" }}>
            {dark ? <Sun size={16}/> : <Moon size={16}/>}
          </button>
          <button className="btn-outline-dark" style={{ display:"none", padding:"0.5rem 1.2rem", fontSize:"0.85rem", color:dark?"rgba(255,255,255,0.85)":"undefined", borderColor:dark?"rgba(255,255,255,0.3)":"rgba(28,25,23,0.3)" }} id="login-btn">Login</button>
          <button className="btn-red" style={{ padding:"0.6rem 1.4rem", fontSize:"0.88rem" }}>Register</button>
          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} style={{ background:"none", border:"none", cursor:"pointer", color:dark?"#fff":"#1C1917", display:"none" }} id="hamburger">
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div style={{ padding:"1rem 1.5rem 1.5rem", background:dark?"#0C0A09":"#fff", borderTop:`1px solid ${dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)"}` }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ display:"block", padding:"0.75rem 0", color:dark?"rgba(255,255,255,0.8)":"rgba(28,25,23,0.8)", fontWeight:500, borderBottom:`1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"}`, textDecoration:"none" }}>
              {l}
            </a>
          ))}
          <div style={{ display:"flex", gap:10, marginTop:"1rem" }}>
            <button className="btn-outline-dark" style={{ flex:1, color:dark?"rgba(255,255,255,0.85)":"undefined", borderColor:dark?"rgba(255,255,255,0.3)":"undefined" }}>Login</button>
            <button className="btn-red" style={{ flex:1 }}>Register</button>
          </div>
        </div>
      )}
      <style>{`
        @media(max-width:768px){
          #desktop-links{display:none!important}
          #hamburger{display:flex!important}
        }
        @media(min-width:769px){
          #login-btn{display:flex!important}
        }
      `}</style>
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */
function Hero({ dark }) {
  return (
    <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", paddingTop:72, background:dark?"#0C0A09":"#FAFAF9" }}>
      {/* BG blobs */}
      <div style={{ position:"absolute", top:"-10%", right:"-5%", width:600, height:600, background:"radial-gradient(circle,rgba(220,38,38,0.12) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"5%", left:"-10%", width:500, height:500, background:"radial-gradient(circle,rgba(220,38,38,0.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
      {/* Grid pattern */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle,${dark?"rgba(220,38,38,0.06)":"rgba(220,38,38,0.04)"} 1px,transparent 1px)`, backgroundSize:"40px 40px", pointerEvents:"none" }}/>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"4rem 1.5rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center" }}>
        {/* Left */}
        <div className="anim-fade-left">
          <div className="hero-badge" style={{ marginBottom:"1.5rem" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#DC2626", animation:"blink 1.4s ease-in-out infinite", display:"inline-block" }}/>
            Save Lives · Donate Today
          </div>
          <h1 className="display" style={{ fontSize:"clamp(2.8rem,5vw,4.2rem)", fontWeight:900, lineHeight:1.05, color:dark?"#F9FAFB":"#1C1917", marginBottom:"1.5rem" }}>
            Donate Blood,<br/>
            <span style={{ color:"#DC2626" }}>Save Lives</span> &<br/>
            Be a Hero.
          </h1>
          <p style={{ fontSize:"1.1rem", lineHeight:1.8, color:dark?"rgba(255,255,255,0.6)":"rgba(28,25,23,0.65)", maxWidth:440, marginBottom:"2.5rem" }}>
            Every drop of blood you donate can save up to three lives. Join thousands of heroes who give the gift of life through BloodLink — the fastest blood donation network.
          </p>
          {/* Trust indicators */}
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem", marginBottom:"2.5rem", flexWrap:"wrap" }}>
            {[["50K+","Donors"],["120K+","Lives Saved"],["500+","Hospitals"]].map(([n,l]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div className="display" style={{ fontSize:"1.5rem", fontWeight:700, color:"#DC2626" }}>{n}</div>
                <div style={{ fontSize:"0.78rem", color:dark?"rgba(255,255,255,0.5)":"rgba(28,25,23,0.5)", fontWeight:500 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <button className="btn-red" style={{ display:"flex", alignItems:"center", gap:8 }}>
              <Heart size={16} fill="white"/> Become a Donor
            </button>
            <button className="btn-outline" style={{ color:dark?"#fff":"#1C1917", borderColor:dark?"rgba(255,255,255,0.3)":"rgba(28,25,23,0.3)" }}>
              Login to Dashboard
            </button>
          </div>
          {/* Social proof */}
          <div style={{ marginTop:"2.5rem", display:"flex", alignItems:"center", gap:"1rem" }}>
            <div style={{ display:"flex" }}>
              {["#DC2626","#EF4444","#FCA5A5","#991B1B"].map((c,i) => (
                <div key={i} style={{ width:32, height:32, borderRadius:"50%", background:c, border:"2px solid #0C0A09", marginLeft:i?-10:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Users size={12} color="white"/>
                </div>
              ))}
            </div>
            <p style={{ fontSize:"0.82rem", color:dark?"rgba(255,255,255,0.55)":"rgba(28,25,23,0.55)" }}>
              <strong style={{ color:dark?"#fff":"#1C1917" }}>2,400+</strong> new donors joined this month
            </p>
          </div>
        </div>
        {/* Right – illustration */}
        <div className="anim-float" style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
          <HeroIllustration/>
        </div>
      </div>
      {/* Scroll cue */}
      <div style={{ position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
        <span style={{ fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase", color:dark?"rgba(255,255,255,0.35)":"rgba(28,25,23,0.35)" }}>Scroll</span>
        <div style={{ width:1, height:36, background:`linear-gradient(180deg,${dark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.25)"},transparent)` }}/>
      </div>
      <style>{`@media(max-width:768px){#home > div{grid-template-columns:1fr!important} #home svg{display:none}}`}</style>
    </section>
  );
}

/* ─── Features ────────────────────────────────────────────────── */
const features = [
  { icon: Search,        title: "Find Blood Donors",        desc: "Search verified donors by blood group, location, and availability in real-time." },
  { icon: Bell,          title: "Emergency Requests",       desc: "Broadcast urgent blood requests instantly to nearby donors within seconds." },
  { icon: MapPin,        title: "Nearby Donor Search",      desc: "GPS-powered search to locate the closest compatible donors near any hospital." },
  { icon: Shield,        title: "Secure Registration",      desc: "Bank-grade security protects your data. Verified donors only. Privacy first." },
  { icon: Zap,           title: "Fast Response System",     desc: "AI-matched donor alerts ensure responses in under 15 minutes on average." },
  { icon: HeartHandshake,title: "Save Human Lives",         desc: "Every donation directly saves up to 3 lives. Track your impact in real time." },
];

function Features({ dark }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const cardClass = dark ? "feat-card" : "feat-card-light";

  return (
    <section id="donate" className="section-pad" style={{ background:dark?"#0F0D0C":"#F5F5F4" }} ref={ref}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }} className={visible?"anim-fade-up":""}>
          <p style={{ color:"#DC2626", fontWeight:600, fontSize:"0.85rem", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"0.75rem" }}>What We Offer</p>
          <h2 className="display" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, color:dark?"#F9FAFB":"#1C1917", lineHeight:1.15 }}>
            Powerful Features for<br/>a Life-Saving Platform
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.5rem" }}>
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className={`${cardClass} ${visible?"anim-fade-up":""}`} style={{ animationDelay:`${i*0.1}s` }}>
              <div style={{ width:52, height:52, background:"linear-gradient(135deg,#DC2626,#7F1D1D)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.25rem", boxShadow:"0 8px 24px rgba(220,38,38,0.3)" }}>
                <Icon size={22} color="white"/>
              </div>
              <h3 className="display" style={{ fontSize:"1.15rem", fontWeight:700, color:dark?"#F9FAFB":"#1C1917", marginBottom:"0.6rem" }}>{title}</h3>
              <p style={{ fontSize:"0.92rem", lineHeight:1.7, color:dark?"rgba(255,255,255,0.55)":"rgba(28,25,23,0.6)" }}>{desc}</p>
              <div style={{ marginTop:"1.25rem", display:"flex", alignItems:"center", gap:6, color:"#DC2626", fontSize:"0.85rem", fontWeight:600, cursor:"pointer" }}>
                Learn more <ArrowRight size={14}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ───────────────────────────────────────────────────── */
function About({ dark }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const items = ["100% free donor–patient matching","Emergency 24/7 support hotline","Nationwide hospital network","HIPAA-compliant data privacy"];

  return (
    <section id="about" className="section-pad" style={{ background:dark?"#0C0A09":"#FAFAF9" }} ref={ref}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center" }}>
        {/* Visual */}
        <div className={visible?"anim-fade-left":""} style={{ position:"relative" }}>
          <div style={{ position:"relative", borderRadius:28, overflow:"hidden", aspectRatio:"4/5", background:dark?"#1C1917":"#F0EDE8", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {/* Decorative placeholder */}
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(220,38,38,0.08),transparent)" }}/>
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"50%", background:"linear-gradient(0deg,rgba(220,38,38,0.18),transparent)" }}/>
            <svg viewBox="0 0 300 380" fill="none" width="80%">
              <defs>
                <linearGradient id="ab1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444"/><stop offset="100%" stopColor="#7F1D1D"/>
                </linearGradient>
              </defs>
              <rect width="300" height="380" rx="20" fill={dark?"#1a1715":"#F5F0EA"}/>
              {/* Large drop */}
              <path d="M150 290 C150 290 80 220 80 170 C80 135 113 110 150 110 C187 110 220 135 220 170 C220 220 150 290 150 290Z" fill="url(#ab1)" opacity="0.9"/>
              <path d="M135 145 C125 155 118 170 120 185" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round"/>
              {/* Heartbeat line */}
              <path d="M30 330 L80 330 L100 295 L115 365 L132 310 L148 330 L270 330" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              {/* Info badges */}
              <rect x="20" y="40" width="110" height="44" rx="12" fill="rgba(220,38,38,0.15)" stroke="rgba(220,38,38,0.3)"/>
              <text x="75" y="58" textAnchor="middle" fill="#FCA5A5" fontFamily="Fraunces,serif" fontSize="14" fontWeight="700">Every 2s</text>
              <text x="75" y="74" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontFamily="DM Sans,sans-serif" fontSize="9">someone needs blood</text>
              <rect x="170" y="55" width="110" height="44" rx="12" fill="rgba(220,38,38,0.15)" stroke="rgba(220,38,38,0.3)"/>
              <text x="225" y="73" textAnchor="middle" fill="#FCA5A5" fontFamily="Fraunces,serif" fontSize="14" fontWeight="700">1 Pint</text>
              <text x="225" y="89" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontFamily="DM Sans,sans-serif" fontSize="9">saves 3 lives</text>
            </svg>
          </div>
          {/* Floating card */}
          <div className="glass" style={{ position:"absolute", bottom:-20, right:-20, borderRadius:18, padding:"1.25rem 1.5rem", minWidth:180 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:42, height:42, background:"linear-gradient(135deg,#DC2626,#7F1D1D)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Activity size={18} color="white"/>
              </div>
              <div>
                <div className="display" style={{ fontSize:"1.3rem", fontWeight:700, color:"#FCA5A5" }}>98.7%</div>
                <div style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.5)" }}>Success Rate</div>
              </div>
            </div>
          </div>
          {/* Decorative rings */}
          <div className="deco-ring" style={{ width:80, height:80, top:-30, left:-30 }}/>
          <div className="deco-ring" style={{ width:50, height:50, top:-15, left:-15 }}/>
        </div>
        {/* Text */}
        <div className={visible?"anim-fade-right":""}>
          <p style={{ color:"#DC2626", fontWeight:600, fontSize:"0.85rem", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"0.75rem" }}>About BloodLink</p>
          <h2 className="display" style={{ fontSize:"clamp(2rem,3.5vw,2.8rem)", fontWeight:800, color:dark?"#F9FAFB":"#1C1917", lineHeight:1.2, marginBottom:"1.5rem" }}>
            Bridging the Gap Between Donors & Patients
          </h2>
          <p style={{ fontSize:"1rem", lineHeight:1.85, color:dark?"rgba(255,255,255,0.6)":"rgba(28,25,23,0.65)", marginBottom:"1.25rem" }}>
            BloodLink was founded with a single mission: to make blood donation accessible, fast, and life-changing. We connect verified donors with patients in need — creating a network of compassion that saves thousands of lives every year.
          </p>
          <p style={{ fontSize:"1rem", lineHeight:1.85, color:dark?"rgba(255,255,255,0.6)":"rgba(28,25,23,0.65)", marginBottom:"2rem" }}>
            Our platform uses cutting-edge technology to match donors with recipients in minutes, not hours. Because in emergencies, every second matters.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem", marginBottom:"2.5rem" }}>
            {items.map(item => (
              <div key={item} style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:22, height:22, borderRadius:"50%", background:"rgba(220,38,38,0.15)", border:"1px solid rgba(220,38,38,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <CheckCircle size={12} color="#DC2626"/>
                </div>
                <span style={{ fontSize:"0.92rem", color:dark?"rgba(255,255,255,0.75)":"rgba(28,25,23,0.75)", fontWeight:500 }}>{item}</span>
              </div>
            ))}
          </div>
          <button className="btn-red" style={{ display:"inline-flex", alignItems:"center", gap:8 }}>
            Learn Our Story <ArrowRight size={15}/>
          </button>
        </div>
      </div>
      <style>{`@media(max-width:768px){#about > div{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ─── Statistics ──────────────────────────────────────────────── */
const stats = [
  { end:50000, label:"Total Donors",       suffix:"+" , icon:Users },
  { end:32000, label:"Blood Requests",     suffix:"+",  icon:Droplets },
  { end:120000,label:"Lives Saved",        suffix:"+",  icon:Heart },
  { end:500,   label:"Hospitals Connected",suffix:"+",  icon:Globe },
];

function StatCard({ end, label, suffix, icon: Icon, trigger, dark }) {
  const count = useCounter(end, 2200, trigger);
  const display = count >= 1000 ? `${(count/1000).toFixed(count>=10000?0:1)}K` : count;
  return (
    <div style={{ textAlign:"center", padding:"2.5rem 1.5rem", borderRadius:20, background:dark?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.7)", border:`1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(220,38,38,0.12)"}`, backdropFilter:"blur(10px)" }}>
      <div style={{ width:56, height:56, background:"linear-gradient(135deg,#DC2626,#7F1D1D)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.25rem", boxShadow:"0 10px 30px rgba(220,38,38,0.3)" }}>
        <Icon size={22} color="white" fill={Icon===Heart?"white":"none"}/>
      </div>
      <div className="stat-num display" style={{ fontSize:"2.8rem", fontWeight:900, lineHeight:1 }}>
        {display}{suffix}
      </div>
      <div style={{ fontSize:"0.9rem", color:dark?"rgba(255,255,255,0.5)":"rgba(28,25,23,0.55)", fontWeight:500, marginTop:"0.5rem" }}>{label}</div>
    </div>
  );
}

function Statistics({ dark }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section className="section-pad" style={{ background:dark?"#0F0D0C":"#F5F5F4" }} ref={ref}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }} className={visible?"anim-fade-up":""}>
          <p style={{ color:"#DC2626", fontWeight:600, fontSize:"0.85rem", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"0.75rem" }}>Our Impact</p>
          <h2 className="display" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, color:dark?"#F9FAFB":"#1C1917", lineHeight:1.15 }}>
            Numbers That Speak<br/>For Themselves
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1.5rem" }}>
          {stats.map((s,i) => (
            <div key={s.label} className={visible?"anim-scale-in":""} style={{ animationDelay:`${i*0.12}s` }}>
              <StatCard {...s} trigger={visible} dark={dark}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Blood Groups ────────────────────────────────────────────── */
const groups = ["A+","A−","B+","B−","AB+","AB−","O+","O−"];
const colors  = [
  ["#DC2626","#7F1D1D"],["#EF4444","#991B1B"],["#B91C1C","#450A0A"],["#F87171","#B91C1C"],
  ["#991B1B","#3B0707"],["#FCA5A5","#DC2626"],["#7F1D1D","#3B0707"],["#DC2626","#450A0A"],
];

function BloodGroups({ dark }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section className="section-pad" style={{ background:dark?"#0C0A09":"#FAFAF9" }} ref={ref}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }} className={visible?"anim-fade-up":""}>
          <p style={{ color:"#DC2626", fontWeight:600, fontSize:"0.85rem", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"0.75rem" }}>Blood Types</p>
          <h2 className="display" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, color:dark?"#F9FAFB":"#1C1917", lineHeight:1.15 }}>
            All Blood Groups<br/>We Support
          </h2>
          <p style={{ fontSize:"1rem", color:dark?"rgba(255,255,255,0.55)":"rgba(28,25,23,0.6)", maxWidth:480, margin:"1rem auto 0" }}>
            Find donors for every blood group. Our network covers all 8 major blood types with verified, ready donors.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:"1.25rem" }}>
          {groups.map((g,i) => (
            <div key={g} className={`bg-card ${visible?"anim-scale-in":""}`}
              style={{ background:`linear-gradient(135deg,${colors[i][0]},${colors[i][1]})`, padding:"2rem 1rem", textAlign:"center", cursor:"pointer", animationDelay:`${i*0.07}s` }}>
              <Droplets size={28} color="rgba(255,255,255,0.5)" style={{ margin:"0 auto 0.75rem" }}/>
              <div className="display" style={{ fontSize:"2rem", fontWeight:900, color:"#fff", lineHeight:1 }}>{g}</div>
              <div style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.65)", marginTop:"0.4rem", fontWeight:500 }}>Available</div>
              <div style={{ marginTop:"0.9rem", padding:"0.3rem 0.9rem", background:"rgba(255,255,255,0.15)", borderRadius:50, display:"inline-block", fontSize:"0.72rem", color:"#fff", fontWeight:600 }}>Find Donor</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ────────────────────────────────────────────── */
const testimonials = [
  { name:"Aisha Rahman",    role:"Blood Recipient",  text:"BloodLink saved my mother's life in just 40 minutes during a critical surgery. The response was incredibly fast — I'm forever grateful to every donor on this platform.",  stars:5, initials:"AR", color:"#DC2626" },
  { name:"James Okafor",    role:"Regular Donor",    text:"Donating blood is the most impactful 30 minutes I spend. BloodLink makes the entire process seamless — scheduling, reminders, and knowing exactly who I'm helping.",          stars:5, initials:"JO", color:"#7F1D1D" },
  { name:"Priya Nair",      role:"Emergency Nurse",  text:"As a nurse, I've seen BloodLink cut emergency blood procurement from hours to minutes. It's genuinely transforming how we handle critical cases in our hospital.",              stars:5, initials:"PN", color:"#991B1B" },
  { name:"Carlos Mendez",   role:"First-Time Donor", text:"I was nervous about donating for the first time, but BloodLink's guidance made it effortless. Now I donate every 56 days and track the lives I've helped save.",               stars:5, initials:"CM", color:"#B91C1C" },
];

function Testimonials({ dark }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section className="section-pad" style={{ background:dark?"#0F0D0C":"#F5F5F4" }} ref={ref}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem" }}>
        <div style={{ textAlign:"center", marginBottom:"4rem" }} className={visible?"anim-fade-up":""}>
          <p style={{ color:"#DC2626", fontWeight:600, fontSize:"0.85rem", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"0.75rem" }}>Stories</p>
          <h2 className="display" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, color:dark?"#F9FAFB":"#1C1917", lineHeight:1.15 }}>
            Real People,<br/>Real Impact
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.5rem" }}>
          {testimonials.map(({ name, role, text, stars, initials, color }, i) => (
            <div key={name} className={`testi-card ${visible?"anim-fade-up":""}`}
              style={{ background:dark?"rgba(255,255,255,0.03)":"#fff", border:`1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"}`, animationDelay:`${i*0.1}s`, boxShadow:dark?"none":"0 4px 24px rgba(0,0,0,0.06)" }}>
              {/* Stars */}
              <div style={{ display:"flex", gap:3, marginBottom:"1rem" }}>
                {Array(stars).fill(0).map((_,j) => <Star key={j} size={14} fill="#EF4444" color="#EF4444"/>)}
              </div>
              {/* Quote */}
              <p style={{ fontSize:"0.92rem", lineHeight:1.8, color:dark?"rgba(255,255,255,0.65)":"rgba(28,25,23,0.7)", marginBottom:"1.5rem", fontStyle:"italic" }}>
                "{text}"
              </p>
              {/* Author */}
              <div style={{ display:"flex", alignItems:"center", gap:12, borderTop:`1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"}`, paddingTop:"1rem" }}>
                <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg,${color},${color}99)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ color:"#fff", fontWeight:700, fontSize:"0.85rem" }}>{initials}</span>
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:"0.92rem", color:dark?"#F9FAFB":"#1C1917" }}>{name}</div>
                  <div style={{ fontSize:"0.78rem", color:"#DC2626", fontWeight:500 }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─────────────────────────────────────────────────────── */
function CTA() {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section className="section-pad" ref={ref}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem" }}>
        <div className={`cta-bg ${visible?"anim-scale-in":""}`}
          style={{ borderRadius:32, padding:"5rem 3rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
          {/* Overlays */}
          <div style={{ position:"absolute", top:"-20%", right:"-5%", width:400, height:400, background:"rgba(255,255,255,0.04)", borderRadius:"50%", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:"-30%", left:"-5%", width:350, height:350, background:"rgba(0,0,0,0.15)", borderRadius:"50%", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize:"30px 30px", pointerEvents:"none" }}/>
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:50, padding:"0.4rem 1.1rem", marginBottom:"1.5rem", fontSize:"0.82rem", color:"rgba(255,255,255,0.85)", fontWeight:500, letterSpacing:"0.04em", textTransform:"uppercase" }}>
              <Heart size={12} fill="white" color="white"/> Join Thousands of Heroes
            </div>
            <h2 className="display" style={{ fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:900, color:"#fff", lineHeight:1.1, marginBottom:"1.25rem" }}>
              Your One Donation<br/>Can Save Multiple Lives
            </h2>
            <p style={{ fontSize:"1.1rem", color:"rgba(255,255,255,0.72)", maxWidth:540, margin:"0 auto 2.5rem", lineHeight:1.8 }}>
              It takes only 30 minutes. One act of courage can give three people a second chance at life. Register today and become part of something extraordinary.
            </p>
            <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
              <button style={{ background:"#fff", color:"#DC2626", border:"none", borderRadius:50, padding:"0.9rem 2.2rem", fontFamily:"DM Sans,sans-serif", fontWeight:700, fontSize:"0.95rem", cursor:"pointer", transition:"all 0.3s ease", display:"flex", alignItems:"center", gap:8 }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 18px 45px rgba(0,0,0,0.3)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
                <Heart size={16} fill="#DC2626" color="#DC2626"/> Register Now — It's Free
              </button>
              <button style={{ background:"rgba(255,255,255,0.12)", color:"#fff", border:"2px solid rgba(255,255,255,0.35)", borderRadius:50, padding:"0.9rem 2.2rem", fontFamily:"DM Sans,sans-serif", fontWeight:600, fontSize:"0.95rem", cursor:"pointer", transition:"all 0.3s ease" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.22)";e.currentTarget.style.transform="translateY(-3px)"}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.12)";e.currentTarget.style.transform="none"}}>
                Learn How It Works
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer({ dark }) {
  const socials = [
  ];
  const quick = ["Home","About Us","Find Donors","Emergency Request","Register as Donor","Contact Us"];
  const resources = ["Blood Types Guide","Donation FAQ","Hospital Network","Success Stories","Privacy Policy","Terms of Service"];

  return (
    <footer id="contact" style={{ background:dark?"#07060A":"#111827", paddingTop:"5rem", paddingBottom:"2rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1.5rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.5fr", gap:"3rem", marginBottom:"4rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1.25rem" }}>
              <div style={{ width:38, height:38, background:"linear-gradient(135deg,#DC2626,#7F1D1D)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Heart size={18} fill="white" color="white"/>
              </div>
              <span className="display" style={{ fontSize:"1.3rem", fontWeight:700, color:"#F9FAFB" }}>BloodLink</span>
            </div>
            <p style={{ fontSize:"0.9rem", lineHeight:1.8, color:"rgba(255,255,255,0.45)", marginBottom:"1.75rem", maxWidth:280 }}>
              Connecting blood donors with those in need. Every drop matters. Join our mission to save lives, one donation at a time.
            </p>
            {/* Contact info */}
            <div style={{ display:"flex", flexDirection:"column", gap:"0.7rem", marginBottom:"1.75rem" }}>
              {[[Phone,"1-800-BLOOD-LINK"],[Mail,"help@bloodlink.org"],[MapPin,"Available Worldwide"]].map(([Icon,text]) => (
                <div key={text} style={{ display:"flex", alignItems:"center", gap:10, color:"rgba(255,255,255,0.45)", fontSize:"0.85rem" }}>
                  <Icon size={14} color="#DC2626"/>{text}
                </div>
              ))}
            </div>
            {/* Socials */}
            <div style={{ display:"flex", gap:10 }}>
              {socials.map(({ icon: Icon, href },i) => (
                <a key={i} href={href} style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", color:"rgba(255,255,255,0.5)", textDecoration:"none" }}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(220,38,38,0.2)";e.currentTarget.style.borderColor="rgba(220,38,38,0.4)";e.currentTarget.style.color="#FCA5A5"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.color="rgba(255,255,255,0.5)"}}>
                  <Icon size={15}/>
                </a>
              ))}
            </div>
          </div>
          {/* Quick links */}
          <div>
            <h4 style={{ fontSize:"0.85rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(255,255,255,0.6)", marginBottom:"1.25rem" }}>Quick Links</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
              {quick.map(l => (
                <a key={l} href="#" style={{ fontSize:"0.88rem", color:"rgba(255,255,255,0.4)", textDecoration:"none", transition:"color 0.2s", display:"flex", alignItems:"center", gap:6 }}
                  onMouseEnter={e=>{e.currentTarget.style.color="#FCA5A5"}}
                  onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,0.4)"}}>
                  <ChevronRight size={12} color="#DC2626"/>{l}
                </a>
              ))}
            </div>
          </div>
          {/* Resources */}
          <div>
            <h4 style={{ fontSize:"0.85rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(255,255,255,0.6)", marginBottom:"1.25rem" }}>Resources</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
              {resources.map(l => (
                <a key={l} href="#" style={{ fontSize:"0.88rem", color:"rgba(255,255,255,0.4)", textDecoration:"none", transition:"color 0.2s", display:"flex", alignItems:"center", gap:6 }}
                  onMouseEnter={e=>{e.currentTarget.style.color="#FCA5A5"}}
                  onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,0.4)"}}>
                  <ChevronRight size={12} color="#DC2626"/>{l}
                </a>
              ))}
            </div>
          </div>
          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize:"0.85rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(255,255,255,0.6)", marginBottom:"1.25rem" }}>Stay Updated</h4>
            <p style={{ fontSize:"0.88rem", color:"rgba(255,255,255,0.4)", lineHeight:1.7, marginBottom:"1.25rem" }}>
              Subscribe for blood drive updates, donor tips, and emergency alerts in your area.
            </p>
            <div style={{ position:"relative", marginBottom:"0.75rem" }}>
              <input type="email" placeholder="Enter your email" className="nl-input"/>
            </div>
            <button className="btn-red" style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <Send size={14}/> Subscribe
            </button>
            <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.25)", marginTop:"0.75rem" }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"2rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
          <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.3)" }}>
            © 2025 BloodLink. All rights reserved. Made with <span style={{ color:"#DC2626" }}>♥</span> for humanity.
          </p>
          <div style={{ display:"flex", gap:"1.5rem" }}>
            {["Privacy","Terms","Cookies"].map(l => (
              <a key={l} href="#" style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.3)", textDecoration:"none", transition:"color 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.color="#FCA5A5"}}
                onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,0.3)"}}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){footer > div > div:first-of-type{grid-template-columns:1fr 1fr!important}}@media(max-width:580px){footer > div > div:first-of-type{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}

/* ─── ScrollToTop ─────────────────────────────────────────────── */
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button className="scroll-to-top btn-red anim-pulse-ring"
      onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      style={{ position:"fixed", bottom:"2rem", right:"2rem", width:48, height:48, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999, padding:0 }}>
      <ArrowUp size={18}/>
    </button>
  );
}

/* ─── App ─────────────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(true);

  return (
    <div style={{ background: dark ? "#0C0A09" : "#FAFAF9", minHeight:"100vh" }}>
      <GlobalStyles/>
      <Navbar dark={dark} setDark={setDark}/>
      <Hero dark={dark}/>
      <Features dark={dark}/>
      <About dark={dark}/>
      <Statistics dark={dark}/>
      <BloodGroups dark={dark}/>
      <Testimonials dark={dark}/>
      <CTA/>
      <Footer dark={dark}/>
      <ScrollToTop/>
    </div>
  );
}