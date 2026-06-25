import React from "react";
import { Link } from "react-router-dom";

const BloodCenterLogo = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="22" cy="22" r="21" fill="#DC2626" />
    <circle cx="22" cy="22" r="15" fill="white" />
    <circle cx="22" cy="17" r="3" fill="#DC2626" />
    <path
      d="M17 27c0-2.8 2.2-5 5-5s5 2.2 5 5"
      fill="#DC2626"
    />
    <circle cx="13.5" cy="19" r="2.3" fill="#DC2626" />
    <path
      d="M10 27c0-2 1.6-3.7 3.5-3.7"
      stroke="#DC2626"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="30.5" cy="19" r="2.3" fill="#DC2626" />
    <path
      d="M34 27c0-2-1.6-3.7-3.5-3.7"
      stroke="#DC2626"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M22 36 C22 36,19.5 32.5,19.5 31C19.5 29.6 20.6 28.5 22 28.5C23.4 28.5 24.5 29.6 24.5 31C24.5 32.5 22 36 22 36Z"
      fill="#DC2626"
    />
  </svg>
);



const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


const InstagramIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="white" />
  </svg>
);


const YoutubeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="#0F172A" />
  </svg>
);



export default function BloodFooter() {

  return (

    <footer className="bg-[#0F172A] text-white">


      {/* Footer Main */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">


          {/* Brand */}
          <div>

            <div className="flex items-center gap-3 mb-5">

              <BloodCenterLogo />

              <h2 className="text-2xl font-bold">
                Blood Center
              </h2>

            </div>


            <p className="text-gray-300 text-sm leading-relaxed">
              We connect blood donors with patients in need.
              Every donation creates hope and saves lives.
            </p>


            <button className="mt-6 bg-[#DC2626] hover:bg-red-700 transition px-6 py-3 text-sm font-bold uppercase tracking-wider">
              Donate Now
            </button>


          </div>



          {/* Links */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Useful Links
            </h3>

            <ul className="space-y-3 text-sm text-gray-300">

              <li className="hover:text-red-500 transition cursor-pointer">
                <Link to="/about">
                  About Us
                </Link>
              </li>


              <li className="hover:text-red-500 transition cursor-pointer">
                <Link to="/donate-blood">
                  Donate Blood
                </Link>
              </li>


              <li className="hover:text-red-500 transition cursor-pointer">
                <Link to="/find-donors">
                  Find Donors
                </Link>
              </li>


              <li className="hover:text-red-500 transition cursor-pointer">
                <Link to="/mission">
                  Our Mission
                </Link>
              </li>


              <li className="hover:text-red-500 transition cursor-pointer">
                <Link to="/contact">
                  Contact
                </Link>
              </li>

            </ul>

          </div>


          {/* Contact */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Contact Info
            </h3>


            <div className="space-y-4 text-sm text-gray-300">

              <p>
                📞
                <a
                  href="tel:+923146767659"
                  className="hover:text-red-500 transition"
                >
                  +92 (314) 6767659
                </a>
              </p>


              <p>
                ✉
                <a
                  href="mailto:JawadAli9090@email.com"
                  className="hover:text-red-500 transition"
                >
                  JawadAli9090@email.com
                </a>
              </p>


              <p>
                🕒 Open 24 Hours
                <br />
                Fast & reliable service
              </p>

            </div>

          </div>



          {/* Social */}
          <div>

            <h3 className="text-lg font-bold mb-5">
              Follow Us
            </h3>


            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Join our community and help spread awareness about blood donation.
            </p>



            <div className="flex gap-3">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2563EB] flex items-center justify-center hover:scale-110 transition"
              >
                <FacebookIcon />
              </a>


              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2563EB] flex items-center justify-center hover:scale-110 transition"
              >
                <InstagramIcon />
              </a>


              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2563EB] flex items-center justify-center hover:scale-110 transition"
              >
                <YoutubeIcon />
              </a>

            </div>


          </div>


        </div>

      </div>




      {/* Bottom */}
      <div className="border-t border-gray-700">

        <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">


          <p className="text-gray-400 text-sm text-center">
            © 2026 Blood Center. All Rights Reserved.
          </p>


          <p className="text-gray-400 text-sm">
            Donate Blood • Save Lives ❤️
          </p>


        </div>

      </div>



    </footer>

  );
}