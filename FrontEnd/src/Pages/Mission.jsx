function DropMarker() {
  return (
    <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white border-2 border-rose-200 shadow-sm">
      <svg width="10" height="13" viewBox="0 0 28 36" className="fill-red-700">
        <path d="M14 0 C14 0 0 18 0 25 a14 14 0 0 0 28 0 C28 18 14 0 14 0z" />
      </svg>
    </span>
  );
}

const phases = [
  {
    num: "01",
    title: "Find",
    body: "We match a patient's need to the nearest willing donor by blood group, city, and availability — in seconds, not days.",
  },
  {
    num: "02",
    title: "Give",
    body: "One donation takes about fifteen minutes, and the body replenishes what's given — safely repeatable every ninety days.",
  },
  {
    num: "03",
    title: "Save",
    body: "A single pint is separated and shared — reaching a trauma patient, a surgery ward, and a child with chronic illness, all at once.",
  },
];

const stats = [
  { value: "3", label: "Lives touched by one donation" },
  { value: "90", label: "Days until you're eligible again" },
  { value: "15", label: "Minutes is all it takes" },
];

export default function OurMission() {
  return (
    <section className="relative overflow-hidden bg-[#fff6f4]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');
        .mission-serif { font-family: 'Fraunces', serif; }
        .mission-sans { font-family: 'Inter', sans-serif; }
        @keyframes bloodflow {
          0%   { top: -12%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 108%; opacity: 0; }
        }
        .flow-pulse {
          animation: bloodflow 3.6s ease-in-out infinite;
        }
        @keyframes softbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        .beat { animation: softbeat 2.6s ease-in-out infinite; }
      `}</style>

      {/* soft ambient wash, restrained */}
      <div className="absolute w-[520px] h-[520px] bg-rose-200/25 rounded-full blur-3xl -top-40 -right-32 pointer-events-none" />
      <div className="absolute w-[420px] h-[420px] bg-red-100/40 rounded-full blur-3xl bottom-0 -left-40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-8">
        {/* ── LEFT: statement ── */}
        <div className="flex flex-col justify-center">
          <span className="mission-sans text-[11px] font-semibold tracking-[0.22em] text-red-700 uppercase mb-5">
            Our Mission
          </span>

          <h2 className="mission-serif text-[2.4rem] md:text-[3.1rem] leading-[1.08] text-[#3a1214] mb-6">
            One pint can{" "}
            <span className="italic font-medium text-red-700">rewrite</span>{" "}
            someone's story.
          </h2>

          <p className="mission-sans text-[15px] leading-relaxed text-[#6b4b4d] max-w-md mb-8">
            Somewhere nearby, a patient is waiting on blood that hasn't arrived yet.
            We exist to close that distance — connecting willing donors to the people
            who need them, before the wait becomes the danger.
          </p>

          <div>
            <button className="mission-sans inline-flex items-center gap-2 bg-gradient-to-r from-red-700 to-rose-500 text-white text-sm font-semibold rounded-full pl-6 pr-5 py-3 hover:shadow-xl hover:shadow-red-300/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer">
              Join the network
              <span className="beat inline-block">→</span>
            </button>
          </div>

          {/* stat strip — thin dividers, no boxes */}
          <div className="mission-sans flex mt-14 divide-x divide-rose-200/70">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex-1 ${i === 0 ? "pr-6" : "px-6"}`}>
                <div className="mission-serif text-3xl text-red-800 tabular-nums">{s.value}</div>
                <div className="text-[11.5px] text-[#8a6567] leading-snug mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: the bloodline — signature element ── */}
        <div className="relative pl-10 flex flex-col justify-center gap-14 py-4">
          {/* vertical vein */}
          <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-gradient-to-b from-rose-200 via-red-200 to-rose-200 rounded-full overflow-hidden">
            <div className="flow-pulse absolute left-0 w-[2px] h-20 bg-gradient-to-b from-transparent via-red-600 to-transparent" />
          </div>

          {phases.map((p) => (
            <div key={p.num} className="relative flex gap-5">
              <div className="absolute -left-7 top-0.5">
                <DropMarker />
              </div>
              <div>
                <div className="mission-sans flex items-baseline gap-2.5 mb-1.5">
                  <span className="mission-serif italic text-red-300 text-sm">{p.num}</span>
                  <h3 className="mission-serif text-xl text-[#3a1214]">{p.title}</h3>
                </div>
                <p className="mission-sans text-[13.5px] leading-relaxed text-[#7a5658] max-w-sm">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}