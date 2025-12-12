// src/sections/CallToAction.jsx
import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiArrowRight } from "react-icons/fi";
import { FaInstagram, FaBehance, FaLinkedin } from "react-icons/fa";

const CallToAction = forwardRef(function CallToAction(_, ref) {
  return (
    <section
      ref={ref}
      data-section="cta"
      className="relative h-screen w-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 to-white text-gray-900"
    >
      {/* Soft background blobs */}
      <div className="pointer-events-none absolute -left-40 -top-32 w-80 h-80 rounded-full bg-gradient-to-br from-amber-200 to-yellow-300 opacity-30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -right-40 -bottom-36 w-96 h-96 rounded-full bg-gradient-to-tr from-white to-amber-50 opacity-30 blur-3xl animate-blob animation-delay-2000" />

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-[min(900px,95%)] text-center"
      >
        {/* Tag */}
        <p className="text-sm font-semibold text-amber-600 tracking-wide">LET'S WORK TOGETHER</p>

        {/* Headline */}
        <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
          Creating Visual Stories<br />
          That Make Brands Unforgettable.
        </h2>

        {/* Description */}
        <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-700">
          If you're planning a brand identity, campaign, or a creative direction that needs clarity and impact,
          I’d love to collaborate and bring your vision to life.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:daspoulami2705@gmail.com"
            className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-7 py-3 rounded-full font-semibold shadow-md transition"
          >
            <FiMail size={18} />
            <span>Work With Me</span>
            <FiArrowRight size={18} />
          </a>

          <a
            href="tel:+917439749370"
            className="inline-flex items-center gap-3 border border-gray-300 px-7 py-3 rounded-full bg-white text-gray-900 hover:shadow transition"
          >
            <FiPhone size={18} />
            <span>Call</span>
          </a>
        </div>

        {/* Social icons */}
        <div className="mt-10 flex items-center justify-center gap-5">
          <a
            href="https://www.instagram.com/officialpoulamii/"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-full bg-white shadow hover:bg-amber-50 transition text-gray-800"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.behance.net/poulamidas28/"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-full bg-white shadow hover:bg-amber-50 transition text-gray-800"
          >
            <FaBehance size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/poulami-das-linkdinhere/"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-full bg-white shadow hover:bg-amber-50 transition text-gray-800"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </motion.div>

      {/* Footer note */}
      <div className="absolute bottom-6 left-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Poulami Das
      </div>
    </section>
  );
});

export default CallToAction;
