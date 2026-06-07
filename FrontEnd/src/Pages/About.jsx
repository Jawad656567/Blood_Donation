import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Heart, Droplets, Users, Hospital, Award, ChevronRight, ArrowRight,
  Shield, Clock, Phone, Mail, MapPin, Star, CheckCircle, Activity,
  Zap, Globe, TrendingUp, HeartHandshake, Stethoscope, FlaskConical,
  Ambulance, Menu, X,
  Quote, Play, ChevronDown
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Process", "Impact", "Gallery", "Contact"];

const STATS = [
  { icon: Heart, value: "2.4M+", label: "Lives Saved", color: "from-rose-500 to-red-600", glow: "shadow-rose-500/30" },
  { icon: Users, value: "850K+", label: "Active Donors", color: "from-amber-500 to-orange-500", glow: "shadow-amber-500/30" },
  { icon: Droplets, value: "320K+", label: "Blood Requests", color: "from-sky-500 to-blue-600", glow: "shadow-sky-500/30" },
  { icon: Hospital, value: "1,200+", label: "Partner Hospitals", color: "from-emerald-500 to-teal-600", glow: "shadow-emerald-500/30" },
];

const PROCESS_STEPS = [
  {
    step: "01", icon: FlaskConical, title: "Register & Eligibility",
    desc: "Complete a quick health screening to confirm you meet donation criteria. Takes just 5 minutes online.",
    color: "from-rose-500 to-red-500",
  },
  {
    step: "02", icon: Stethoscope, title: "Health Check",
    desc: "A trained nurse conducts a brief check of your blood pressure, haemoglobin, and vitals.",
    color: "from-amber-500 to-orange-500",
  },
  {
    step: "03", icon: Droplets, title: "Donate Blood",
    desc: "The actual donation takes only 8–10 minutes. Relax comfortably while you save a life.",
    color: "from-sky-500 to-blue-500",
  },
  {
    step: "04", icon: Activity, title: "Recovery & Refresh",
    desc: "Enjoy light refreshments while your body recovers. You're free to leave after 15 minutes.",
    color: "from-emerald-500 to-teal-500",
  },
];

const WHY_DONATE = [
  { icon: Zap, title: "Instant Impact", desc: "One donation can save up to 3 lives within 24 hours of collection.", color: "text-rose-400" },
  { icon: Shield, title: "Safe & Sterile", desc: "All equipment is single-use, sterile, and disposed of after every donation.", color: "text-amber-400" },
  { icon: Clock, title: "Takes 30 Minutes", desc: "From arrival to departure, the full process takes under half an hour.", color: "text-sky-400" },
  { icon: Globe, title: "Universal Need", desc: "Blood cannot be manufactured — only your donation bridges the gap.", color: "text-emerald-400" },
  { icon: TrendingUp, title: "Health Benefits", desc: "Regular donors enjoy lower iron levels, improved cardiovascular health.", color: "text-purple-400" },
  { icon: HeartHandshake, title: "Community Bond", desc: "Join a global movement of compassion connecting strangers to save lives.", color: "text-pink-400" },
];

const TESTIMONIALS = [
  {
    name: "Aisha Rahman", role: "Recovered Patient",
    text: "After my accident, three strangers saved my life. I never knew who they were — but their blood ran through my veins and gave me back to my children.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=85&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Dr. Marcus Webb", role: "Chief Surgeon, City Hospital",
    text: "The blood supply from this program has been nothing short of miraculous. We've performed over 400 emergency surgeries this year without a single shortage.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=85&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Priya Nair", role: "Regular Donor — 12 Years",
    text: "It started as a one-time act. Twelve years later, I've donated 48 times. The team makes me feel like a hero every single visit.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=85&auto=format&fit=crop",
    rating: 5,
  },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=700&q=80&auto=format&fit=crop", alt: "Blood donation in progress", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80&auto=format&fit=crop", alt: "Lab technician testing blood" },
  { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80&auto=format&fit=crop", alt: "Hospital ward care" },
  { src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&q=80&auto=format&fit=crop", alt: "Volunteer team at event" },
  { src: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=700&q=80&auto=format&fit=crop", alt: "Blood bags in storage", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80&auto=format&fit=crop", alt: "Donor resting after donation" },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

// ─── REUSABLE COMPONENTS ─────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold tracking-widest uppercase mb-4"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
      {children}
    </motion.span>
  );
}

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger()}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}


