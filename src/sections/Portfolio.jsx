// src/sections/Portfolio.jsx
import React, { useState, forwardRef, useMemo, useEffect, useRef } from "react";
import { portfolioItems } from "../data/portfolio";

/**
 * Portfolio (refined)
 * - Dynamic categories (derived from data)
 * - Clean filter chips + keyboard accessible
 * - Polished cards with hover overlay + subtle transform
 * - Lightbox modal with ESC & click-outside to close
 * - Scrollable content area (flex layout consistent with your app)
 */

const PREFERRED_ORDER = [
  "All",
  "Branding",
  "Fashion",
  "Photography",
  "Editorial",
  "Events & Posters",
  "Product / UI",
  "Social Assets",
  "Animal Portraits",
];

function buildCategories(items = []) {
  const set = new Set(items.map((i) => i.category).filter(Boolean));
  const cats = Array.from(set);
  // put preferred ones first if present
  const ordered = PREFERRED_ORDER.filter((p) => p !== "All" && cats.includes(p))
    .concat(cats.filter((c) => !PREFERRED_ORDER.includes(c)));
  return ["All", ...ordered];
}

const Portfolio = forwardRef(function Portfolio(_, ref) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null); // item clicked for lightbox

  const categories = useMemo(() => buildCategories(portfolioItems), []);
  const filtered = useMemo(
    () => portfolioItems.filter((i) => (filter === "All" ? true : i.category === filter)),
    [filter]
  );

  // Lightbox handlers
  const modalRef = useRef(null);
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") {
        // next
        const idx = filtered.findIndex((it) => it.id === selected.id);
        if (idx >= 0 && idx < filtered.length - 1) setSelected(filtered[idx + 1]);
      }
      if (e.key === "ArrowLeft") {
        const idx = filtered.findIndex((it) => it.id === selected.id);
        if (idx > 0) setSelected(filtered[idx - 1]);
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, filtered]);

  // click outside modal to close
  useEffect(() => {
    const onClick = (e) => {
      if (!selected) return;
      if (modalRef.current && !modalRef.current.contains(e.target)) setSelected(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [selected]);

  return (
    <section
      ref={ref}
      data-section="portfolio"
      className="bg-white rounded-xl shadow mt-8 p-6 min-h-screen md:h-[calc(100vh-32px)] md:overflow-hidden flex flex-col"
      aria-labelledby="portfolio-heading"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 id="portfolio-heading" className="text-3xl font-extrabold">
          Portfolio
        </h2>
        <p className="text-sm text-gray-500 mt-1">Selected projects, campaigns and photography — curated.</p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex overflow-x-auto no-scrollbar gap-3 py-1" role="tablist" aria-label="Portfolio categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-300
                ${filter === cat ? "bg-amber-400 text-gray-900 shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
          <span className="text-xs">Showing</span>
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 font-medium">{filtered.length}</span>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pr-2 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((it) => (
            <article
              key={it.id}
              className="relative rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition"
            >
              <button
                type="button"
                onClick={() => setSelected(it)}
                className="block w-full text-left"
                aria-haspopup="dialog"
                aria-label={`Open ${it.title}`}
              >
                <div className="w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img
                    src={it.image}
                    alt={it.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1200&q=80";
                    }}
                  />
                </div>

                <div className="p-4">
                  <h4 className="font-semibold text-sm text-gray-900">{it.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{it.category}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-400">{/* placeholder for date / role if needed */}</div>
                    <div className="text-xs text-amber-500 font-medium">View</div>
                  </div>
                </div>
              </button>

              {/* subtle overlay tag */}
              <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs bg-white/80 backdrop-blur-sm text-gray-800 shadow-sm">
                {it.category}
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No projects match this filter.
            </div>
          )}
        </div>
      </div>

      {/* Lightbox modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div
            ref={modalRef}
            className="max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-xl"
          >
            <div className="relative">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full max-h-[70vh] object-contain bg-gray-100"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1200&q=80";
                }}
              />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-gray-700 hover:scale-105 transition"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold">{selected.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{selected.category}</p>
              {selected.description && <p className="mt-3 text-sm text-gray-700">{selected.description}</p>}

              <div className="mt-4 flex gap-3">
                <a
                  href={selected.image}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Open image
                </a>

                <button
                  onClick={() => {
                    // advance to next in filtered
                    const idx = filtered.findIndex((it) => it.id === selected.id);
                    if (idx >= 0 && idx < filtered.length - 1) setSelected(filtered[idx + 1]);
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-amber-500 text-sm text-white hover:shadow"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default Portfolio;
