// src/components/Footer.jsx
import React from "react";
import {
  FiInstagram,
  FiMail,
  FiChevronUp,
  FiMapPin,
  FiPhone,
  FiLinkedin,
} from "react-icons/fi";
import { FaBehance } from "react-icons/fa";

export default function Footer({ className = "" }) {
  const STICKY_OFFSET = 72;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => (e) => {
    if (e?.preventDefault) e.preventDefault();

    const el =
      document.querySelector(`[data-section="${sectionId}"]`) ||
      document.getElementById(sectionId);

    if (!el) return;

    const rect = el.getBoundingClientRect();
    const top = window.scrollY + rect.top - STICKY_OFFSET;

    const doc = document.documentElement;
    const maxScrollTop = Math.max(0, doc.scrollHeight - window.innerHeight);
    const clampedTop = Math.min(Math.max(Math.floor(top), 0), maxScrollTop);

    window.scrollTo({ top: clampedTop, behavior: "smooth" });
  };

  return (
    <footer
      className={`w-full bg-[#0e0e0f] text-gray-300 pt-8 pb-10 border-t border-gray-800 ${className}`}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Branding */}
          <div className="md:col-span-5">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-yellow-400 text-gray-900 font-extrabold text-lg shadow-md">
                PD
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-wide text-white">
                  Poulami Das
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Designer • Photographer
                </p>

                {/* Social Icons */}
                <div className="mt-5 flex items-center gap-4">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/officialpoulamii/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition shadow-sm"
                    aria-label="Instagram"
                  >
                    <FiInstagram size={20} />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/poulami-das-linkdinhere/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin size={20} />
                  </a>

                  {/* Behance */}
                  <a
                    href="https://www.behance.net/poulamidas28"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition shadow-sm"
                    aria-label="Behance"
                  >
                    <FaBehance size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FiMapPin className="text-gray-400" />
                <span>Kolkata, West Bengal, India</span>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="text-gray-400" />
                <a href="tel:+917439749370" className="hover:text-white">
                  +91 74397 49370
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-gray-400" />
                <a
                  href="mailto:daspoulami2705@gmail.com"
                  className="hover:text-white"
                >
                  daspoulami2705@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold text-gray-200 mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="#about"
                  onClick={scrollToSection("about")}
                  className="hover:text-white transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#resume"
                  onClick={scrollToSection("resume")}
                  className="hover:text-white transition"
                >
                  Resume
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={scrollToSection("portfolio")}
                  className="hover:text-white transition"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={scrollToSection("testimonials")}
                  className="hover:text-white transition"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-3 flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-5 py-3 rounded-lg shadow-md transition"
              aria-label="Back to top"
            >
              <FiChevronUp size={18} />
              <span className="text-sm tracking-wide">Back to Top</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <span>
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-300">Poulami Das</span>. All rights
            reserved.
          </span>

          <span className="mt-3 md:mt-0 text-gray-500 text-xs">
            Crafted with precision & creativity.
          </span>
        </div>
      </div>
    </footer>
  );
}
