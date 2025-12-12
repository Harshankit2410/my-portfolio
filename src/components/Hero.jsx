// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Hero({ heroRef, go }) {
  return (
    <section
      ref={heroRef}
      data-section="home"
      className="relative h-screen w-screen flex items-center justify-center overflow-hidden bg-[#f3efee]"
    >
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-yellow-300 rounded-full blur-[150px] opacity-30"></div>
      <div className="absolute bottom-[-25%] right-[-15%] w-[500px] h-[500px] bg-black rounded-full blur-[180px] opacity-20"></div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 0.08, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute text-[30vw] lg:text-[22vw] font-extrabold leading-none select-none text-black"
        style={{ fontFamily: "Anton, sans-serif" }}
      >
        PORTFOLIO
      </motion.h1>

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-12 px-6">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 leading-[0.95]"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            Poulami Das
          </h1>

          <p className="mt-4 text-gray-700 text-lg leading-relaxed max-w-md">
            <span className="font-bold">Graphic Designer</span> and{" "}
            <span className="font-bold">Photographer</span> focused on delivering
            immersive visuals and strategic brand experiences that resonate and
            engage.
          </p>

          <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
            <span className="px-5 py-2 bg-yellow-300 text-gray-900 rounded-full text-sm font-bold shadow">
              Branding
            </span>
            <span className="px-5 py-2 bg-white text-gray-900 rounded-full text-sm font-bold shadow">
              Graphics
            </span>
            <span className="px-5 py-2 bg-black text-white rounded-full text-sm font-bold shadow">
              Photography
            </span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              type="button"
              onClick={() => go("cta")}
              className="px-8 py-3 bg-black text-white rounded-full text-lg font-semibold shadow hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
            >
              Work With Me
            </button>
            <button
              type="button"
              onClick={() => go("portfolio")}
              className="px-8 py-3 bg-white border border-gray-300 rounded-full text-lg font-semibold shadow hover:bg-gray-200 transition-all duration-300"
            >
              View Portfolio
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1 }}
          className="relative flex flex-col items-center"
        >
          <div className="w-[260px] md:w-[320px] lg:w-[380px] h-[260px] md:h-[320px] lg:h-[380px] rounded-full overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="/poda.jpg"
              alt="Poulami Das"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80";
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="absolute bottom-[-35px] backdrop-blur-xl bg-white/40 px-8 py-3 rounded-full border border-white/20 shadow-xl"
          >
            <p
              className="text-xl font-extrabold text-gray-900 tracking-tight"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              #Creative_Mind
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-6 text-xs md:text-sm text-gray-700 max-w-xs">
        “The desire to create is one of the deepest yearnings of the human soul.”
      </div>
      <div className="absolute bottom-6 right-6 text-xs md:text-sm text-gray-700">
        daspoulami2705@gmail.com
      </div>
    </section>
  );
}