function About() {
  return (
    <section className="relative bg-slate-950 py-24 lg:py-32 overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-800/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Images */}
          <AnimatedSection className="relative">
            <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=85&auto=format&fit=crop"
                alt="Blood donation center"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </motion.div>

            {/* Floating card */}
            <motion.div
              variants={fadeUp}
              className="absolute -bottom-8 -right-4 md:-right-8 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl max-w-[200px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                  <Award size={18} className="text-rose-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl">98%</div>
                  <div className="text-slate-500 text-xs">Success Rate</div>
                </div>
              </div>
              <div className="text-slate-400 text-xs leading-relaxed">
                Of blood donations directly contribute to life-saving procedures.
              </div>
            </motion.div>

            {/* Year badge */}
            <motion.div
              variants={fadeUp}
              className="absolute -top-4 -left-4 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl px-4 py-3 shadow-xl shadow-rose-500/30"
            >
              <div className="text-white font-black text-2xl">12+</div>
              <div className="text-rose-200 text-xs font-medium">Years of Impact</div>
            </motion.div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              <SectionLabel>Our Story</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Built on a Simple
              <span className="block text-rose-400">Human Truth</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed text-lg mb-6">
              Founded in 2013, Vitalis Blood began with one donated pint and a vision: that no one should
              die waiting for blood. Today, we operate the nation's most trusted voluntary blood network —
              connecting compassionate donors with patients in critical need across 47 cities.
            </motion.p>

            <div className="grid sm:grid-cols-3 gap-5 mb-8">
              {[
                { label: "Mission", text: "Ensure zero preventable deaths from blood shortage by building the world's most accessible donor network." },
                { label: "Vision", text: "A world where every patient in need receives the gift of blood within the golden hour." },
                { label: "Impact", text: "2.4 million lives saved across 47 cities with a growing network of 850,000 active donors." },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/8 hover:border-rose-500/30 transition-colors group"
                >
                  <div className="text-rose-400 font-bold text-xs uppercase tracking-widest mb-2 group-hover:text-rose-300">{item.label}</div>
                  <div className="text-slate-400 text-sm leading-relaxed">{item.text}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 text-white font-semibold text-sm shadow-lg shadow-rose-500/20"
            >
              Read Our Full Story
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ─────────────────────────────────────────────────────────────────

function Process() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-950 via-rose-950/10 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <motion.div variants={fadeUp} className="flex justify-center">
            <SectionLabel>How It Works</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            The Donation Process
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            Simple, safe, and deeply meaningful — here's everything that happens from the moment you arrive.
          </motion.p>
        </AnimatedSection>

        <div className="relative">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />

          <AnimatedSection className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8 }}
                className="group relative p-7 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
              >
                {/* Background glow */}
                <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`} />

                {/* Step number */}
                <div className="text-7xl font-black text-white/[0.04] absolute top-4 right-4 select-none">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <step.icon size={22} className="text-white" />
                </div>

                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>

                {/* Step number badge */}
                <div className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                  Step {step.step}
                  <ChevronRight size={12} className="text-rose-400" />
                </div>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS / IMPACT ────────────────────────────────────────────────────

function Impact() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-rose-700/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <motion.div variants={fadeUp} className="flex justify-center">
            <SectionLabel>Real Stories</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Lives Changed Forever
          </motion.h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Large featured image */}
          <AnimatedSection className="lg:col-span-2">
            <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden aspect-[3/4]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={TESTIMONIALS[active].img}
                  alt={TESTIMONIALS[active].name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-white font-bold text-lg">{TESTIMONIALS[active].name}</div>
                <div className="text-rose-400 text-sm">{TESTIMONIALS[active].role}</div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Testimonials */}
          <div className="lg:col-span-3 space-y-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                  active === i
                    ? "bg-white/[0.06] border-rose-500/40 shadow-xl"
                    : "bg-white/[0.02] border-white/6 hover:border-white/12"
                }`}
              >
                <div className="flex items-start gap-4">
                  <Quote
                    size={24}
                    className={`flex-shrink-0 mt-1 transition-colors ${active === i ? "text-rose-400" : "text-slate-600"}`}
                  />
                  <div>
                    <p className={`text-sm leading-relaxed mb-4 transition-colors ${active === i ? "text-slate-300" : "text-slate-500"}`}>
                      {t.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-semibold text-sm transition-colors ${active === i ? "text-white" : "text-slate-400"}`}>
                          {t.name}
                        </div>
                        <div className="text-rose-400 text-xs">{t.role}</div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} size={12} className={`${active === i ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Dots */}
            <div className="flex gap-2 pt-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${active === i ? "w-8 bg-rose-500" : "w-1.5 bg-slate-700"}`}
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
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <motion.div variants={fadeUp} className="flex justify-center">
            <SectionLabel>Why Donate</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Six Reasons to Give
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
            Beyond saving lives, blood donation offers profound personal and societal benefits.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_DONATE.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6, borderColor: "rgba(244,63,94,0.3)" }}
              className="group p-7 rounded-2xl bg-white/[0.03] border border-white/8 transition-all duration-300 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-rose-950/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 mb-5 group-hover:scale-110 transition-transform`}>
                <item.icon size={22} className={item.color} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

function Gallery() {
  return (
    <section className="relative py-24 lg:py-32 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <motion.div variants={fadeUp} className="flex justify-center">
            <SectionLabel>Gallery</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Moments That Matter
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
            A visual journey through the life-changing work happening every day in our centres.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4">
          {GALLERY.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.span || ""}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {item.alt}
              </div>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function BloodDonationAbout() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased">
    
    
      <About />
      <Process />
      <Impact />
      <WhyDonate />
      <Gallery />
     
      
    </div>
  );
}