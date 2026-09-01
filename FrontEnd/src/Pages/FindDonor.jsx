import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  CalendarDays,
  User,
  ShieldCheck,
  MessageCircle,
  ChevronDown,
  RotateCcw,
  List,
  Map,
  ChevronLeft,
  ChevronRight,
  Droplet,
  X,
  Phone,
  Send,
  Building2,
  Check,
  BadgeCheck,
} from "lucide-react";

/* ---------------------------------- data ---------------------------------- */

const TODAY = new Date("2026-09-01");

const CITIES_POOL = ["Islamabad", "Lahore", "Karachi", "Peshawar", "Multan", "Faisalabad", "Quetta", "Rawalpindi"];

const RAW_DONORS = [
  { name: "Abdullah Khan", type: "Individual", city: "Islamabad", phone: "0312 3456789", lastDonation: "2024-05-12", blood: "O+", gender: "Male", age: 28, available: true, donations: 14, image: "https://i.pravatar.cc/150?img=11", bio: "Regular donor since 2019. Works at a local IT firm and donates every three months." },
  { name: "Life Donors Foundation", type: "Organization", city: "Lahore", phone: "0321 9876543", lastDonation: "2024-06-01", blood: "A+", gender: "Organization", age: null, available: true, donations: 340, image: null, bio: "A community blood bank coordinating over 300 verified donors across Lahore." },
  { name: "Fatima Zahra", type: "Individual", city: "Karachi", phone: "0333 4567890", lastDonation: "2024-04-20", blood: "B-", gender: "Female", age: 26, available: true, donations: 6, image: "https://i.pravatar.cc/150?img=47", bio: "First-time mother, resumed donating after clearance from her physician." },
  { name: "Usman Ahmed", type: "Individual", city: "Peshawar", phone: "0345 6789012", lastDonation: "2024-03-15", blood: "AB+", gender: "Male", age: 30, available: true, donations: 3, image: "https://i.pravatar.cc/150?img=13", bio: "Volunteer with the local Red Crescent chapter, prefers evening pickups." },
  { name: "Ayesha Siddiqui", type: "Individual", city: "Lahore", phone: "0301 2233445", lastDonation: "2026-08-15", blood: "O-", gender: "Female", age: 24, available: true, donations: 9, image: "https://i.pravatar.cc/150?img=32", bio: "Universal donor, prioritises emergency requests near DHA Lahore." },
  { name: "Hope Blood Bank", type: "Organization", city: "Karachi", phone: "021 34567890", lastDonation: "2026-08-28", blood: "AB-", gender: "Organization", age: null, available: true, donations: 512, image: null, bio: "Registered blood bank serving Karachi's public hospitals since 2011." },
  { name: "Bilal Hussain", type: "Individual", city: "Multan", phone: "0300 1122334", lastDonation: "2026-03-02", blood: "A-", gender: "Male", age: 33, available: false, donations: 11, image: "https://i.pravatar.cc/150?img=15", bio: "Farmer and volunteer with the Edhi network, donates whenever called." },
  { name: "Mahnoor Iqbal", type: "Individual", city: "Islamabad", phone: "0313 5566778", lastDonation: "2026-08-22", blood: "B+", gender: "Female", age: 22, available: true, donations: 2, image: "https://i.pravatar.cc/150?img=45", bio: "University student, newly registered but keen to help thalassemia patients." },
  { name: "Hamza Tariq", type: "Individual", city: "Faisalabad", phone: "0302 9988776", lastDonation: "2026-01-10", blood: "O+", gender: "Male", age: 35, available: false, donations: 20, image: "https://i.pravatar.cc/150?img=14", bio: "Long-time donor recovering from a minor illness, back on the list next month." },
  { name: "Sana Malik", type: "Individual", city: "Rawalpindi", phone: "0334 4455667", lastDonation: "2026-08-05", blood: "A+", gender: "Female", age: 29, available: true, donations: 7, image: "https://i.pravatar.cc/150?img=48", bio: "Nurse at Holy Family Hospital, often the first to respond to night requests." },
  { name: "Quetta Relief Trust", type: "Organization", city: "Quetta", phone: "081 2345678", lastDonation: "2026-07-30", blood: "B+", gender: "Organization", age: null, available: true, donations: 128, image: null, bio: "Coordinates rural donor drives across Balochistan." },
  { name: "Zainab Rehman", type: "Individual", city: "Karachi", phone: "0345 1122334", lastDonation: "2026-06-18", blood: "AB+", gender: "Female", age: 27, available: true, donations: 5, image: "https://i.pravatar.cc/150?img=44", bio: "Teacher, organises donation camps at her school twice a year." },
  { name: "Danish Aslam", type: "Individual", city: "Lahore", phone: "0300 7788990", lastDonation: "2026-07-11", blood: "O+", gender: "Male", age: 31, available: true, donations: 8, image: "https://i.pravatar.cc/150?img=17", bio: "Software engineer, signed up after donating for the first time at a work drive." },
  { name: "Iqra Yousaf", type: "Individual", city: "Islamabad", phone: "0311 6677889", lastDonation: "2026-02-20", blood: "A-", gender: "Female", age: 25, available: false, donations: 4, image: "https://i.pravatar.cc/150?img=29", bio: "Recently gave birth, will resume donating once cleared by her doctor." },
  { name: "Red Cross Punjab", type: "Organization", city: "Multan", phone: "061 2233445", lastDonation: "2026-08-10", blood: "O-", gender: "Organization", age: null, available: true, donations: 260, image: null, bio: "Regional chapter coordinating mobile blood drives across South Punjab." },
  { name: "Farhan Sheikh", type: "Individual", city: "Rawalpindi", phone: "0333 9988112", lastDonation: "2025-12-05", blood: "B+", gender: "Male", age: 40, available: false, donations: 22, image: "https://i.pravatar.cc/150?img=18", bio: "Retired army officer, one of the longest-serving donors in the registry." },
  { name: "Hira Nadeem", type: "Individual", city: "Faisalabad", phone: "0345 3344556", lastDonation: "2026-08-29", blood: "AB-", gender: "Female", age: 23, available: true, donations: 1, image: "https://i.pravatar.cc/150?img=36", bio: "Just registered this week after seeing a hospital appeal on social media." },
  { name: "Junaid Malik", type: "Individual", city: "Peshawar", phone: "0333 2211334", lastDonation: "2026-05-19", blood: "O+", gender: "Male", age: 27, available: true, donations: 10, image: "https://i.pravatar.cc/150?img=19", bio: "Runs a small transport business, coordinates donor pickups for his staff too." },
  { name: "Nimra Baig", type: "Individual", city: "Quetta", phone: "0301 5566990", lastDonation: "2026-04-02", blood: "A+", gender: "Female", age: 30, available: true, donations: 6, image: "https://i.pravatar.cc/150?img=39", bio: "Pharmacist, often refers patients' families to registered donors nearby." },
  { name: "Karachi Blood Circle", type: "Organization", city: "Karachi", phone: "021 9988776", lastDonation: "2026-08-18", blood: "A-", gender: "Organization", age: null, available: true, donations: 190, image: null, bio: "Volunteer collective running weekend donation camps across the city." },
  { name: "Owais Raza", type: "Individual", city: "Multan", phone: "0300 4455223", lastDonation: "2026-06-30", blood: "B-", gender: "Male", age: 34, available: true, donations: 13, image: "https://i.pravatar.cc/150?img=21", bio: "Shopkeeper, has donated at the same camp every Ramadan for six years." },
  { name: "Sadia Aziz", type: "Individual", city: "Lahore", phone: "0312 6677001", lastDonation: "2025-11-14", blood: "AB+", gender: "Female", age: 28, available: false, donations: 3, image: "https://i.pravatar.cc/150?img=41", bio: "On a temporary travel break, will update availability on return." },
  { name: "Waleed Hassan", type: "Individual", city: "Faisalabad", phone: "0345 8899001", lastDonation: "2026-08-24", blood: "O-", gender: "Male", age: 26, available: true, donations: 5, image: "https://i.pravatar.cc/150?img=22", bio: "Gym trainer, keeps a strict health routine and donates every 90 days." },
  { name: "Rabia Fayyaz", type: "Individual", city: "Rawalpindi", phone: "0333 1122008", lastDonation: "2026-07-27", blood: "B+", gender: "Female", age: 33, available: true, donations: 7, image: "https://i.pravatar.cc/150?img=42", bio: "Bank employee, coordinates her office's quarterly blood donation drive." },
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const CITIES = [...new Set(RAW_DONORS.map((d) => d.city))].sort();
const PAGE_SIZE = 4;
const DEFAULT_FILTERS = { blood: "All", gender: "All", city: "All", availability: "All", lastDonation: "Any" };

function daysAgo(dateStr) {
  return Math.round((TODAY - new Date(dateStr)) / 86400000);
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function initials(name) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

/* ------------------------------- sub components ------------------------------- */

const FilterSelect = ({ label, value, onChange, options }) => (
  <div>
    <label className="mb-1.5 block text-xs font-semibold text-slate-700">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-8 text-xs text-slate-600 outline-none focus:border-blue-500"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
    </div>
  </div>
);

const Avatar = ({ donor, size = 48 }) => {
  if (donor.type === "Organization") {
    return (
      <div className="flex shrink-0 items-center justify-center rounded-full bg-emerald-50" style={{ width: size, height: size }}>
        <Building2 size={size * 0.45} className="text-emerald-600" />
      </div>
    );
  }
  return (
    <img
      src={donor.image}
      alt={donor.name}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
      onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; }}
    />
  );
};

