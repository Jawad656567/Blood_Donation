import { useState, useEffect, useRef } from "react";
import { HeartPulse, Heart ,Bell, MapPin, PhoneCall, Zap, Target, Star } from "lucide-react";

// ── Animated Counter ──────────────────────────────────────────────────────────
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ── Intersection Observer Hook ────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Heartbeat SVG ─────────────────────────────────────────────────────────────
function HeartbeatLine() {
  return (
    <svg viewBox="0 0 400 60" className="w-full h-12" preserveAspectRatio="none">
      <polyline
        points="0,30 60,30 80,10 100,50 120,5 140,55 160,30 400,30"
        fill="none"
        stroke="#EF4444"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="heartbeat-line"
      />
    </svg>
  );
}

// ── Floating Blood Drop ───────────────────────────────────────────────────────
function BloodDrop({ className = "", size = 32, opacity = 0.15 }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 32 42"
      className={className}
      style={{ opacity }}
    >
      <path
        d="M16 0 C16 0 0 18 0 27 C0 36.4 7.2 42 16 42 C24.8 42 32 36.4 32 27 C32 18 16 0 16 0Z"
        fill="#DC2626"
      />
    </svg>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, target, suffix, label, color, start }) {
  const count = useCounter(target, 2200, start);
  return (
    <div className="relative group">
      <div
        className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-white border border-red-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
        style={{ background: "linear-gradient(135deg, #fff 60%, #fff5f5 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 -translate-y-6 translate-x-6"
          style={{ background: color }}
        />
        <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{icon}</div>
        <div className="flex items-end gap-1">
          <span className="text-3xl sm:text-4xl font-black" style={{ color }}>
            {count.toLocaleString()}
          </span>
          <span className="text-lg sm:text-xl font-bold pb-1" style={{ color }}>{suffix}</span>
        </div>
        <p className="text-gray-500 text-xs sm:text-sm mt-1 font-medium">{label}</p>
      </div>
    </div>
  );
}

// ── Why Donate Card ───────────────────────────────────────────────────────────
function WhyCard({ icon, title, desc, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl p-5 sm:p-7 bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-600 hover:-translate-y-2 cursor-default"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s, translate 0.3s`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <div className="relative z-10">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── Process Step ──────────────────────────────────────────────────────────────
function ProcessStep({ step, icon, title, desc, last }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="flex gap-4 sm:gap-6 relative" style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : "translateX(-30px)",
      transition: `opacity 0.5s ease ${step * 120}ms, transform 0.5s ease ${step * 120}ms`,
    }}>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-base sm:text-lg shadow-lg flex-shrink-0">
          {step}
        </div>
        {!last && <div className="w-0.5 flex-1 bg-gradient-to-b from-red-300 to-transparent mt-2" />}
      </div>
      <div className="pb-8 sm:pb-10">
        <div className="text-xl sm:text-2xl mb-1">{icon}</div>
        <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── Blood Type Card ───────────────────────────────────────────────────────────
function BloodTypeCard({ type, canGiveTo, canReceiveFrom, rare }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-2"
      style={{ boxShadow: hovered ? "0 20px 60px rgba(220,38,38,0.2)" : "0 2px 12px rgba(0,0,0,0.06)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="p-4 sm:p-6 transition-all duration-400"
        style={{
          background: hovered
            ? "linear-gradient(135deg, #DC2626, #7f1d1d)"
            : "linear-gradient(135deg, #fff5f5, #fff)",
        }}
      >
        {rare && (
          <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Rare</span>
        )}
        <div
          className="text-4xl sm:text-5xl font-black mb-2 sm:mb-3 transition-colors duration-400"
          style={{ color: hovered ? "#fff" : "#DC2626" }}
        >
          {type}
        </div>
        <div className={`text-xs font-semibold mb-1 transition-colors duration-400 ${hovered ? "text-red-200" : "text-gray-400"}`}>
          Gives to
        </div>
        <div className={`text-xs sm:text-sm font-bold mb-2 sm:mb-3 transition-colors duration-400 ${hovered ? "text-white" : "text-gray-700"}`}>
          {canGiveTo}
        </div>
        <div className={`text-xs font-semibold mb-1 transition-colors duration-400 ${hovered ? "text-red-200" : "text-gray-400"}`}>
          Receives from
        </div>
        <div className={`text-xs sm:text-sm font-bold transition-colors duration-400 ${hovered ? "text-white" : "text-gray-700"}`}>
          {canReceiveFrom}
        </div>
      </div>
    </div>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────────────────
function TestimonialCard({ name, role, quote, avatar, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s`,
      }}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #DC2626, #7f1d1d)" }}
        >
          {avatar}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm">{name}</p>
          <p className="text-gray-400 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FAQItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <button
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-900 text-sm pr-4">{q}</span>
        <div
          className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16M4 12h16" />
          </svg>
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
          {a}
        </div>
      </div>
    </div>
  );
}

// ── Main Home Page ────────────────────────────────────────────────────────────
export default function BloodDonationHome() {
  const [statsRef, statsInView] = useInView(0.2);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="font-sans bg-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        * { font-family: 'Sora', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-14px) rotate(5deg); }
          66% { transform: translateY(-7px) rotate(-3deg); }
        }
        @keyframes floatAlt {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-6deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220,38,38,0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 16px rgba(220,38,38,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(220,38,38,0); }
        }
        @keyframes heartbeat {
          0%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .float-1 { animation: float 6s ease-in-out infinite; }
        .float-2 { animation: floatAlt 8s ease-in-out infinite; }
        .float-3 { animation: float 7s ease-in-out infinite 1s; }
        .float-4 { animation: floatAlt 9s ease-in-out infinite 2s; }
        .pulse-btn { animation: pulse-ring 2.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite; }

        .hero-text-1 { animation: fadeUp 0.8s ease forwards 0.2s; opacity: 0; }
        .hero-text-2 { animation: fadeUp 0.8s ease forwards 0.5s; opacity: 0; }
        .hero-text-3 { animation: fadeUp 0.8s ease forwards 0.8s; opacity: 0; }
        .hero-text-4 { animation: fadeUp 0.8s ease forwards 1.1s; opacity: 0; }
        .hero-img { animation: scaleIn 1s ease forwards 0.4s; opacity: 0; }

        .heartbeat-line {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: heartbeat-draw 3s ease-in-out infinite;
        }
        @keyframes heartbeat-draw {
          0% { stroke-dashoffset: 600; opacity: 0; }
          20% { opacity: 1; }
          60% { stroke-dashoffset: 0; opacity: 1; }
          80%, 100% { stroke-dashoffset: -600; opacity: 0; }
        }

        .shimmer-text {
          background: linear-gradient(90deg, #DC2626 0%, #FCA5A5 40%, #DC2626 60%, #7f1d1d 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .partner-track {
          display: flex;
          gap: 2rem;
          animation: scroll-partners 20s linear infinite;
        }
        @keyframes scroll-partners {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .section-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .section-reveal.visible { opacity: 1; transform: translateY(0); }

        .gradient-mesh {
          background: #ffffff;
        }

        .dark-gradient {
          background: #ffffff;
        }

        .glass-card {
          background: rgba(220, 38, 38, 0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(220, 38, 38, 0.15);
        }

        .impact-number {
          background: linear-gradient(135deg, #DC2626, #EF4444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .story-card:hover .story-overlay {
          opacity: 1;
        }
        .story-overlay { transition: opacity 0.4s ease; }

        .blood-bg {
          background: #ffffff;
        }

        /* ── RESPONSIVE ORBIT ── */
        .orbit-container {
          position: relative;
          width: 100%;
          max-width: 550px;
          aspect-ratio: 1;
          margin: 0 auto;
        }

        @media (max-width: 480px) {
          .orbit-container { max-width: 300px; }
          .orbit-blood-node { width: 52px !important; height: 52px !important; font-size: 0.7rem !important; }
          .orbit-center { width: 100px !important; height: 100px !important; }
          .orbit-center-text { font-size: 0.65rem !important; }
        }
        @media (min-width: 481px) and (max-width: 640px) {
          .orbit-container { max-width: 360px; }
          .orbit-blood-node { width: 64px !important; height: 64px !important; font-size: 0.8rem !important; }
          .orbit-center { width: 120px !important; height: 120px !important; }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .orbit-container { max-width: 440px; }
          .orbit-blood-node { width: 80px !important; height: 80px !important; font-size: 0.9rem !important; }
          .orbit-center { width: 140px !important; height: 140px !important; }
        }
      `}</style>


{/* ── LIFEFLOW HERO SECTION ─────────────────────────────── */}
<div className="w-full font-sans bg-white">

  {/* ── Banner — aspect-ratio 4/1, no border radius ── */}
  <div className="relative w-full overflow-hidden bg-[#1a1a1a]" style={{ aspectRatio: '4/1' }}>

    {/* Background Image — right side */}
    <img
      src="banner.png"
      alt="Blood Donor"
      className="absolute right-0 top-0 w-full h-full object-cover object-top"
    />

    {/* Left Text — scales with banner */}
    <div className="absolute left-0 top-0 h-full w-[55%] flex flex-col justify-center
                    px-[4%] py-[3%] z-10">
      <p className="uppercase tracking-widest text-white/50 mb-[1vw]"
         style={{ fontSize: 'clamp(7px, 1vw, 11px)' }}>
        LifeFlow Pakistan
      </p>
      <h2 className="text-white font-bold leading-snug mb-[0.5vw]"
          style={{ fontSize: 'clamp(0.5rem, 2.2vw, 1.55rem)' }}>
        Her Donation Bachati Hai<br />
        Ek Zindagi. Aap Bhi<br />
        Shaamil Hon.
      </h2>
      <p className="text-white/60" style={{ fontSize: 'clamp(0.4rem, 1.2vw, 0.82rem)' }}>
        Her donation saves a life. Join us.
      </p>
    </div>

  </div>

{/* ── HERO ──────────────────────────────────────────────────────────── */}
    <section className="relative overflow-hidden gradient-mesh py-7 sm:py-20 lg:min-h-screen lg:flex lg:items-center lg:py-0">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-48 sm:w-72 lg:w-[600px] h-48 sm:h-72 lg:h-[600px] rounded-full opacity-5 blur-3xl" style={{ background: "radial-gradient(circle, #DC2626, transparent)" }} />
          <div className="absolute -bottom-20 left-0 w-48 sm:w-64 lg:w-[400px] h-48 sm:h-64 lg:h-[400px] rounded-full opacity-5 blur-3xl" style={{ background: "radial-gradient(circle, #EF4444, transparent)" }} />
        </div>

        {/* Floating blood drops */}
        <div className="absolute top-16 right-16 float-1 hidden lg:block"><BloodDrop size={48} opacity={0.12} /></div>
        <div className="absolute top-40 right-48 float-2 hidden lg:block"><BloodDrop size={28} opacity={0.08} /></div>
        <div className="absolute bottom-32 left-16 float-3 hidden lg:block"><BloodDrop size={36} opacity={0.1} /></div>
        <div className="absolute top-64 left-64 float-4 hidden xl:block"><BloodDrop size={20} opacity={0.07} /></div>

        {/* Decorative dot grid */}
        <div
          className="absolute right-0 top-0 h-full w-1/2 opacity-[0.03] pointer-events-none hidden lg:block"
          style={{
            backgroundImage: "radial-gradient(circle, #DC2626 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-8 lg:py-12 w-full">
         <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
            {/* Left content */}
            <div>
              <h1 className="hero-text-2 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight mb-3 sm:mb-5">
                <span className="block text-gray-900">Donate Blood</span>
                
                <span className="block shimmer-text">Save Lives</span>
              </h1>

              <p className="hero-text-3 text-gray-500 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg font-body">
                Every 2 seconds, someone in the world needs blood. One donation can save up to
                <span className="text-red-600 font-semibold"> 3 lives</span>. Be the reason someone
                gets to go home to their family tonight.
              </p>

              {/* CTAs */}
              <div className="hero-text-4 flex flex-col sm:flex-row flex-wrap gap-3  sm:gap-4">
                <button
                  className="group flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl text-white font-bold text-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                  style={{ background: "linear-gradient(135deg, #DC2626, #7f1d1d)", boxShadow: "0 8px 32px rgba(220,38,38,0.35)" }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                  </svg>
                  Become a Donor
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button className="group flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl border-2 border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 hover:border-red-400 transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Request Blood
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

              {/* Quick stats */}
              <div className="hero-text-4 flex gap-6 sm:gap-8 mt-1 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100">
                {[
                  { n: "500K+", l: "Active Donors" },
                  { n: "1.2M", l: "Lives Saved" },
                  { n: "350+", l: "Partner Hospitals" },
                ].map((s) => (
                  <div key={s.l}>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image composition */}
            <div className="hero-img relative hidden lg:block -translate-y-6 lg:-translate-y-14">
              <div className="relative">
                {/* Main image */}
                <div
                  className="relative  overflow-hidden "
                 
                >
                  <img
                    src="life.png"
                    alt="Blood donation"
                    className="w-full h-[400px] xl:h-[480px] "
                  />
                  <div className="absolute inset-0" />
                </div>

                {/* Floating card 2 */}
                <div className="float-2 absolute -top-6 -right-8 bg-white rounded-2xl p-4 shadow-2xl border border-red-50">
                  <div className="flex items-center gap-1 mt-2">
                  </div>
                </div>

                {/* Heartbeat line */}
                <div className="absolute bottom-6 left-6 right-6 opacity-70">
                  <HeartbeatLine />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


</div>



      {/* ── WHY DONATE ────────────────────────────────────────────────────── */}
      <section className=" sm:py-12 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-10 sm:mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                Every Drop
                <br />
                <span className="text-red-600">Changes Everything</span>
              </h2>
            </div>

            <p className="text-gray-500 text-base sm:text-lg leading-relaxed font-body">
              Blood cannot be manufactured — it can only come from generous donors
              like you. Your single donation has the power to transform multiple
              lives and bring hope to families in their darkest hour.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80",
                title: "Health Benefits for You",
                desc: "Regular donation improves cardiovascular health, reduces iron overload, and stimulates fresh blood cell production.",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
                title: "Emergency Lifeline",
                desc: "Accident victims, surgery patients, and cancer patients all depend on available blood supply — your donation is their lifeline.",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
                title: "Community Resilience",
                desc: "A robust blood bank ensures your city can respond to mass casualty events and public health emergencies.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-44 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOOD GROUPS ORBIT SECTION ───────────────────────────────────── */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600">
              Blood Group Donation System
            </h2>
            <p className="text-gray-600 mt-3 text-sm sm:text-base">
              Every drop counts — save lives by donating blood
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT SIDE IMAGE */}
            <div className="relative">

              {/* Background Blur */}
              <div className="absolute -top-10 -left-10 w-48 sm:w-72 h-48 sm:h-72 bg-red-300/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-48 sm:w-72 h-48 sm:h-72 bg-pink-200/30 rounded-full blur-3xl"></div>

              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[40px] shadow-2xl">

                <img
                  src="https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=1200&q=80"
                  alt="Blood Donation"
                  className="w-full h-72 sm:h-96 lg:h-[650px] object-cover hover:scale-105 transition duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8">
                  <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-red-600 text-white text-xs sm:text-sm font-semibold">
                    Blood Donation
                  </span>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-3 sm:mt-4">
                    Every Blood Type
                    <br />
                    Can Save A Life
                  </h3>

                  <p className="text-gray-200 mt-3 sm:mt-4 max-w-md text-sm sm:text-base">
                    Your donation can make the difference between life and death.
                    Join the mission and become a hero today.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE ORBIT */}
            <div className="flex justify-center">
              <div className="orbit-container">

                {/* Rotating Orbit */}
                <div className="absolute inset-0 animate-[spin_30s_linear_infinite]">

                  <div className="absolute inset-0 border-2 border-red-200 rounded-full"></div>

                  {/* Blood Types */}
                  {[
                    { type: "AB+", top: "2%", left: "50%" },
                    { type: "B+", top: "18%", left: "85%" },
                    { type: "B-", top: "50%", left: "98%" },
                    { type: "AB-", top: "82%", left: "85%" },
                    { type: "O-", top: "98%", left: "50%" },
                    { type: "O+", top: "82%", left: "15%" },
                    { type: "A-", top: "50%", left: "2%" },
                    { type: "A+", top: "18%", left: "15%" },
                  ].map((blood) => (
                    <div
                      key={blood.type}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        top: blood.top,
                        left: blood.left,
                      }}
                    >
                      <div className="orbit-blood-node group w-24 h-24 rounded-full bg-white border-2 border-red-200 shadow-xl flex items-center justify-center text-2xl font-black text-red-600 hover:bg-red-600 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer">
                        {blood.type}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Center Blood Drop */}
                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="absolute w-48 sm:w-72 h-48 sm:h-72 bg-red-200/30 blur-3xl rounded-full"></div>

                  <div className="orbit-center relative w-32 sm:w-44 h-32 sm:h-44 rounded-full bg-white border border-red-100 shadow-[0_20px_80px_rgba(239,68,68,0.25)] flex items-center justify-center">

                    <div className="text-center">
                      <div className="text-5xl sm:text-7xl animate-bounce">
                        <img src="blood.svg" alt="" />
                      </div>

                      <p className="orbit-center-text font-bold text-red-600 mt-1 sm:mt-2 text-xs sm:text-sm">
                        Donate Blood
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SUCCESS STORIES (UPDATED MEDICAL VERSION) ───────────────────── */}
      <section className="py-8 sm:py-12 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block text-red-500 text-xs font-bold tracking-widest uppercase mb-3 bg-red-50 px-4 py-1.5 rounded-full">
              Medical Impact
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              Lives Saved Through Blood Donation
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Every donation supports hospitals, emergency care, and life-saving treatments around the world.
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">

            {[
              {
                img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80",
                name: "Pediatric Patient Care",
                tag: "Child Recovery",
                story:
                  "Young patients receiving critical blood transfusions during hospital treatment for serious conditions, supported by donor contributions.",
                color: "#DC2626",
              },
              {
                img: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=800&q=80",
                name: "Surgical Team Support",
                tag: "Emergency Surgery",
                story:
                  "Surgeons rely on immediate blood availability during complex operations where every second determines survival.",
                color: "#EF4444",
              },
              {
                img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
                name: "Emergency Response Unit",
                tag: "Trauma Care",
                story:
                  "Emergency departments depend on rapid blood transfusions to stabilize accident and trauma patients.",
                color: "#B91C1C",
              },
            ].map((s, i) => {
              const [ref, inView] = useInView();

              return (
                <div
                  key={i}
                  ref={ref}
                  className="story-card relative rounded-2xl overflow-hidden group cursor-pointer"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "scale(1)" : "scale(0.95)",
                    transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Image */}
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-56 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay Gradient */}
                  <div
                    className="story-overlay absolute inset-0 opacity-0"
                    style={{
                      background: `linear-gradient(to top, ${s.color}ee, transparent 50%)`,
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-red-600 text-white mb-2">
                      {s.tag}
                    </span>

                    <h3 className="text-white font-black text-base sm:text-lg mb-1">
                      {s.name}
                    </h3>

                    <p className="text-gray-300 text-xs leading-relaxed group-hover:text-white transition-colors duration-300">
                      {s.story}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ── COMMUNITY IMPACT ──────────────────────────────────────────────── */}
      <section className="py-8 sm:py-12 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
            
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-5 sm:mb-6">
                Building a<br />
                <span className="text-red-500">Healthier Nation</span>
              </h2>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 font-body">
                Our nationwide network connects donors with patients instantly, ensuring no one waits too long for the blood they desperately need.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
  {
    n: "47",
    u: "Cities Covered",
    icon: (
      <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 21h18M6 21V7l6-4 6 4v14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 21v-6h6v6"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    n: "24/7",
    u: "Emergency Line",
    icon: (
      <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none">
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.59 2.5a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 4 4l1.57-1.14a2 2 0 0 1 2.11-.45c.8.27 1.64.47 2.5.59A2 2 0 0 1 22 16.92z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    n: "12 min",
    u: "Avg Response Time",
    icon: (
      <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    n: "99.2%",
    u: "Match Success Rate",
    icon: (
      <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
].map((m) => (
                  <div key={m.u} className="glass-card rounded-2xl p-4 sm:p-5">
                    <div className="text-xl sm:text-2xl mb-2">{m.icon}</div>
                    <div className="text-xl sm:text-2xl font-black impact-number">{m.n}</div>
                    <div className="text-gray-500 text-xs mt-1">{m.u}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80"
                  alt="Community donation event"
                  className="w-full h-64 sm:h-80 lg:h-[480px] object-cover"
                />
              </div>
              <div className="float-1 absolute -bottom-6 -left-6 bg-white border border-red-100 shadow-xl rounded-2xl p-4 text-center w-32 sm:w-36">
                <div className="text-2xl sm:text-3xl font-black impact-number">4.9</div>
                <div className="text-xs text-gray-400">Donor Rating</div>
                <div className="flex justify-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ──────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <p className="text-center text-gray-400 text-xs font-bold tracking-widest uppercase mb-8 sm:mb-10">Trusted by leading healthcare institutions</p>
          <div className="overflow-hidden">
            <div className="partner-track">
              {[
                "City General Hospital", "MedLife Foundation", "RedCross Medical",
                "HealthBridge", "MediCare Plus", "LifeStream Institute",
                "GlobalHealth Corp", "CarePlus Network", "PharmaUnity",
                "City General Hospital", "MedLife Foundation", "RedCross Medical",
                "HealthBridge", "MediCare Plus", "LifeStream Institute",
                "GlobalHealth Corp", "CarePlus Network", "PharmaUnity",
              ].map((name, i) => (
                <div key={i} className="flex items-center justify-center flex-shrink-0">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 hover:border-red-200 hover:bg-red-50 transition-all duration-300 cursor-pointer">
                    <span className="text-gray-400 hover:text-red-500 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors duration-300">{name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-12 lg:py-12 relative overflow-hidden bg-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full opacity-5 blur-3xl" style={{ background: "radial-gradient(circle, #DC2626, transparent)" }} />
          <div className="float-1 absolute top-16 left-8 sm:left-16 opacity-10"><BloodDrop size={48} sm:size={64} opacity={1} /></div>
          <div className="float-2 absolute bottom-16 right-8 sm:right-16 opacity-10"><BloodDrop size={36} sm:size={48} opacity={1} /></div>
          <div className="float-3 absolute top-32 right-16 sm:right-32 opacity-10"><BloodDrop size={24} sm:size={32} opacity={1} /></div>
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "radial-gradient(circle, #DC2626 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-5 sm:mb-6">
            Be the Reason<br />
            <span className="text-red-500">Someone Survives</span>
          </h2>

          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10 sm:mb-12 max-w-2xl mx-auto font-body">
            Right now, 3 people are waiting for blood in hospitals near you. The donation you make today — in the next hour — could be the one that saves their life. Don't wait for tomorrow.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <button className="flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-base sm:text-lg hover:border-red-400 hover:text-red-500 transition-all duration-300 hover:-translate-y-1 active:scale-95">
              Donate Blood Today
            </button>
            <button className="flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-base sm:text-lg hover:border-red-400 hover:text-red-500 transition-all duration-300 hover:-translate-y-1 active:scale-95">
              Find a Donation Center
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}