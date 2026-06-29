import { useState } from "react";

const bloodGroups = ["A+", "A−", "B+", "B−", "O+", "O−", "AB+", "AB−"];

function DropIcon({ size = 28 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 28 36" fill="currentColor">
      <path d="M14 0 C14 0 0 18 0 25 a14 14 0 0 0 28 0 C28 18 14 0 14 0z" />
    </svg>
  );
}

function FloatingDrop({ style, size, animClass }) {
  return (
    <div className={`absolute pointer-events-none ${animClass}`} style={style}>
      <DropIcon size={size} />
    </div>
  );
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 340 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <circle cx="170" cy="120" r="110" fill="rgba(220,38,38,0.12)" />
      <circle cx="170" cy="120" r="80" fill="rgba(220,38,38,0.1)" />
      {/* IV Bag */}
      <rect x="138" y="28" width="64" height="82" rx="10" fill="#fecaca" stroke="#ef4444" strokeWidth="2" />
      <rect x="152" y="20" width="36" height="14" rx="5" fill="#fca5a5" stroke="#ef4444" strokeWidth="1.5" />
      <path d="M170 110 L170 145" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
      <rect x="143" y="70" width="54" height="36" rx="6" fill="#dc2626" opacity=".7" />
      <rect x="148" y="42" width="44" height="22" rx="4" fill="#fff" opacity=".5" />
      <text x="170" y="55" textAnchor="middle" fontSize="8" fill="#991b1b" fontWeight="700">BLOOD</text>
      <text x="170" y="63" textAnchor="middle" fontSize="7" fill="#b91c1c">Type A+</text>
      {/* Heart */}
      <g transform="translate(155,148)">
        <path d="M15 5 C15 5 8 0 3 5 C-2 10 3 18 15 26 C27 18 32 10 27 5 C22 0 15 5 15 5z" fill="#dc2626" />
        <path d="M15 8 C15 8 10 4 6 8 C2 12 6 18 15 24" stroke="rgba(255,200,200,0.4)" strokeWidth="1.5" fill="none" />
      </g>
      {/* Hands */}
      <ellipse cx="120" cy="200" rx="30" ry="16" fill="#fca5a5" opacity=".5" />
      <ellipse cx="220" cy="200" rx="30" ry="16" fill="#fca5a5" opacity=".5" />
      <path d="M105 200 Q120 190 135 200" stroke="#f87171" strokeWidth="2" fill="none" />
      <path d="M205 200 Q220 190 235 200" stroke="#f87171" strokeWidth="2" fill="none" />
      {/* Pulse line */}
      <polyline
        points="40,130 65,130 75,108 88,152 100,108 112,130 200,130 212,108 225,152 238,130 300,130"
        fill="none" stroke="#ef4444" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" opacity=".6"
      />
      {/* Small drops */}
      <g opacity=".5">
        <path d="M60 60 C60 60 54 70 54 75 a6 6 0 0 0 12 0 C66 70 60 60 60 60z" fill="#fca5a5" />
        <path d="M285 80 C285 80 279 90 279 95 a6 6 0 0 0 12 0 C291 90 285 80 285 80z" fill="#fca5a5" />
        <path d="M50 165 C50 165 45 172 45 176 a5 5 0 0 0 10 0 C55 172 50 165 50 165z" fill="#ef4444" />
        <path d="M290 155 C290 155 285 162 285 166 a5 5 0 0 0 10 0 C295 162 290 155 290 155z" fill="#ef4444" />
      </g>
    </svg>
  );
}

