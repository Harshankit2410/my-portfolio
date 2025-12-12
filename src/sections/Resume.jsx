// src/sections/Resume.jsx
import React, { forwardRef } from "react";
import { FiDownload, FiChevronRight } from "react-icons/fi";

/**
 * Resume (complete)
 * - ForwardRef + data-section="resume" for navigation compatibility
 * - Left column: polished Experience cards
 * - Right column: Core Skills, Tools I Use, and CTA to download full resume
 * - Tools list: Canva, Polarr, CapCut, Adobe Photoshop, Lightroom
 */
const Resume = forwardRef(function Resume(props, ref) {
  const skills = [
    "Creativity",
    "Communication",
    "Critical Thinking",
    "Teamwork",
    "Time Management",
    "Management Skills",
    "Leadership",
    "Graphics Designing",
    "Video & Photo Editing",
  ];

  const tools = ["Canva", "Polarr", "CapCut", "Adobe Photoshop", "Lightroom"];

  return (
    <section
      ref={ref}
      data-section="resume"
      className="bg-white rounded-xl shadow-md p-8 mt-8 min-h-screen md:min-h-[calc(100vh-32px)]"
      aria-label="Resume"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">RESUME</h2>
            <p className="mt-1 text-gray-600">Selected experience, core skills & tools</p>
          </div>

          <a
            href="/resume-download.html"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full shadow-md transition"
            aria-label="Download full resume"
          >
            <FiDownload /> Download CV
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* EXPERIENCE (left) */}
          <div className="md:col-span-7">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Experience</h3>

            <div className="space-y-6">
              {/* Isla Vidaa */}
              <article className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-md font-semibold text-gray-900">Social Media Executive</h4>
                    <div className="text-sm text-amber-600 font-medium">Isla Vidaa</div>
                  </div>

                  <div className="text-sm text-gray-500">2025 — Present</div>
                </div>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Handling brand social media accounts and producing high-quality visual content.
                  Responsibilities include photo & video editing, graphic design for posts and stories,
                  content scheduling, and ensuring consistent brand voice and visual identity across platforms.
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border">
                    Social Media
                  </li>
                  <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    Photo & Video Editing
                  </li>
                  <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    Graphic Design
                  </li>
                </ul>
              </article>

              {/* IIC TMSL — Social Media Team */}
              <article className="relative bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-md font-semibold text-gray-900">Social Media Team Member</h4>
                    <div className="text-sm text-amber-600 font-medium">Institution's Innovation Council (IIC TMSL)</div>
                  </div>

                  <div className="text-sm text-gray-500">2024 — Present</div>
                </div>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Supporting the council's digital outreach by creating visual assets (posts, reels, and banners),
                  editing event photos and videos, and coordinating content to amplify events and initiatives.
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border">
                    Community Outreach
                  </li>
                  <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    Content Creation
                  </li>
                </ul>
              </article>

              {/* IIC TMSL — Sponsorship Team */}
              <article className="relative bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-md font-semibold text-gray-900">Sponsorship Team Member</h4>
                    <div className="text-sm text-amber-600 font-medium">Institution's Innovation Council (IIC TMSL)</div>
                  </div>

                  <div className="text-sm text-gray-500">2024 — 2025</div>
                </div>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Contributed to partnership outreach and sponsorship coordination for events.
                  Assisted in preparing pitch materials, designing promotional creatives, and aligning sponsor messaging
                  with event branding to support successful collaborations.
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    Sponsorship Communications
                  </li>
                  <li className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    Promotional Design
                  </li>
                </ul>
              </article>
            </div>
          </div>

          {/* SKILLS & TOOLS (right) */}
          <aside className="md:col-span-5">
            <div className="sticky top-6 space-y-6">
              {/* Core Skills */}
              <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-800">Core Skills</h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 border border-gray-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools I Use */}
              <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-800">Tools I Use</h4>
                <p className="mt-2 text-sm text-gray-600">Creative tools I use for designing, editing and content creation.</p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {tools.map((tool) => (
                    <div
                      key={tool}
                      className="flex items-center gap-3 px-3 py-2 rounded-md bg-gray-50 border border-gray-100 hover:shadow transition"
                    >
                      <div className="w-9 h-9 rounded-md bg-white flex items-center justify-center text-sm font-semibold text-gray-700 shadow-sm">
                        {tool
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="text-sm text-gray-700">{tool}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA / Download */}
              <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm text-center">
                <div className="text-sm text-gray-600">Want the full CV?</div>
                <a
                  href="/resume-download.html"
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition"
                  aria-label="Download Full Resume"
                >
                  Download Full Resume <FiChevronRight />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
});

export default Resume;
