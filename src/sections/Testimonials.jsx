// src/sections/Testimonials.jsx
import React, { forwardRef } from "react";
import { testimonials } from "../data/testimonials";
import { FaStar } from "react-icons/fa";

const MAX_STARS = 5;

const Testimonials = forwardRef(function Testimonials(props, ref) {
  const items = Array.isArray(testimonials) ? testimonials : [];

  const renderStars = (count) => {
    const clamped = Math.max(0, Math.min(MAX_STARS, Number(count) || 0));
    const label = `${clamped} out of ${MAX_STARS} stars`;

    return (
      <div className="flex items-center gap-0.5" role="img" aria-label={label}>
        {[...Array(MAX_STARS)].map((_, i) => (
          <FaStar
            key={i}
            aria-hidden="true"
            className={`text-[10px] ${i < clamped ? "text-amber-500" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  if (items.length === 0) {
    return (
      <section
        ref={ref}
        data-section="testimonials"
        className="bg-white rounded-xl shadow-md p-6 mt-8 md:mt-10"
        aria-label="Testimonials"
      >
        <div className="max-w-7xl mx-auto text-center">
          <header className="mb-4">
            <h2 className="text-2xl font-extrabold text-gray-900">Testimonials</h2>
            <p className="mt-1 text-xs text-gray-600 max-w-xl mx-auto">
              Notes from people I've worked with — sharing their honest experience.
            </p>
          </header>

          <div className="py-12 text-sm text-gray-500">No testimonials available yet.</div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      data-section="testimonials"
      className="bg-white rounded-xl shadow-md p-6 mt-8 md:mt-10 md:h-[calc(100vh-32px)]"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-4">
          <h2 id="testimonials-heading" className="text-2xl font-extrabold text-gray-900">
            Testimonials
          </h2>
          <p className="mt-1 text-xs text-gray-600 max-w-xl">
            Notes from people I've worked with — sharing their honest experience.
          </p>
        </header>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col md:flex-row gap-3 p-4 rounded-lg bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow transition"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-amber-100 shadow"
                  aria-hidden="false"
                >
                  <img
                    src={t.avatar || "/placeholder-avatar.png"}
                    alt={t.name ? `${t.name} avatar` : "avatar"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      // graceful fallback to placeholder
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder-avatar.png";
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <figcaption className="flex-1 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                    <div className="text-[10px] text-gray-500">{t.role}</div>
                  </div>

                  <div className="flex flex-col items-end">
                    {renderStars(t.rating)}
                    <span className="text-[10px] text-gray-400 mt-0.5">Rating</span>
                  </div>
                </div>

                {/* Quote block */}
                <blockquote className="relative mt-2 text-xs text-gray-700 italic leading-relaxed pl-3 pr-4 py-1.5">
                  <span className="text-xl text-amber-300 absolute -left-1 -top-1" aria-hidden>
                    “
                  </span>
                  <span className="block">{t.text}</span>
                  <span className="text-xl text-amber-300 absolute right-1 -bottom-1" aria-hidden>
                    ”
                  </span>
                </blockquote>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Testimonials;
