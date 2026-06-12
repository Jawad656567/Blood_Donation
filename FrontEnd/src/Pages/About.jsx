import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Heart, Droplets, Users, Hospital, Award, ChevronRight, ArrowRight,
  Shield, Clock, Phone, Mail, MapPin, Star, CheckCircle, Activity,
  Zap, Globe, TrendingUp, HeartHandshake, Stethoscope, FlaskConical,
  Ambulance, Quote, ChevronDown
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Heart, value: "2.4M+", label: "Lives Saved", accent: "#DC2626" },
  { icon: Users, value: "850K+", label: "Active Donors", accent: "#B45309" },
  { icon: Droplets, value: "320K+", label: "Blood Requests", accent: "#1D4ED8" },
  { icon: Hospital, value: "1,200+", label: "Partner Hospitals", accent: "#059669" },
];

const PROCESS_STEPS = [
  {
    step: "01", icon: FlaskConical, title: "Register & Eligibility",
    desc: "Complete a quick health screening to confirm you meet donation criteria. Takes just 5 minutes online.",
    accent: "#DC2626", light: "#FEF2F2",
  },
  {
    step: "02", icon: Stethoscope, title: "Health Check",
    desc: "A trained nurse conducts a brief check of your blood pressure, haemoglobin, and vital signs.",
    accent: "#B45309", light: "#FFFBEB",
  },
  {
    step: "03", icon: Droplets, title: "Donate Blood",
    desc: "The actual donation takes only 8–10 minutes. Relax comfortably while you give the gift of life.",
    accent: "#1D4ED8", light: "#EFF6FF",
  },
  {
    step: "04", icon: Activity, title: "Recovery & Refresh",
    desc: "Enjoy light refreshments while your body recovers. You're free to leave after 15 minutes.",
    accent: "#059669", light: "#F0FDF4",
  },
];

const WHY_DONATE = [
  { icon: Zap, title: "Instant Impact", desc: "One donation can save up to 3 lives within 24 hours of collection.", accent: "#DC2626" },
  { icon: Shield, title: "Safe & Sterile", desc: "All equipment is single-use, sterile, and disposed of after every donation.", accent: "#B45309" },
  { icon: Clock, title: "Takes 30 Minutes", desc: "From arrival to departure, the full process takes under half an hour.", accent: "#1D4ED8" },
  { icon: Globe, title: "Universal Need", desc: "Blood cannot be manufactured — only your donation bridges the gap.", accent: "#059669" },
  { icon: TrendingUp, title: "Health Benefits", desc: "Regular donors enjoy improved cardiovascular health and reduced iron overload.", accent: "#7C3AED" },
  { icon: HeartHandshake, title: "Community Bond", desc: "Join a nationwide movement of compassion connecting strangers to save lives.", accent: "#DB2777" },
];

const TESTIMONIALS = [
  {
    name: "Ahmed Khan",
    role: "Regular Blood Donor · Islamabad",
    city: "Islamabad",
    text: "Mujhe 8 saal ho gaye hain donate karte. Har dafa jab main nikal'ta hoon donation centre se, dil mein sukoon hota hai ke shayad kisi ki zindagi bachayi. Yeh kaam mujhe apni zindagi ka sabse bada sadqa lagta hai.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85&auto=format&fit=crop&crop=face",
    rating: 5,
    tag: "32 Donations",
  },
  {
    name: "Fatima Ali",
    role: "Thalassemia Patient · Lahore",
    city: "Lahore",
    text: "Main thalassemia ki wajah se har mahine khoon ki zaroorat hoti hai. In donators ki wajah se main aaj apne bachon ke saath hoon. Jo log donate karte hain, woh bilkul nahi jaante ke woh kisi ke liye farishtay ban'te hain.",
    img: "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=600&q=85&auto=format&fit=crop&crop=face",
    rating: 5,
    tag: "Recovered",
  },
  {
    name: "Muhammad Usman",
    role: "Emergency Donor · Rawalpindi",
    city: "Rawalpindi",
    text: "Mere dost ka accident hua tha motorway pe. Raat ko 2 baje call aayi ke O-negative chahiye. Main aur mere 3 doston ne fauran hospital pahunche. Woh zindagi se bach gaya. Yeh moment meri poori zindagi ka sabse qeemti lamha tha.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85&auto=format&fit=crop&crop=face",
    rating: 5,
    tag: "Emergency Hero",
  },
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&auto=format&fit=crop",
    alt: "Blood donation in progress", span: "col-span-2 row-span-2"
  },
  {
    src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80&auto=format&fit=crop",
    alt: "Lab technician testing blood samples"
  },
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80&auto=format&fit=crop",
    alt: "Hospital ward patient care"
  },
  {
    src: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=700&q=80&auto=format&fit=crop",
    alt: "Blood bags in storage facility", span: "col-span-2"
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80&auto=format&fit=crop",
    alt: "Donor resting after donation"
  },
  {
    src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&q=80&auto=format&fit=crop",
    alt: "Medical team at blood drive camp"
  },
];

