// src/sections/About.jsx
import React, { forwardRef } from "react";
import { FiMail, FiDownload } from "react-icons/fi";

const About = forwardRef(function About(_, ref) {
  return (
    <section
      ref={ref}
      data-section="about"
      className="bg-white rounded-xl shadow-md p-8 mt-8 min-h-screen md:min-h-[calc(100vh-32px)]"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* LEFT — Profile */}
        <div className="md:col-span-4 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-amber-400">
            <img
              src="/hero-face.jpg"
              alt="Poulami Das"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80";
              }}
            />
          </div>

          <h3 className="mt-4 text-2xl font-extrabold text-gray-900">Poulami Das</h3>
          <p className="text-sm text-amber-600">Designer • Photographer</p>

          <p className="mt-4 text-sm text-gray-600 text-center">
            A multidisciplinary creative dedicated to transforming ideas into compelling visual experiences.
            I combine design, and artistic intuition to craft work that not only looks beautiful
            but also communicates with intention and emotional clarity.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="mailto:daspoulami2705@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-full text-sm shadow hover:bg-amber-700 transition"
            >
              <FiMail /> Contact
            </a>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border text-sm rounded-full shadow hover:bg-gray-50 transition"
            >
              <FiDownload /> Resume
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 w-full">
            <div className="bg-gray-50 p-4 rounded-lg border text-center">
              <div className="text-xl font-bold">2+</div>
              <div className="text-xs text-gray-500">Years</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border text-center">
              <div className="text-xl font-bold">27+</div>
              <div className="text-xs text-gray-500">Projects</div>
            </div>
          </div>
        </div>

        {/* RIGHT — Skills + Short Bio */}
        <div className="md:col-span-8 space-y-8">
          
          {/* Header */}
          <header>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              About Me
            </h2>
            <p className="mt-3 text-gray-600 text-sm max-w-xl">
              Hi, I’m Poulami Das — a creative designer and digital creator passionate about turning ideas into meaningful visuals.
              I specialize in branding, social media design, product design, and digital art.
            </p>

            <p className="mt-3 text-gray-600 text-sm max-w-xl">
              With experience across diverse creative projects, I build designs that are clean, modern, and story-driven.
              My goal is to help brands communicate more effectively through thoughtful design and distinctive visual language.
            </p>

            <p className="mt-3 text-gray-600 text-sm max-w-xl">
              I enjoy experimenting with new styles, learning continuously, and producing work that leaves a lasting impact.
            </p>
          </header>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Core Skills</h3>

            <div className="mt-4 flex flex-wrap gap-3">
              {[
                "Creativity",
                "Communication",
                "Critical Thinking",
                "Teamwork",
                "Sponsorship",
                "Time Management",
                "Management Skills",
                "Leadership",
                "Graphics Designing",
                "Video & Photo Editing",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 border"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* What I Do (concise, expanded) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">What I Do</h3>
            <div className="mt-3 text-sm text-gray-600 max-w-2xl space-y-3">
              <p>
                I develop brand identities, design social and product interfaces, and produce polished visual content.
                From concept to final delivery, I focus on clarity, and coherence that supports business goals.
              </p>

              <p>
                My workflow blends research, ideation, and iterative refinement: I research the brief and audience, explore concepts,
                prototype solutions, and refine the final design or edit until it communicates the desired message with impact.
              </p>

              <p>
                Practically, this involves logo systems, marketing assets, social content, and photo/video edits — all created to perform
                across platforms while maintaining a consistent visual language that resonates with audiences.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default About;