const AvatarWithDot = ({ donor, size = 48 }) => (
  <div className="relative shrink-0" style={{ width: size, height: size }}>
    <Avatar donor={donor} size={size} />
    <span
      className="absolute rounded-full border-2 border-white"
      style={{
        width: size * 0.24, height: size * 0.24, right: -1, bottom: -1,
        background: donor.available ? "#22C55E" : "#CBD5E1",
      }}
    />
  </div>
);

const StatusPill = ({ available }) => (
  <div className="flex items-center gap-1.5">
    <ShieldCheck size={14} className={available ? "text-emerald-500" : "text-slate-300"} />
    <div>
      <p className={"text-xs font-semibold " + (available ? "text-emerald-600" : "text-slate-400")}>
        {available ? "Available" : "Not available"}
      </p>
      <p className="text-[10px] text-slate-400">{available ? "Ready to donate" : "Resting period"}</p>
    </div>
  </div>
);

const DonorCard = ({ donor, onView, onMessage }) => (
  <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm md:grid-cols-[1.4fr_0.7fr_0.8fr_0.75fr] md:items-center">

    <div className="flex items-center gap-3">
      <AvatarWithDot donor={donor} />
      <div className="min-w-0">
        <div className="flex items-center gap-1">
          <h3 className="truncate text-[13px] font-bold text-slate-800">{donor.name}</h3>
          <BadgeCheck size={14} className="fill-blue-500 text-white" />
        </div>
        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
          <MapPin size={11} />{donor.city}, Pakistan
        </div>
        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
          <Phone size={11} />{donor.phone}
        </div>
        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
          <CalendarDays size={11} />Last donation: {formatDate(donor.lastDonation)}
        </div>
      </div>
    </div>

    <div className="flex items-center gap-3 md:justify-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
        <Droplet size={21} fill="currentColor" className="text-red-500" />
      </div>
      <div>
        <p className="text-base font-bold text-red-500">{donor.blood}</p>
        <p className="text-[9px] text-slate-500">Blood Group</p>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <User size={13} className="text-blue-500" />
        <div>
          <p className="text-[11px] font-semibold text-slate-700">{donor.type === "Organization" ? "Organization" : donor.gender}</p>
          <p className="text-[9px] text-slate-400">{donor.type === "Organization" ? "Type" : "Gender"}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <CalendarDays size={13} className="text-blue-500" />
        <div>
          <p className="text-[11px] font-semibold text-slate-700">{donor.age ? `${donor.age} Years` : "—"}</p>
          <p className="text-[9px] text-slate-400">Age</p>
        </div>
      </div>
      <StatusPill available={donor.available} />
    </div>

    <div className="flex flex-row gap-2 md:flex-col">
      <button onClick={() => onView(donor)} className="flex h-8 flex-1 items-center justify-center rounded-md bg-blue-600 px-3 text-[11px] font-semibold text-white transition hover:bg-blue-700 md:w-full md:flex-none">
        View Profile
      </button>
      <button onClick={() => onMessage(donor)} className="flex h-8 flex-1 items-center justify-center gap-1 rounded-md border border-slate-200 bg-white px-3 text-[11px] font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-600 md:w-full md:flex-none">
        <MessageCircle size={12} />Send Message
      </button>
    </div>
  </div>
);

