// src/TestComponents.jsx
import React from 'react'
import Hero from './components/Hero'
import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'
import About from './sections/About'
import Resume from './sections/Resume'
import Portfolio from './sections/Portfolio'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'

export default function TestComponents() {
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>TestComponents — rendering components individually</h1>

      <section style={{ marginTop: 24, padding: 12, border: '1px solid #ddd' }}>
        <h2>Hero</h2>
        <Hero heroRef={{ current: null }} />
      </section>

      <section style={{ marginTop: 24, padding: 12, border: '1px solid #ddd' }}>
        <h2>Sidebar (collapsed preview)</h2>
        <div style={{ width: 320 }}>
          <Sidebar show={true} NAV={[]} active="home" go={() => {}} />
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 12, border: '1px solid #ddd' }}>
        <h2>MobileNav (closed)</h2>
        <MobileNav menuOpen={false} setMenuOpen={() => {}} NAV={[]} active="home" go={() => {}} />
      </section>

      <section style={{ marginTop: 24, padding: 12, border: '1px solid #ddd' }}>
        <h2>About</h2>
        <About refProp={{ current: null }} />
      </section>

      <section style={{ marginTop: 24, padding: 12, border: '1px solid #ddd' }}>
        <h2>Resume</h2>
        <Resume refProp={{ current: null }} />
      </section>

      <section style={{ marginTop: 24, padding: 12, border: '1px solid #ddd' }}>
        <h2>Portfolio</h2>
        <Portfolio refProp={{ current: null }} />
      </section>

      <section style={{ marginTop: 24, padding: 12, border: '1px solid #ddd' }}>
        <h2>Testimonials</h2>
        <Testimonials refProp={{ current: null }} />
      </section>

      <section style={{ marginTop: 24, padding: 12, border: '1px solid #ddd' }}>
        <h2>Contact</h2>
        <Contact refProp={{ current: null }} />
      </section>
    </div>
  )
}
