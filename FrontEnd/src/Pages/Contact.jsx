
import React from "react";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Heart,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* ================= HERO ================= */}
      <section className="bg-red-50">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

          <div className="flex flex-col items-center justify-between gap-10 md:flex-row">

            {/* Hero Text */}
            <div>
              <h1 className="text-4xl font-bold text-red-950 md:text-5xl">
                Contact Us
              </h1>

              <div className="mt-3 h-1 w-16 rounded-full bg-red-500"></div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= CONTACT SECTION ================= */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-3">


          {/* ================= LEFT SIDE ================= */}
          <div className="space-y-6">


            {/* Contact Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-red-950">
                Get In Touch
              </h2>

              <div className="mt-2 h-1 w-12 rounded-full bg-red-500"></div>


              <div className="mt-7 space-y-7">


                {/* EMAIL */}
                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">

                    {/* Icon color unchanged */}
                    <Mail className="h-5 w-5 text-blue-600" />

                  </div>


                  <div>

                    <p className="font-semibold text-slate-800">
                      Email
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      info@finddonor.com
                    </p>

                  </div>

                </div>


                {/* PHONE */}
                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">

                    {/* Icon color unchanged */}
                    <Phone className="h-5 w-5 text-blue-600" />

                  </div>


                  <div>

                    <p className="font-semibold text-slate-800">
                      Phone
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      +92 300 1234567
                    </p>

                  </div>

                </div>


                {/* ADDRESS */}
                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">

                    {/* Icon color unchanged */}
                    <MapPin className="h-5 w-5 text-blue-600" />

                  </div>


                  <div>

                    <p className="font-semibold text-slate-800">
                      Address
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Panjpir, Swabi,
                      <br />
                      Khyber Pakhtunkhwa, Pakistan
                    </p>

                  </div>

                </div>


                {/* WORKING HOURS */}
                <div className="flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">

                    {/* Icon color unchanged */}
                    <Clock className="h-5 w-5 text-blue-600" />

                  </div>


                  <div>

                    <p className="font-semibold text-slate-800">
                      Working Hours
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Monday - Saturday
                      <br />
                      9:00 AM - 6:00 PM
                    </p>

                  </div>

                </div>


              </div>

            </div>



            {/* ================= SOCIAL LINKS ================= */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-red-950">
                Follow Us
              </h2>

              <div className="mt-2 h-1 w-12 rounded-full bg-red-500"></div>


              <div className="mt-6 flex gap-4">


                {/* Facebook - unchanged */}
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-white"
                >
                  <FaFacebookF size={18} />
                </a>


                {/* Instagram - unchanged */}
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-pink-600 transition duration-300 hover:bg-pink-600 hover:text-white"
                >
                  <FaInstagram size={19} />
                </a>


                {/* X - unchanged */}
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-800 transition duration-300 hover:bg-black hover:text-white"
                >
                  <FaXTwitter size={18} />
                </a>


                {/* YouTube - unchanged */}
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-red-600 transition duration-300 hover:bg-red-600 hover:text-white"
                >
                  <FaYoutube size={19} />
                </a>


              </div>

            </div>


          </div>



          {/* ================= RIGHT SIDE FORM ================= */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:col-span-2">


            <h2 className="text-2xl font-bold text-red-950">
              Send Us a Message
            </h2>

            <div className="mt-2 h-1 w-12 rounded-full bg-red-500"></div>


            <p className="mt-3 text-slate-500">
              Have a question? We'd love to hear from you.
            </p>


            <form className="mt-8 space-y-6">


              {/* NAME + EMAIL */}
              <div className="grid gap-6 md:grid-cols-2">


                {/* NAME */}
                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />

                </div>


                {/* EMAIL */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />

                </div>


              </div>



              {/* SUBJECT */}
              <div>

                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />

              </div>



              {/* MESSAGE */}
              <div>

                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows="7"
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                ></textarea>

              </div>



              {/* BOTTOM */}
              <div className="flex flex-col items-start justify-between gap-5 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">


                <p className="text-sm text-slate-500">
                  Your information will not be shared with anyone.
                </p>


                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 font-semibold text-white transition duration-300 hover:bg-red-700"
                >

                  Send Message

                  <Send className="h-4 w-4" />

                </button>


              </div>


            </form>

          </div>


        </div>

      </section>



      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-red-50">

      </footer>


    </div>
  );
};


export default Contact;