const ProfileModal = ({ donor, onClose, onMessage }) => {
  if (!donor) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <AvatarWithDot donor={donor} size={56} />
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-base font-bold text-slate-800">{donor.name}</h2>
                <BadgeCheck size={15} className="fill-blue-500 text-white" />
              </div>
              <p className="text-xs text-slate-500">{donor.city}, Pakistan</p>
            </div>
          </div>
          <button onClick={onClose}><X size={18} className="text-slate-400" /></button>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-slate-600">{donor.bio}</p>

        <div className="mb-4 grid grid-cols-2 gap-3">
          {[
            ["Blood group", donor.blood],
            [donor.type === "Organization" ? "Type" : "Gender", donor.type === "Organization" ? "Organization" : donor.gender],
            ["Age", donor.age ? `${donor.age} years` : "—"],
            ["Donations", donor.donations],
            ["Phone", donor.phone],
            ["Last donation", formatDate(donor.lastDonation)],
          ].map(([label, val]) => (
            <div key={label} className="rounded-md bg-slate-50 p-2.5">
              <p className="text-[10px] text-slate-400">{label}</p>
              <p className="text-xs font-semibold text-slate-800">{val}</p>
            </div>
          ))}
        </div>

        <StatusPill available={donor.available} />

        <div className="mt-5 flex gap-2">
          <button onClick={() => { onClose(); onMessage(donor); }} className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700">
            <MessageCircle size={13} />Send Message
          </button>
          <a href={`tel:${donor.phone.replace(/\s/g, "")}`} className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600">
            <Phone size={13} />Call
          </a>
        </div>
      </div>
    </div>
  );
};