// ── Updated InputField: accepts error + onChange + value ──
function InputField({ label, icon, type = "text", placeholder, min, max, value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none select-none">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className={`w-full pl-9 pr-3 py-2.5 rounded-2xl border bg-gray-50 text-sm text-gray-800
            focus:outline-none focus:ring-4 focus:bg-white transition-all
            ${error
              ? "border-red-500 focus:border-red-600 focus:ring-red-100"
              : "border-gray-200 focus:border-red-600 focus:ring-red-100"
            }`}
        />
      </div>
      {error && (
        <p className="text-[11px] text-red-500 font-medium mt-0.5 pl-1">{error}</p>
      )}
    </div>
  );
}

export default function BloodDonation() {
  const [gender, setGender] = useState(null);
  const [bloodGroup, setBloodGroup] = useState(null);
  const [toast, setToast] = useState(false);

  // ── Form field states ──
  const [fields, setFields] = useState({
    fullName: "",
    fatherName: "",
    age: "",
    phone: "",
    address: "",
    lastDonation: "",
  });

  // ── Error states ──
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error on type
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // ── Validation Logic ──
  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!fields.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (fields.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters.";
    } else if (!/^[a-zA-Z\s]+$/.test(fields.fullName.trim())) {
      newErrors.fullName = "Name can only contain letters.";
    }

    // Father's Name
    if (!fields.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required.";
    } else if (fields.fatherName.trim().length < 3) {
      newErrors.fatherName = "Name must be at least 3 characters.";
    } else if (!/^[a-zA-Z\s]+$/.test(fields.fatherName.trim())) {
      newErrors.fatherName = "Name can only contain letters.";
    }

    // Age
    if (!fields.age) {
      newErrors.age = "Age is required.";
    } else if (isNaN(fields.age) || Number(fields.age) < 18 || Number(fields.age) > 65) {
      newErrors.age = "Age must be between 18 and 65.";
    }

    // Phone
    if (!fields.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^03\d{9}$/.test(fields.phone.replace(/-/g, ""))) {
      newErrors.phone = "Enter valid number (e.g. 03001234567).";
    }

    // Gender
    if (!gender) {
      newErrors.gender = "Please select your gender.";
    }

    // Blood Group
    if (!bloodGroup) {
      newErrors.bloodGroup = "Please select a blood group.";
    }

    // Address
    if (!fields.address.trim()) {
      newErrors.address = "Address / City is required.";
    } else if (fields.address.trim().length < 4) {
      newErrors.address = "Please enter a valid address.";
    }

    // Last Donation Date (optional but if filled, must not be future)
    if (fields.lastDonation) {
      const today = new Date();
      const donDate = new Date(fields.lastDonation);
      if (donDate > today) {
        newErrors.lastDonation = "Donation date cannot be in the future.";
      }
    }

    return newErrors;
  };

  const handleRegister = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <>
      {/* Animations */}
      <style>{`
        @keyframes floatA {
          0%,100% { transform: translateY(0); opacity: 0.2; }
          50%      { transform: translateY(-22px); opacity: 0.6; }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0) rotate(10deg); opacity: 0.15; }
          50%      { transform: translateY(-18px) rotate(10deg); opacity: 0.5; }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0); opacity: 0.1; }
          50%      { transform: translateY(-28px); opacity: 0.4; }
        }
        .float-a { animation: floatA 3.2s ease-in-out infinite; }
        .float-b { animation: floatB 4s ease-in-out infinite 0.8s; }
        .float-c { animation: floatA 3.7s ease-in-out infinite 1.2s; }
        .float-d { animation: floatC 4.5s ease-in-out infinite 0.4s; }
        .float-e { animation: floatB 3.5s ease-in-out infinite 2s; }
        @keyframes toastIn {
          from { opacity:0; transform: translateY(6px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .toast-in { animation: toastIn 0.3s ease forwards; }
      `}</style>

      <div
        className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/health.png')",
        }}
      >

        {/* Background Blobs */}
        <div className="absolute w-96 h-96 bg-red-500/20 rounded-full blur-3xl top-[-80px] left-[-100px] pointer-events-none" />
        <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl bottom-[-60px] right-[-80px] pointer-events-none" />
        <div className="absolute w-64 h-64 bg-rose-400/15 rounded-full blur-3xl top-[40%] right-[5%] pointer-events-none" />

        {/* Floating Blood Drops */}
        <FloatingDrop style={{ top: "8%", left: "6%", color: "#ef4444" }} size={28} animClass="float-a" />
        <FloatingDrop style={{ top: "20%", left: "82%", color: "#fca5a5" }} size={20} animClass="float-b" />
        <FloatingDrop style={{ top: "55%", left: "3%", color: "#dc2626" }} size={32} animClass="float-c" />
        <FloatingDrop style={{ top: "70%", left: "90%", color: "#ef4444" }} size={22} animClass="float-d" />
        <FloatingDrop style={{ top: "40%", left: "50%", color: "#fca5a5" }} size={16} animClass="float-e" />

        {/* Page Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-screen">

          {/* ── LEFT HERO ── */}
          <div className="flex flex-col justify-center items-start px-10 py-16 gap-7 md:items-start items-center text-center md:text-left">

            {/* Headline */}
            <h1 className="text-4xl text-center md:text-5xl font-extrabold text-white leading-tight">
              Donate Blood,<br />
              <span className="text-red-600 ">Save Three Lives.</span>
            </h1>

            <p className="text-white text-sm leading-relaxed max-w-sm">
              Your donation can bring hope to someone fighting for life.
              Every drop counts — become a hero today.
            </p>

            {/* SVG Illustration */}
            <div className="w-full max-w-xs md:max-w-sm">
              <HeroIllustration />
            </div>

          </div>

          {/* ── RIGHT FORM ── */}
          <div className="flex items-center justify-center px-6 py-12">
            <div className="bg-white rounded-[30px] shadow-2xl w-full max-w-md p-8 md:p-9">

              {/* Card Header */}
              <div className="text-center mb-6">
                <div className="text-3xl mb-1">❤️</div>
                <h2 className="text-lg font-bold text-red-950">Become a Blood Donor</h2>
                <p className="text-xs text-gray-400 mt-1">Fill in your details below to register</p>
              </div>

              {/* Name + Father */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <InputField
                  label="Full Name" icon="👤" placeholder="Ali Hassan"
                  value={fields.fullName} onChange={handleChange("fullName")} error={errors.fullName}
                />
                <InputField
                  label="Father's Name" icon="👨" placeholder="Ahmad Hassan"
                  value={fields.fatherName} onChange={handleChange("fatherName")} error={errors.fatherName}
                />
              </div>

              {/* Age + Phone */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <InputField
                  label="Age" icon="📅" type="number" placeholder="25" min="18" max="65"
                  value={fields.age} onChange={handleChange("age")} error={errors.age}
                />
                <InputField
                  label="Phone" icon="📞" type="tel" placeholder="03XX-XXXXXXX"
                  value={fields.phone} onChange={handleChange("phone")} error={errors.phone}
                />
              </div>

              {/* Gender */}
              <div className="mb-3">
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { val: "male", emoji: "👨", label: "Male" },
                    { val: "female", emoji: "👩", label: "Female" },
                  ].map((g) => (
                    <button
                      key={g.val}
                      onClick={() => { setGender(g.val); setErrors((prev) => ({ ...prev, gender: "" })); }}
                      className={`rounded-2xl border py-3 flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer
                        ${gender === g.val
                          ? "bg-gradient-to-br from-red-700 to-rose-500 border-transparent text-white shadow-lg shadow-red-300/30"
                          : errors.gender
                            ? "border-red-400 bg-red-50 text-gray-700"
                            : "border-gray-200 bg-gray-50 hover:border-red-400 text-gray-700"
                        }`}
                    >
                      <span className="text-2xl">{g.emoji}</span>
                      <span className={`text-xs font-semibold ${gender === g.val ? "text-white" : "text-gray-600"}`}>
                        {g.label}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.gender && (
                  <p className="text-[11px] text-red-500 font-medium mt-1 pl-1">{errors.gender}</p>
                )}
              </div>

              {/* Blood Group Pills */}
              <div className="mb-3">
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Blood Group
                </label>
                <div className="flex flex-wrap gap-2">
                  {bloodGroups.map((bg) => (
                    <button
                      key={bg}
                      onClick={() => { setBloodGroup(bg); setErrors((prev) => ({ ...prev, bloodGroup: "" })); }}
                      className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-all duration-200 cursor-pointer
                        ${bloodGroup === bg
                          ? "bg-gradient-to-r from-red-700 to-rose-500 border-transparent text-white shadow-md shadow-red-300/40"
                          : errors.bloodGroup
                            ? "border-red-400 bg-red-50 text-red-600"
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-red-500 hover:text-red-600"
                        }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
                {errors.bloodGroup && (
                  <p className="text-[11px] text-red-500 font-medium mt-1 pl-1">{errors.bloodGroup}</p>
                )}
              </div>

              {/* Address */}
              <div className="mb-3">
                <InputField
                  label="Address / City" icon="📍" placeholder="Islamabad, Pakistan"
                  value={fields.address} onChange={handleChange("address")} error={errors.address}
                />
              </div>

              {/* Last Donation */}
              <div className="mb-5">
                <InputField
                  label="Last Donation Date" icon="🗓️" type="date" placeholder=""
                  value={fields.lastDonation} onChange={handleChange("lastDonation")} error={errors.lastDonation}
                />
              </div>

              {/* Register Button */}
              <button
                onClick={handleRegister}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-700 to-rose-500
                  text-white font-bold text-[15px] flex items-center justify-center gap-2
                  hover:shadow-2xl hover:shadow-red-400/50 hover:-translate-y-0.5
                  active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                <span>❤️</span> Register Now
              </button>

              {/* Toast */}
              {toast && (
                <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-800 text-center toast-in">
                  🎉 Registered successfully! Thank you for saving lives.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}