// src/components/Hero.jsx
import React, { forwardRef } from "react";
import { motion } from "framer-motion";

/**
 * Hero
 * - forwardRef to accept refs from App.jsx (refs.home)
 * - responsive sizing (uses CSS clamp for watermark font)
 * - buttons stack on small screens, align left on md+
 * - portrait scales across breakpoints
 * - avoids overflow on very small screens
 */
export default forwardRef(function Hero(props, ref) {
  const { go } = props;

  return (
    <section
      ref={ref}
      data-section="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f3efee] px-6 py-12"
      aria-label="Home — Hero"
    >
      {/* soft decorative blobs (scaled and positioned responsively) */}
      <div
        className="absolute rounded-full opacity-30 pointer-events-none"
        style={{
          background: "#FDE68A",
          width: "420px",
          height: "420px",
          left: "-10%",
          top: "-18%",
          filter: "blur(120px)",
        }}
        aria-hidden
      />
      <div
        className="absolute rounded-full opacity-20 pointer-events-none"
        style={{
          background: "#000000",
          width: "420px",
          height: "420px",
          right: "-12%",
          bottom: "-20%",
          filter: "blur(140px)",
        }}
        aria-hidden
      />

      {/* watermark large text — scales with clamp so it never overflows */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.06, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute select-none leading-none text-black pointer-events-none"
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "clamp(6rem, 22vw, 12rem)", // responsive clamp
          lineHeight: 1,
        }}
        aria-hidden
      >
        PORTFOLIO
      </motion.h1>

      {/* Main content — stacks on mobile */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        {/* Left text column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 max-w-xl text-center md:text-left"
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight"
            style={{ fontFamily: "Anton, sans-serif", lineHeight: 0.95 }}
          >
            Poulami Das
          </h1>

          <p className="mt-4 text-gray-700 text-base sm:text-lg md:text-lg max-w-md mx-auto md:mx-0">
            <strong>Graphic Designer</strong> and <strong>Photographer</strong> focused on delivering immersive visuals and strategic brand experiences that resonate and engage.
          </p>

          <div className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">
            <span className="px-4 py-1.5 bg-yellow-300 text-gray-900 rounded-full text-sm font-bold shadow">Branding</span>
            <span className="px-4 py-1.5 bg-white text-gray-900 rounded-full text-sm font-bold shadow">Graphics</span>
            <span className="px-4 py-1.5 bg-black text-white rounded-full text-sm font-bold shadow">Photography</span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button
              type="button"
              onClick={() => go?.("cta")}
              className="px-6 py-2.5 bg-black text-white rounded-full text-base font-semibold shadow hover:bg-yellow-400 hover:text-gray-900 transition"
              aria-label="Work with me — go to call to action"
            >
              Work With Me
            </button>

            <button
              type="button"
              onClick={() => go?.("portfolio")}
              className="px-6 py-2.5 bg-white border border-gray-300 rounded-full text-base font-semibold shadow hover:bg-gray-100 transition"
              aria-label="View portfolio"
            >
              View Portfolio
            </button>
          </div>
        </motion.div>

        {/* Right portrait column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end items-center"
        >
          <div className="relative">
            <div className="w-44 sm:w-56 md:w-72 lg:w-80 h-44 sm:h-56 md:h-72 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src="/poda.jpg"
                alt="Poulami Das portrait"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80";
                }}
              />
            </div>

            {/* badge under portrait — positioned responsively */}
            <div className="absolute left-1/2 transform -translate-x-1/2 md:-translate-x-0 md:left-auto md:right-0 md:translate-x-0 bottom-[-22px]">
              <div className="backdrop-blur-sm bg-white/60 px-6 py-2 rounded-full border border-white/30 shadow-lg">
                <p className="text-lg font-extrabold text-gray-900" style={{ fontFamily: "Pacifico, cursive" }}>
                  #Creative_Mind
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer notes */}
      <div className="absolute bottom-6 left-6 text-xs sm:text-sm text-gray-700 max-w-xs">
        “The desire to create is one of the deepest yearnings of the human soul.”
      </div>
      <div className="absolute bottom-6 right-6 text-xs sm:text-sm text-gray-700">
        daspoulami2705@gmail.com
      </div>
    </section>
  );
});