const MessageModal = ({ donor, onClose }) => {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  if (!donor) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
        {sent ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <Check size={22} className="text-emerald-500" />
            </div>
            <p className="text-sm font-semibold text-slate-800">Message sent to {donor.name}</p>
            <p className="mt-1 text-xs text-slate-500">They'll usually reply within a few hours.</p>
            <button onClick={onClose} className="mt-4 h-8 rounded-md bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700">Done</button>
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Message {donor.name}</h3>
              <button onClick={onClose}><X size={17} className="text-slate-400" /></button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Hi ${donor.name.split(" ")[0]}, I'm reaching out because we need a ${donor.blood} donor...`}
              rows={4}
              className="w-full resize-none rounded-md border border-slate-200 p-2.5 text-xs text-slate-700 outline-none focus:border-blue-500"
            />
            <button
              disabled={!text.trim()}
              onClick={() => setSent(true)}
              className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-40"
            >
              <Send size={13} />Send Message
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const HeroIllustration = () => (
  <svg viewBox="0 0 300 140" className="h-28 w-72">
    <text x="200" y="20" fontSize="20" fill="#93C5FD">♥</text>
    <text x="255" y="35" fontSize="16" fill="#BFDBFE">♥</text>
    <g transform="translate(150,20)">
      <rect x="0" y="10" width="70" height="90" rx="14" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="3" />
      <rect x="14" y="35" width="42" height="50" rx="6" fill="white" />
      <text x="35" y="65" fontSize="10" fontWeight="700" fill="#2563EB" textAnchor="middle">BLOOD</text>
      <rect x="26" y="0" width="18" height="14" rx="3" fill="#2563EB" />
      <rect x="31" y="-6" width="8" height="10" rx="2" fill="#2563EB" />
    </g>
    <path d="M235 60 C235 40, 265 40, 265 65 C265 85, 250 100, 250 100 C250 100, 235 85, 235 60 Z" fill="#EF4444" />
    <ellipse cx="60" cy="110" rx="60" ry="18" fill="#DBEAFE" opacity="0.6" />
  </svg>
);

/* --------------------------------- main --------------------------------- */

export default function FindDonors() {
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState(DEFAULT_FILTERS);
  const [applied, setApplied] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("list");
  const [viewingDonor, setViewingDonor] = useState(null);
  const [messagingDonor, setMessagingDonor] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return RAW_DONORS.filter((d) => {
      if (q && !(d.name.toLowerCase().includes(q) || d.city.toLowerCase().includes(q) || d.blood.toLowerCase().includes(q))) return false;
      if (applied.blood !== "All" && d.blood !== applied.blood) return false;
      if (applied.gender !== "All" && d.gender !== applied.gender) return false;
      if (applied.city !== "All" && d.city !== applied.city) return false;
      if (applied.availability === "Available" && !d.available) return false;
      if (applied.availability === "Not available" && d.available) return false;
      if (applied.lastDonation !== "Any") {
        const days = daysAgo(d.lastDonation);
        if (applied.lastDonation === "Last 30 days" && days > 30) return false;
        if (applied.lastDonation === "Last 3 months" && days > 90) return false;
        if (applied.lastDonation === "6+ months ago" && days < 180) return false;
      }
      return true;
    });
  }, [search, applied]);

  useEffect(() => setPage(1), [search, applied]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageDonors = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const cityCounts = useMemo(() => {
    const map = {};
    filtered.forEach((d) => { map[d.city] = (map[d.city] || 0) + 1; });
    return map;
  }, [filtered]);

  // build compact pagination list with ellipsis, like the reference (1 2 3 ... 6)
  const pageList = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const list = [1, 2, 3];
    if (page > 4 && page < totalPages) list.push("...", page, totalPages);
    else if (page >= totalPages) list.push("...", totalPages);
    else list.push("...", totalPages);
    return [...new Set(list)];
  }, [totalPages, page]);

  return (
    <div className="min-h-screen bg-[#f5f8ff] px-4 py-6 font-sans text-slate-800 md:px-6 lg:px-8">

      {/* Header */}
      <div className="relative mx-auto max-w-[1450px] overflow-hidden rounded-xl">
        <div className="relative z-10">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">Find Donors</h1>
          <p className="mt-1 max-w-[430px] text-[11px] leading-5 text-slate-500">
            Find and connect with blood donors<br />in your community. Save lives together.
          </p>
        </div>
        <div className="pointer-events-none absolute right-0 top-[-10px] hidden md:block">
          <HeroIllustration />
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto mt-6 grid max-w-[1450px] grid-cols-1 gap-4 lg:grid-cols-[220px_1fr]">

        {/* Sidebar */}
        <aside className="h-fit rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[13px] font-bold text-slate-800">Filters</h2>
            <SlidersHorizontal size={15} className="text-blue-500" />
          </div>

          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">Search</label>
            <div className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, city or blood group..."
                className="h-9 w-full rounded-md border border-slate-200 pl-8 pr-2 text-[10px] outline-none placeholder:text-slate-400 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-3.5">
            <FilterSelect label="Blood Group" value={draft.blood} onChange={(v) => setDraft({ ...draft, blood: v })} options={["All", ...BLOOD_GROUPS]} />
            <FilterSelect label="Gender" value={draft.gender} onChange={(v) => setDraft({ ...draft, gender: v })} options={["All", "Male", "Female", "Organization"]} />
            <FilterSelect label="Location" value={draft.city} onChange={(v) => setDraft({ ...draft, city: v })} options={["All", ...CITIES]} />
            <FilterSelect label="Availability" value={draft.availability} onChange={(v) => setDraft({ ...draft, availability: v })} options={["All", "Available", "Not available"]} />
            <FilterSelect label="Last Donation" value={draft.lastDonation} onChange={(v) => setDraft({ ...draft, lastDonation: v })} options={["Any", "Last 30 days", "Last 3 months", "6+ months ago"]} />
          </div>

          <div className="mt-5 space-y-2">
            <button onClick={() => setApplied(draft)} className="flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-blue-600 text-[11px] font-semibold text-white hover:bg-blue-700">
              <SlidersHorizontal size={12} />Apply Filters
            </button>
            <button
              onClick={() => { setDraft(DEFAULT_FILTERS); setApplied(DEFAULT_FILTERS); setSearch(""); }}
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-blue-300 bg-white text-[11px] font-medium text-blue-600 hover:bg-blue-50"
            >
              <RotateCcw size={12} />Reset Filters
            </button>
          </div>
        </aside>

        {/* Donors area */}
        <main>
          <div className="mb-3 flex flex-col gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-semibold text-slate-700">
              Showing <span className="text-slate-900">{filtered.length} donor{filtered.length !== 1 ? "s" : ""}</span>
            </p>
            <div className="flex items-center self-end rounded-md border border-slate-100 bg-slate-50 p-1 sm:self-auto">
              <button onClick={() => setView("list")} className={"flex items-center gap-1 rounded px-2 py-1 text-[10px] font-semibold " + (view === "list" ? "bg-blue-100 text-blue-600" : "text-slate-500")}>
                <List size={12} />List View
              </button>
              <button onClick={() => setView("map")} className={"flex items-center gap-1 rounded px-2 py-1 text-[10px] font-semibold " + (view === "map" ? "bg-blue-100 text-blue-600" : "text-slate-500")}>
                <Map size={12} />Map View
              </button>
            </div>
          </div>

          {view === "list" ? (
            <>
              <div className="space-y-2">
                {pageDonors.length === 0 && (
                  <div className="rounded-xl border border-slate-100 bg-white p-8 text-center text-xs text-slate-500">
                    No donors match these filters. Try widening your search.
                  </div>
                )}
                {pageDonors.map((donor) => (
                  <DonorCard key={donor.name} donor={donor} onView={setViewingDonor} onMessage={setMessagingDonor} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-5 flex items-center justify-center gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-slate-400 shadow-sm disabled:opacity-40">
                    <ChevronLeft size={13} />
                  </button>
                  {pageList.map((n, i) =>
                    n === "..." ? (
                      <span key={"e" + i} className="px-1 text-[10px] text-slate-400">...</span>
                    ) : (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={"flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-semibold " + (n === page ? "bg-blue-600 text-white" : "bg-white text-slate-600 shadow-sm")}
                      >
                        {n}
                      </button>
                    )
                  )}
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-slate-400 shadow-sm disabled:opacity-40">
                    <ChevronRight size={13} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="mb-4 text-[11px] text-slate-500">Tap a city to filter the list by that location.</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {CITIES_POOL.map((city) => {
                  const count = cityCounts[city] || 0;
                  return (
                    <button
                      key={city}
                      onClick={() => { setDraft({ ...draft, city }); setApplied({ ...applied, city }); setView("list"); }}
                      className="flex flex-col items-center gap-1.5 rounded-lg border p-4 text-center transition"
                      style={{ borderColor: count ? "#2563EB" : "#E2E8F0", opacity: count ? 1 : 0.45 }}
                    >
                      <MapPin size={20} className="text-blue-500" />
                      <span className="text-[11px] font-semibold text-slate-700">{city}</span>
                      <span className="text-[9px] text-slate-400">{count} donor{count !== 1 ? "s" : ""}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      <ProfileModal donor={viewingDonor} onClose={() => setViewingDonor(null)} onMessage={setMessagingDonor} />
      <MessageModal donor={messagingDonor} onClose={() => setMessagingDonor(null)} />
    </div>
  );
}