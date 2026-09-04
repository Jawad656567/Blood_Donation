import React from "react";
import {
  Heart,
  MapPin,
  Users,
  Search,
  Phone,
  ArrowRight,
} from "lucide-react";

const Mission = () => {
  const features = [
    {
      icon: <MapPin size={27} />,
      title: "Find Locally",
      description:
        "Find blood donors in your local area quickly and easily.",
    },
    {
      icon: <Users size={27} />,
      title: "Connect Fast",
      description:
        "Connect with available donors when you need them most.",
    },
    {
      icon: <Heart size={27} />,
      title: "Save Lives",
      description:
        "Your search can save a life. Together, we make it possible.",
    },
  ];

  const steps = [
    {
      number: "1",
      icon: <Search size={24} />,
      title: "Search",
      description:
        "Search for the blood group you need in your area.",
    },
    {
      number: "2",
      icon: <MapPin size={24} />,
      title: "Find Donors",
      description:
        "Find available donors near you quickly and easily.",
    },
    {
      number: "3",
      icon: <Phone size={24} />,
      title: "Connect",
      description:
        "Contact the donor easily through call or message.",
    },
    {
      number: "4",
      icon: <Heart size={24} />,
      title: "Save Lives",
      description:
        "Your action can save a precious life.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7faff] text-[#10245c]">

      {/* ================= HERO BANNER ================= */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[450px] lg:h-[400px]">

        {/* FULL WIDTH BANNER IMAGE */}
        <img
          src="mission.png"
          alt="Blood donation"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-7 sm:px-10 lg:px-16">

          <div className="max-w-xl">

            <h1 className="text-4xl font-extrabold leading-tight text-[#071b52] sm:text-5xl lg:text-6xl">
              Our Mission
            </h1>

            <p className="mt-4 text-base leading-7 text-[#536685] sm:text-lg">
              Making blood easy to find.
              <br />
              Saving more lives.
            </p>

            <button className="mt-7 inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700">
              <Heart size={17} />
              Join Us
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          3 FEATURE CARDS
      ====================================================== */}
      <section className="px-5 py-10 sm:px-8 lg:px-10">

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-red-100 bg-white px-6 py-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* ICON */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-black transition group-hover:bg-white">
                {feature.icon}
              </div>

              {/* TITLE */}
              <h3 className="mt-5 text-base font-bold text-[#10245c]">
                {feature.title}
              </h3>

              {/* SMALL LINE */}
              <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-red-500" />

              {/* DESCRIPTION */}
              <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-slate-500">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </section>


      {/* =====================================================
          HOW IT HELPS
      ====================================================== */}
      <section className="px-5 py-12 sm:px-8 lg:px-10">

        <div className="mx-auto max-w-7xl">

          {/* HEADING */}
          <div className="text-center">

            <h2 className="text-2xl font-extrabold text-[#10245c] sm:text-3xl">
              How It Helps
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
              Finding blood becomes simple with just a few easy steps.
            </p>

          </div>


          {/* STEPS */}
          <div className="relative mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">

            {/* CONNECTING LINE - DESKTOP */}
            <div className="absolute left-[12%] right-[12%] top-8 hidden h-[2px]  lg:block" />

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative z-10 text-center"
              >

                {/* ICON CIRCLE */}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#fff5f5] bg-white text-black shadow-md">
                  {step.icon}

                  {/* NUMBER */}
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white">
                    {step.number}
                  </span>
                </div>


                {/* TITLE */}
                <h3 className="mt-4 text-sm font-bold text-[#10245c]">
                  {step.title}
                </h3>


                {/* DESCRIPTION */}
                <p className="mx-auto mt-2 max-w-[190px] text-xs leading-5 text-slate-500">
                  {step.description}
                </p>


                {/* ARROW */}
                {index !== steps.length - 1 && (
                  <div className="absolute right-[-18px] top-6 hidden text-red-300 lg:block">
                    <ArrowRight size={22} />
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="px-5 py-10 sm:px-8 lg:px-10">

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-xl border border-red-100 bg-white px-7 py-7 shadow-sm sm:flex-row">

          {/* LEFT ICON */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">

            <Heart
              size={32}
              fill="currentColor"
            />

          </div>


          {/* TEXT */}
          <div className="flex-1 text-center sm:text-left">

            <h2 className="text-lg font-bold text-[#10245c]">
              Together, we can save more lives.
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Be the reason someone lives. Donate blood and make a real
              difference.
            </p>

          </div>


          {/* BUTTON */}
          <button className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400">

            <Heart size={16} />

            Become a Blood Donor

          </button>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-blue-100 bg-white px-6 py-7 text-center">

        <div className="flex items-center justify-center gap-2">

          <Heart
            size={18}
            fill="currentColor"
            className="text-blue-600"
          />

          <span className="text-sm font-bold text-[#10245c]">
            Every Drop Can Make a Difference
          </span>

        </div>

        <p className="mt-2 text-xs text-slate-500">
          Find a donor. Donate blood. Save a life.
        </p>

      </footer>

    </div>
  );
};

export default Mission;