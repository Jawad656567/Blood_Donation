import React, { useState } from "react";
import { Phone, Mail, Send, Droplet, ChevronRight, MapPin } from "lucide-react";

export default function BloodDonationContact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#0e0e14] font-sans">
      {/* Top banner */}
      <div className="relative bg-[#1a1a22] px-6 py-10 sm:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMzBoNjBNMzAgMGw2MCA2ME0zMCA2MEwyMCAwIiBzdHJva2U9IiNmZjMzNGIiIHN0cm9rZS1vcGFjaXR5PSIwLjA0Ii8+PC9zdmc+')] opacity-30" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
              <Droplet className="text-red-500 fill-red-500" size={30} />
              Contact Us
            </h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Every drop counts. One donation can save up to three lives.
            </p>
          </div>
          <div className="text-sm text-gray-300 flex items-center gap-1">
            <span className="text-red-500 font-medium">Home</span>
            <ChevronRight size={14} />
            <span className="text-white">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Main dark section */}
      <div className="bg-[#0e0e14] px-6 py-16 sm:px-16">
        <div className="text-center mb-12">
          <span className="text-red-500 tracking-[0.2em] text-xs font-semibold uppercase">
            Get In Touch
          </span>
          <h2 className="text-white text-2xl sm:text-3xl font-bold mt-3 leading-snug">
            Contact us to donate blood <br className="hidden sm:block" />
            and help save a life today!
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Left: info */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600/15 flex items-center justify-center flex-shrink-0">
                <Phone className="text-red-500" size={18} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Call for donation:</h3>
                <p className="text-gray-400 text-sm">+1 (215) 557-4567</p>
                <p className="text-gray-400 text-sm">+1 (215) 557-4568</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600/15 flex items-center justify-center flex-shrink-0">
                <Mail className="text-red-500" size={18} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Mail us:</h3>
                <p className="text-gray-400 text-sm">donate@bloodbank.com</p>
                <p className="text-gray-400 text-sm">support@bloodbank.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600/15 flex items-center justify-center flex-shrink-0">
                <Droplet className="text-red-500" size={18} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Blood needed most:</h3>
                <p className="text-gray-400 text-sm">O-negative, A-negative, B-negative</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name*"
              className="w-full bg-[#1a1a22] border border-[#2a2a35] rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email*"
              className="w-full bg-[#1a1a22] border border-[#2a2a35] rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject*"
              className="w-full bg-[#1a1a22] border border-[#2a2a35] rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Type your message here*"
              rows={4}
              className="w-full bg-[#1a1a22] border border-[#2a2a35] rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 resize-none"
            />
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white text-sm font-semibold px-6 py-3 rounded"
            >
              <Send size={15} />
              {sent ? "Message Sent!" : "Send Message"}
            </button>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="h-72 bg-[#d9d9d9] relative flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapPin className="mx-auto mb-2 text-red-600" size={28} />
          <p className="text-sm">Map location placeholder</p>
        </div>
      </div>
    </div>
  );
}