// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { NAV } from "./data/nav.jsx";

import Hero from "./components/Hero";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Loading from "./components/Loading";

import About from "./sections/About";
import Resume from "./sections/Resume";
import Portfolio from "./sections/Portfolio";
import TestimonialsSection from "./sections/Testimonials";
import CallToAction from "./sections/CallToAction";

import { portfolioItems } from "./data/portfolio"; // used for preloading images

export default function App() {
  // navigation + layout state
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // loading state and progress
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // internal refs
  const manualNavRef = useRef(false); // when user clicks nav, temporarily freeze auto-selection
  const mutationRef = useRef(null);

  // forwarded refs for sections
  const refs = {
    home: useRef(null),
    about: useRef(null),
    resume: useRef(null),
    portfolio: useRef(null),
    testimonials: useRef(null),
    cta: useRef(null),
  };

  // Robust scroll-to helper
  const go = (id, manual = true) => {
    if (!id) return;
    if (manual) {
      manualNavRef.current = true;
      setTimeout(() => (manualNavRef.current = false), 900);
    }
    setActive(id);
    setMenuOpen(false);

    const STICKY_OFFSET = 72; // adjust to match any sticky header

    const scrollToEl = (el) => {
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top - STICKY_OFFSET;

      const doc = document.documentElement;
      const maxScrollTop = Math.max(0, doc.scrollHeight - window.innerHeight);
      const clampedTop = Math.min(Math.max(Math.floor(top), 0), maxScrollTop);

      window.scrollTo({ top: clampedTop, behavior: "smooth" });
    };

    const r = refs[id];
    if (r && r.current) {
      scrollToEl(r.current);
      return;
    }

    const tryQuery = () => {
      const el = document.querySelector(`[data-section="${id}"]`);
      if (el) {
        scrollToEl(el);
        return true;
      }
      return false;
    };

    if (tryQuery()) return;

    // brief retry in case element mounts shortly after click
    let tries = 0;
    const retry = setInterval(() => {
      tries += 1;
      if (tryQuery() || tries > 8) clearInterval(retry);
    }, 120);
  };

  // ------------------- Preload images + loader -------------------
  useEffect(() => {
    // Build unique set of images to preload (hero + portfolio images)
    const images = new Set();
    images.add("/hero-face.jpg");
    if (Array.isArray(portfolioItems)) {
      portfolioItems.forEach((p) => {
        if (p && p.image) images.add(p.image);
      });
    }
    const urls = Array.from(images);

    if (urls.length === 0) {
      // nothing to preload: short delay then hide loader
      setTimeout(() => setLoading(false), 160);
      return;
    }

    let loaded = 0;
    let finished = false;

    const updateProgress = () => {
      const pct = Math.round((loaded / urls.length) * 100);
      setLoadProgress(pct);
    };

    const preloadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded += 1;
          updateProgress();
          resolve(true);
        };
        img.onerror = () => {
          loaded += 1;
          updateProgress();
          resolve(false);
        };
        // small delay to avoid sync behaviour on some browsers
        setTimeout(() => {
          img.src = src;
        }, 20);
      });

    // Start loading
    const promises = urls.map((u) => preloadImage(u));

    // global fallback to avoid indefinite loader (6s)
    const fallback = setTimeout(() => {
      if (finished) return;
      finished = true;
      setLoadProgress(100);
      setTimeout(() => setLoading(false), 220);
    }, 6000);

    Promise.all(promises).then(() => {
      if (finished) return;
      finished = true;
      clearTimeout(fallback);
      setLoadProgress(100);
      setTimeout(() => setLoading(false), 300);
    });

    return () => {
      finished = true;
      clearTimeout(fallback);
    };
  }, []);

  // ------------------- Section selection (midpoint method) -------------------
  useEffect(() => {
    const DEBUG_SELECTION = false;

    const getSectionElements = () => {
      const elems = [];
      Object.entries(refs).forEach(([id, r]) => {
        if (r && r.current) elems.push({ id, el: r.current });
      });
      // fallback: include elements with data-section attribute not already present
      document.querySelectorAll("[data-section]").forEach((el) => {
        const id = el.getAttribute("data-section") || el.dataset.section;
        if (!elems.find((e) => e.id === id)) elems.push({ id, el });
      });
      return elems;
    };

    let ticking = false;
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const sections = getSectionElements();
        if (!sections.length) return;

        const vh = window.innerHeight || document.documentElement.clientHeight;
        const vc = vh / 2;

        let bestId = null;
        let bestDist = Infinity;

        sections.forEach(({ id, el }) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          if (rect.height <= 0) return;
          const mid = rect.top + rect.height / 2;
          const dist = Math.abs(mid - vc);
          if (dist < bestDist) {
            bestDist = dist;
            bestId = id;
          }
        });

        if (bestId && !manualNavRef.current) {
          if (DEBUG_SELECTION) console.log("chosen", bestId, bestDist);
          setActive(bestId);
          // hide sidebar on home and CTA (full-bleed)
          setShowSidebar(bestId !== "home" && bestId !== "cta");
        }
      });
    };

    // initial run + listeners
    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    // observe DOM for late mounts
    mutationRef.current = new MutationObserver(() => onScrollOrResize());
    mutationRef.current.observe(document.documentElement || document.body, { childList: true, subtree: true });

    // small retries to handle late layout shifts
    const t1 = setTimeout(onScrollOrResize, 200);
    const t2 = setTimeout(onScrollOrResize, 600);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      try {
        mutationRef.current?.disconnect();
      } catch (e) {}
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // immediate sidebar visibility on active change (fallback)
  useEffect(() => {
    if (active === "home" || active === "cta") setShowSidebar(false);
    else setShowSidebar(true);
  }, [active]);

  const computedShow = showSidebar;

  // While loading, show loader overlay
  if (loading) {
    return <Loading visible={true} progress={loadProgress} />;
  }

  // Normal app render
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} NAV={NAV} active={active} go={go} />

      {/* Hero (full screen, full-bleed) */}
      <Hero ref={refs.home} go={go} />

      {/* Centered grid with optional sidebar */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-6 md:pt-6">
        {/** Render sidebar only when computedShow is true so it doesn't occupy grid space when hidden */}
        {computedShow && <Sidebar show={computedShow} NAV={NAV} active={active} go={go} />}

        <main className={`col-span-12 ${computedShow ? "md:col-span-9" : "md:col-span-12"}`}>
          <About ref={refs.about} />
          <Resume ref={refs.resume} />
          <Portfolio ref={refs.portfolio} />
          <TestimonialsSection ref={refs.testimonials} />
        </main>
      </div>

      {/* Full-bleed CTA outside the centered grid so it covers the viewport */}
      <CallToAction ref={refs.cta} />

      {/* Footer flush against CTA (allow override via className) */}
      <Footer className="mt-0 pt-0" />
      <WhatsAppFloat />
    </div>
  );
}
