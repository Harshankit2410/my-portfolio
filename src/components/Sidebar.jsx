// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";

/**
 * Responsive Sidebar (improved)
 * - Always mounted on desktop (prevents exit/unmount flicker)
 * - Hidden on mobile (md breakpoint)
 * - Uses CSS opacity + pointer-events to hide instead of unmounting
 *
 * Props:
 * - show: boolean (controls visibility on desktop)
 * - NAV: array of nav items
 * - active: current active id
 * - go: navigation function (id -> scroll)
 */
export default function Sidebar({ show, NAV = [], active = "", go = () => {} }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(Boolean(mq.matches));
    update();

    // modern + fallback listeners
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    const onResize = () => update();
    window.addEventListener("resize", onResize);

    return () => {
      try {
        if (mq.removeEventListener) mq.removeEventListener("change", update);
        else mq.removeListener(update);
      } catch (e) {}
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // If not desktop, do not render the sidebar at all (MobileNav handles mobile)
  if (!isDesktop) return null;

  // When `show` is false we hide via opacity and pointer-events (no unmount)
  const visibilityClasses = show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none";

  return (
    <div className="col-span-3 hidden md:block" aria-hidden={!show}>
      {/* initial mount animation only; we don't animate exit */}
      <motion.aside
        initial={{ x: -260, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
        role="navigation"
        aria-label="Primary navigation"
        className={`flex flex-col bg-gray-900 text-white rounded-xl shadow-xl md:h-[calc(100vh-32px)] sticky top-6 overflow-hidden border border-gray-700 transform transition-opacity duration-200 ${visibilityClasses}`}
      >
        {/* Header */}
        <div className="p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full ring-4 ring-yellow-400 overflow-hidden shadow-lg">
            <img
              src="/hero-face.jpg"
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1545996124-1b2c89f8b1f1?w=800&q=80";
              }}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="mt-4 text-xl font-extrabold tracking-wide">Poulami Das</h3>
          <p className="text-sm text-yellow-300 opacity-90">Designer / Photographer</p>
        </div>

        {/* NAVIGATION */}
        <nav className="px-6 py-4 flex-1 space-y-1 overflow-y-auto no-scrollbar" aria-label="Primary navigation">
          {Array.isArray(NAV) &&
            NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id, true)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg w-full text-left transition-all duration-200 border border-transparent
                    ${isActive ? "bg-yellow-400 text-gray-900 font-semibold shadow-md" : "text-gray-300 hover:bg-gray-800 hover:border-gray-700"}
                  `}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Go to ${item.label}`}
                >
                  <span className={`text-xl ${isActive ? "text-gray-900" : "text-gray-300"}`}>{item.icon}</span>
                  <span className="font-medium tracking-wide">{item.label}</span>
                </button>
              );
            })}
        </nav>

        {/* Footer (Resume Button) */}
        <div className="p-6 border-t border-gray-700 flex justify-center">
          <a
            href="/resume-download.html"
            className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg shadow hover:opacity-95 font-semibold transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Download resume"
          >
            <FiDownload className="text-xl" />
            <span>Resume</span>
          </a>
        </div>
      </motion.aside>
    </div>
  );
}