// ─── ANIMATION ────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function AnimatedSection({ children, className = "", delay = 0.08 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger(delay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, dark = false }) {
  return (
    <motion.span variants={fadeUp} className="inline-flex items-center gap-2 mb-3">
      <span className="w-6 h-px bg-red-500" />
      <span
        className="text-xs font-bold tracking-[0.2em] uppercase"
        style={{ color: "#DC2626", fontFamily: "'DM Sans', sans-serif" }}
      >
        {children}
      </span>
    </motion.span>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section className="relative bg-white py-20 lg:py-28 overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#DC2626 1px, transparent 1px), linear-gradient(90deg, #DC2626 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Top red bleed from hero */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — imagery */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-red-100">
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=85&auto=format&fit=crop"
                  alt="Blood donation center"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-900/30 via-transparent to-transparent" />
              </div>

              {/* Floating stat card */}
              <motion.div
                variants={fadeUp}
                className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-xl p-4 shadow-xl border border-red-50"
                style={{ maxWidth: 190 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#FEF2F2" }}>
                    <Award size={17} color="#DC2626" />
                  </div>
                  <div>
                    <div className="font-black text-xl text-gray-900">98%</div>
                    <div className="text-xs text-gray-400">Success Rate</div>
                  </div>
                </div>
                <div className="text-gray-500 text-xs leading-relaxed">
                  Blood donations directly contribute to life-saving procedures across Pakistan.
                </div>
              </motion.div>

              {/* Year badge */}
              <motion.div
                variants={fadeUp}
                className="absolute -top-4 -left-4 rounded-xl px-4 py-3 shadow-lg"
                style={{ background: "#DC2626" }}
              >
                <div className="text-white font-black text-2xl leading-none">12+</div>
                <div className="text-red-200 text-xs font-medium mt-0.5">Years of Impact</div>
              </motion.div>
            </motion.div>
          </AnimatedSection>

          {/* Right — copy */}
          <AnimatedSection>
            <SectionLabel>Our Story</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="font-black text-gray-900 leading-[1.1] mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Built on a Simple
              <span className="block" style={{ color: "#DC2626" }}>Human Truth</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed text-base sm:text-lg mb-6">
              Founded in 2013, Vitalis Blood began with one donated pint and a vision: that no one should
              die waiting for blood. Today, we operate Pakistan's most trusted voluntary blood network —
              connecting compassionate donors with patients in critical need across 47 cities.
            </motion.p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Mission", text: "Ensure zero preventable deaths from blood shortage across Pakistan." },
                { label: "Vision", text: "Every patient receives blood within the golden hour, anywhere in the country." },
                { label: "Impact", text: "2.4 million lives saved across 47 cities with 850,000 active donors." },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="p-4 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50/40 transition-all duration-300 group"
                >
                  <div
                    className="font-bold text-xs uppercase tracking-widest mb-2"
                    style={{ color: "#DC2626", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </div>
                  <div className="text-gray-500 text-sm leading-relaxed">{item.text}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all"
              style={{ background: "#DC2626", fontFamily: "'DM Sans', sans-serif" }}
            >
              Read Our Full Story
              <ChevronRight size={16} />
            </motion.button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── STATS BAND ───────────────────────────────────────────────────────────────

function StatsBand() {
  return (
    <section className="bg-gray-950 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${s.accent}22` }}
              >
                <s.icon size={20} color={s.accent} />
              </div>
              <div
                className="font-black text-white mb-1"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontFamily: "'Georgia', serif" }}
              >
                {s.value}
              </div>
              <div className="text-gray-500 text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────────────────────────────────

function Process() {
  return (
    <section className="relative py-20 lg:py-28 bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <div className="flex justify-center">
            <SectionLabel>How It Works</SectionLabel>
          </div>
          <motion.h2
            variants={fadeUp}
            className="font-black text-gray-900 mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "'Georgia', serif" }}
          >
            The Donation Process
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            Simple, safe, and deeply meaningful — from arrival to departure in under 30 minutes.
          </motion.p>
        </AnimatedSection>

        <div className="relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[14%] right-[14%] h-px bg-gradient-to-r from-red-100 via-red-300 to-red-100" />

          <AnimatedSection className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(220,38,38,0.08)" }}
                className="relative p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute top-4 right-4 font-black select-none"
                  style={{ fontSize: "4.5rem", color: step.accent, opacity: 0.05, lineHeight: 1 }}
                >
                  {step.step}
                </div>

                <div
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: step.light }}
                >
                  <step.icon size={22} color={step.accent} />
                </div>

                <h3
                  className="font-bold text-gray-900 text-base sm:text-lg mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.desc}</p>

                <div
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                  style={{ color: step.accent, fontFamily: "'DM Sans', sans-serif" }}
                >
                  Step {step.step} <ChevronRight size={11} />
                </div>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Impact() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Subtle red wash */}
      <div
        className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
        style={{ background: "linear-gradient(to left, #FEF2F2 0%, transparent 100%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <div className="flex justify-center">
            <SectionLabel>Real Stories</SectionLabel>
          </div>
          <motion.h2
            variants={fadeUp}
            className="font-black text-gray-900 mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "'Georgia', serif" }}
          >
            Lives Changed Forever
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto">
            Real voices from donors and patients across Pakistan — the heartbeat behind every donation.
          </motion.p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Featured image */}
          <AnimatedSection className="lg:col-span-2">
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden shadow-xl shadow-red-100" style={{ aspectRatio: "3/4" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={TESTIMONIALS[active].img}
                  alt={TESTIMONIALS[active].name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />

              {/* Name overlay */}
              <div className="absolute bottom-5 left-5 right-5">
                <div
                  className="inline-block px-2.5 py-1 rounded-md text-white text-xs font-bold mb-2"
                  style={{ background: "#DC2626", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {TESTIMONIALS[active].tag}
                </div>
                <div className="text-white font-bold text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {TESTIMONIALS[active].name}
                </div>
                <div className="text-red-300 text-sm">{TESTIMONIALS[active].city}</div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Cards */}
          <div className="lg:col-span-3 space-y-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="cursor-pointer p-5 sm:p-6 rounded-xl border transition-all duration-300"
                style={{
                  borderColor: active === i ? "#FECACA" : "#F3F4F6",
                  background: active === i ? "#FFF5F5" : "white",
                  boxShadow: active === i ? "0 4px 24px rgba(220,38,38,0.06)" : "none",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: active === i ? "#FEE2E2" : "#F9FAFB" }}
                  >
                    <Quote size={14} color={active === i ? "#DC2626" : "#9CA3AF"} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-sm sm:text-base leading-relaxed mb-4"
                      style={{
                        color: active === i ? "#374151" : "#9CA3AF",
                        fontFamily: "'Georgia', serif",
                        fontStyle: "italic",
                      }}
                    >
                      "{t.text}"
                    </p>
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <div
                          className="font-semibold text-sm"
                          style={{ color: active === i ? "#111827" : "#6B7280", fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {t.name}
                        </div>
                        <div className="text-xs" style={{ color: "#DC2626" }}>{t.role}</div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star
                            key={j}
                            size={11}
                            color={active === i ? "#F59E0B" : "#E5E7EB"}
                            fill={active === i ? "#F59E0B" : "#E5E7EB"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Progress dots */}
            <div className="flex gap-2 pt-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="h-1.5 rounded-full transition-all duration-400"
                  style={{
                    width: active === i ? 28 : 6,
                    background: active === i ? "#DC2626" : "#E5E7EB",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHY DONATE ───────────────────────────────────────────────────────────────

function WhyDonate() {
  return (
    <section className="relative py-20 lg:py-28 bg-gray-950 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-red-900/30 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border border-red-900/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <div className="flex justify-center">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-red-500" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Why Donate
              </span>
              <span className="w-6 h-px bg-red-500" />
            </motion.span>
          </div>
          <motion.h2
            variants={fadeUp}
            className="font-black text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "'Georgia', serif" }}
          >
            Six Reasons to Give
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            Beyond saving lives, blood donation delivers profound personal and societal benefits.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_DONATE.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="group p-6 sm:p-7 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${item.accent}18` }}
              >
                <item.icon size={20} color={item.accent} />
              </div>
              <h3
                className="text-white font-bold text-base mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────

function Gallery() {
  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <div className="flex justify-center">
            <SectionLabel>Gallery</SectionLabel>
          </div>
          <motion.h2
            variants={fadeUp}
            className="font-black text-gray-900 mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "'Georgia', serif" }}
          >
            Moments That Matter
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            A visual journey through the life-changing work happening every day across our network.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          style={{ gridAutoRows: "170px" }}
        >
          {GALLERY.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${item.span || ""}`}
              style={{ minHeight: 170 }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }}
              />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {item.alt}
              </div>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── CTA STRIP ────────────────────────────────────────────────────────────────

function CTAStrip() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "#DC2626" }}>
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <Heart size={400} color="rgba(255,255,255,0.04)" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <AnimatedSection>
          <motion.p
            variants={fadeUp}
            className="text-red-200 text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Take Action
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-black text-white mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "'Georgia', serif" }}
          >
            Your Blood. Someone's Tomorrow.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-red-100 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Join 850,000 Pakistanis who donate regularly. Schedule your first appointment today — it takes 30 minutes to change a life.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-xl bg-white font-bold text-sm transition-all"
              style={{ color: "#DC2626", fontFamily: "'DM Sans', sans-serif" }}
            >
              Donate Blood Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 text-white font-semibold text-sm transition-all hover:bg-white/10"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Find a Camp <ChevronRight size={15} />
            </motion.button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function BloodDonationAbout() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <div
        className="min-h-screen antialiased"
        style={{ background: "#ffffff", fontFamily: "'DM Sans', sans-serif" }}
      >
        <About />
        <StatsBand />
        <Process />
        <Impact />
        <WhyDonate />
        <Gallery />
        <CTAStrip />
      </div>
    </>
  );
}