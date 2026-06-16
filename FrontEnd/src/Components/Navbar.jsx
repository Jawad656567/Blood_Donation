import { useState, useEffect } from "react";

const BloodCenterLogo = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="21" fill="#DC2626" stroke="#DC2626" strokeWidth="1"/>
    <circle cx="22" cy="22" r="15" fill="white"/>
    <circle cx="22" cy="17" r="3" fill="#DC2626"/>
    <path d="M17 27c0-2.8 2.2-5 5-5s5 2.2 5 5" fill="#DC2626"/>
    <circle cx="13.5" cy="19" r="2.3" fill="#DC2626"/>
    <path d="M10 27c0-2 1.6-3.7 3.5-3.7" stroke="#DC2626" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <circle cx="30.5" cy="19" r="2.3" fill="#DC2626"/>
    <path d="M34 27c0-2-1.6-3.7-3.5-3.7" stroke="#DC2626" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M22 36 C22 36, 19.5 32.5, 19.5 31 C19.5 29.6 20.6 28.5 22 28.5 C23.4 28.5 24.5 29.6 24.5 31 C24.5 32.5 22 36 22 36Z" fill="#DC2626"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="#2563EB"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const navLinks = [
  "ABOUT US",
  "DONATE BLOOD",
  "GET INVOLVED",
  "OUR MISSION",
  "HOW TO HELP",
  "CONTACTS",
];

const SocialIcons = () => (
  <div className="flex items-center gap-1.5">
    <a href="#" aria-label="Facebook" className="w-9 h-9 bg-[#2563EB] flex items-center justify-center hover:bg-blue-700 transition-colors">
      <FacebookIcon />
    </a>
    <a href="#" aria-label="Instagram" className="w-9 h-9 bg-[#2563EB] flex items-center justify-center hover:bg-blue-700 transition-colors">
      <InstagramIcon />
    </a>
    <a href="#" aria-label="YouTube" className="w-9 h-9 bg-[#2563EB] flex items-center justify-center hover:bg-blue-700 transition-colors">
      <YoutubeIcon />
    </a>
  </div>
);

export default function BloodCenterNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 900px breakpoint check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  return (
    <div className="w-full font-sans">

      {/* ══════════════ TOP BAR ══════════════ */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="px-5 py-3 flex items-center justify-between">

          {/* Logo — always visible */}
          <div className="flex items-center gap-2.5 shrink-0">
            <BloodCenterLogo />
            <span style={{ fontSize: isMobile ? "18px" : "22px" }} className="font-bold text-gray-900 tracking-tight">
              Blood Center
            </span>
          </div>

          {/* Desktop: CTA + Contact + Hours */}
          {!isMobile && (
            <div className="flex items-center gap-10 ml-6">
              {/* CTA */}
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[#2563EB] font-bold text-[15px]">Take action — save a life today!</span>
                <a href="#" className="text-gray-700 text-[14px] underline underline-offset-2 hover:text-[#2563EB] transition-colors">
                  donation locations
                </a>
              </div>
              {/* Contact */}
              <div className="flex flex-col items-start leading-snug">
                <a href="tel:+12345678900" className="text-[#2563EB] text-[14px] underline underline-offset-2 hover:text-blue-800 transition-colors">
                  +1 (234) 567 89 00
                </a>
                <a href="mailto:blood.center@email.com" className="text-[#2563EB] text-[14px] underline underline-offset-2 hover:text-blue-800 transition-colors">
                  blood.center@email.com
                </a>
              </div>
              {/* Hours */}
              <div className="flex flex-col items-start leading-snug">
                <span className="text-[#2563EB] font-bold text-[14px]">9:00 – 18:00</span>
                <span className="text-gray-600 text-[14px]">Monday – Friday</span>
              </div>
            </div>
          )}

          {/* Mobile: Hamburger only */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 p-1 ml-auto"
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          )}
        </div>
      </div>

      {/* ══════════════ DESKTOP NAV BAR ══════════════ */}
      {!isMobile && (
        <div className="w-full bg-[#F0F4F8] px-5 flex items-center justify-between min-h-[56px]">
          {/* Nav links */}
          <nav className="flex items-center">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                className="text-[12.5px] font-bold text-gray-800 uppercase px-4 py-5 hover:text-[#DC2626] transition-colors"
                style={{ letterSpacing: "0.08em" }}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Donate + Social */}
          <div className="flex items-center gap-3">
            <button className="bg-[#DC2626] hover:bg-red-700 transition-colors text-white font-bold text-[13px] uppercase px-7 py-3" style={{ letterSpacing: "0.1em" }}>
              DONATE NOW
            </button>
            <SocialIcons />
          </div>
        </div>
      )}

      {/* ══════════════ MOBILE DROPDOWN ══════════════ */}
      {isMobile && menuOpen && (
        <div className="w-full bg-white border-t border-gray-200 shadow-lg">

          {/* Nav links */}
          <nav className="flex flex-col">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="text-[13px] font-bold text-gray-800 uppercase px-5 py-4 border-b border-gray-100 hover:bg-[#F0F4F8] hover:text-[#DC2626] transition-colors"
                style={{ letterSpacing: "0.08em" }}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Donate + Social side by side */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
            <button className="bg-[#DC2626] hover:bg-red-700 transition-colors text-white font-bold text-[13px] uppercase px-5 py-2.5" style={{ letterSpacing: "0.1em" }}>
              DONATE NOW
            </button>
            <SocialIcons />
          </div>


        </div>
      )}
    </div>
  );
}