// src/components/Loading.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Professional / creative fullscreen loader
 * - visible: boolean (show/hide)
 * - progress: number (0..100)
 *
 * Usage:
 * <Loading visible={loading} progress={loadProgress} />
 *
 * Note:
 * Add the CSS provided below into your global stylesheet (src/index.css)
 * to enable the subtle blob animations.
 */
export default function Loading({ visible = true, progress = 0 }) {
  // Lock body scroll while loader visible
  useEffect(() => {
    if (!visible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  // clamp progress to [0,100]
  const pct = Math.max(0, Math.min(100, Math.round(progress)));

  // Optional: allow bypass via custom event (App can listen to 'loader-bypass')
  useEffect(() => {
    const onBypass = () => {
      // no-op here; App should listen if it wants to hide loader immediately
    };
    window.addEventListener("loader-bypass", onBypass);
    return () => window.removeEventListener("loader-bypass", onBypass);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Decorative background blobs */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-30 blur-3xl animate-blob" />
            <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-gradient-to-br from-black to-gray-700 opacity-20 blur-3xl animate-blob animation-delay-2000" />
          </motion.div>

          {/* Card */}
          <motion.div
            key="loader-card"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="relative z-10 flex w-[min(860px,92%)] max-w-2xl items-center gap-8 rounded-2xl bg-white/95 p-6 shadow-2xl border border-gray-100"
            style={{ backdropFilter: "saturate(1.05) blur(4px)" }}
          >
            {/* Left: mark + title */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <motion.div
                initial={{ rotate: -6, scale: 0.96 }}
                animate={{ rotate: 0, scale: 1.02 }}
                transition={{ yoyo: Infinity, duration: 2.8, ease: "easeInOut" }}
                className="flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-300 text-gray-900 font-extrabold text-2xl shadow-md"
                aria-hidden
              >
                <motion.span
                  initial={{ y: -2 }}
                  animate={{ y: 0 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
                  className="select-none"
                >
                  PD
                </motion.span>
              </motion.div>

              <div className="text-left">
                <div className="text-sm font-semibold text-gray-800">Preparing portfolio</div>
                <div className="text-xs text-gray-500">Loading assets and optimizing visuals</div>
              </div>
            </div>

            {/* Right: progress & details */}
            <div className="flex-1">
              {/* progress label */}
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">Initializing</div>
                <div className="text-sm font-medium text-gray-700 tabular-nums">{pct}%</div>
              </div>

              {/* gradient progress bar */}
              <div className="mt-3 h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.45 }}
                  className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 shadow-sm"
                  style={{ boxShadow: "0 6px 18px rgba(250, 200, 20, 0.14)" }}
                />
              </div>

              {/* microcopy + helpful tip */}
              <div className="mt-4 flex items-start gap-3 text-sm text-gray-500">
                <svg className="w-4 h-4 mt-0.5 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="14.5" r="0.5" fill="currentColor" />
                </svg>
                <div>
                  <div>Tip: For the best experience, use a modern browser (Chrome, Edge, Safari).</div>
                  <div className="mt-1 text-xs text-gray-400">Large images are being optimized — this may take a few seconds.</div>
                </div>
              </div>
            </div>

            {/* small action: continue anyway (dispatches 'loader-bypass' event) */}
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  const e = new CustomEvent("loader-bypass");
                  window.dispatchEvent(e);
                }}
                className="text-xs text-gray-500 hover:text-gray-700 transition"
                aria-label="Bypass loading"
                title="Continue now"
              >
                Skip
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
