import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  Users,
  Calendar,
  Phone,
  Droplet,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  Heart,
  MapPin,
  BookOpen,
  Award,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    setOpen(false);
    setDonateOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navItems = [
    { name: "Home", icon: Home, link: "/" },
    { name: "About", icon: Info, link: "/about" },
    { name: "Find Donors", icon: Users, link: "/find" },
    { name: "Campaigns", icon: Calendar, link: "/campaigns" },
    { name: "Contact", icon: Phone, link: "/contact" },
  ];

  const donateDropdown = [
    { name: "Why Donate?", icon: Heart, link: "/why-donate", desc: "Benefits & impact" },
    { name: "Eligibility", icon: Award, link: "/eligibility", desc: "Check if you qualify" },
    { name: "Find a Center", icon: MapPin, link: "/centers", desc: "Nearest locations" },
    { name: "Blood Facts", icon: BookOpen, link: "/facts", desc: "Learn the basics" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .nav-link-underline {
          position: relative;
        }
        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #DC2626;
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .nav-link-underline:hover::after,
        .nav-link-underline.active::after {
          width: 100%;
        }
        .dropdown-panel {
          opacity: 0;
          transform: translateY(8px) scale(0.98);
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .dropdown-panel.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }
        .mobile-slide {
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
        }
        .register-btn {
          position: relative;
          overflow: hidden;
        }
        .register-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.12);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        .register-btn:hover::before {
          transform: translateX(0);
        }
        .pulse-dot {
          animation: pulseDot 2s infinite;
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(220,38,38,0); }
        }
        .nav-icon-badge {
          transition: transform 0.2s ease;
        }
        .nav-item:hover .nav-icon-badge {
          transform: scale(1.15);
        }
        .dropdown-item {
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .dropdown-item:hover {
          background: #fef2f2;
          transform: translateX(3px);
        }
        .dark .dropdown-item:hover {
          background: rgba(220,38,38,0.1);
        }
        .chevron-rotate {
          transition: transform 0.25s ease;
        }
        .chevron-rotate.open {
          transform: rotate(180deg);
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <header
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-[0_1px_24px_rgba(0,0,0,0.08)] h-14"
            : "bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 h-16"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
                  <Droplet size={16} className="text-white fill-white" />
                </div>
                <span className="pulse-dot absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-black tracking-tight text-gray-900 dark:text-white">
                  <span className="text-[#DC2626]">Blood</span>Link
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium tracking-wider uppercase">
                  Save Lives
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.link);
                return (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`nav-item nav-link-underline flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                      ${active
                        ? "text-[#DC2626] bg-red-50 dark:bg-red-900/20 active"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                  >
                    <Icon size={15} className="nav-icon-badge flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}

              {/* Donate dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDonateOpen(true)}
                onMouseLeave={() => setDonateOpen(false)}
              >
                <button className={`nav-item nav-link-underline flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                  ${donateOpen
                    ? "text-[#DC2626] bg-red-50 dark:bg-red-900/20"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Heart size={15} className="nav-icon-badge flex-shrink-0" />
                  Donate
                  <ChevronDown size={13} className={`chevron-rotate flex-shrink-0 ${donateOpen ? "open" : ""}`} />
                </button>

                <div className={`dropdown-panel ${donateOpen ? "visible" : ""} absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden`}>
                  <div className="p-2">
                    {donateDropdown.map((d) => {
                      const Icon = d.icon;
                      return (
                        <Link
                          key={d.name}
                          to={d.link}
                          className="dropdown-item flex items-center gap-3 px-3 py-2.5 rounded-xl"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                            <Icon size={15} className="text-[#DC2626]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{d.name}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight">{d.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="border-t border-gray-100 dark:border-gray-800 p-3">
                    <Link
                      to="/donate-now"
                      className="block w-full text-center text-sm font-bold text-[#DC2626] hover:text-red-700 transition-colors py-1"
                    >
                      Donate blood now →
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* ── Right Controls ── */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-105"
              >
                {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
              </button>

              <Link to="/find" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-red-200 hover:text-[#DC2626] hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200">
                <MapPin size={14} />
                Find Blood
              </Link>

              <Link
                to="/register"
                className="register-btn flex items-center gap-2 bg-[#DC2626] hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Heart size={14} className="fill-white" />
                Register as Donor
              </Link>
            </div>

            {/* ── Mobile Toggle ── */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`mobile-slide md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.link);
              return (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                    ${active
                      ? "text-[#DC2626] bg-red-50 dark:bg-red-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                >
                  <Icon size={17} />
                  {item.name}
                </Link>
              );
            })}

            {/* Donate section header */}
            <div className="pt-2 pb-1 px-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600">Donate</p>
            </div>
            {donateDropdown.map((d) => {
              const Icon = d.icon;
              return (
                <Link
                  key={d.name}
                  to={d.link}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150"
                >
                  <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                    <Icon size={14} className="text-[#DC2626]" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{d.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{d.desc}</span>
                  </div>
                </Link>
              );
            })}

            {/* Bottom controls */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
                {theme === "light" ? "Dark mode" : "Light mode"}
              </button>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="register-btn flex items-center justify-center gap-2 w-full bg-[#DC2626] hover:bg-red-700 text-white py-3 rounded-xl text-sm font-bold shadow-sm transition-all duration-200"
              >
                <Heart size={15} className="fill-white" />
                Register as Donor
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}