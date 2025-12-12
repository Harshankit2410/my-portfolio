// src/components/MobileNav.jsx
import React from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function MobileNav({ menuOpen, setMenuOpen, NAV = [], active, go }) {
  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded bg-white/90 shadow">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setMenuOpen(false)}>
          <div className="absolute left-0 top-0 w-64 h-full bg-gray-900 p-4">
            <nav className="flex flex-col gap-2">
              {NAV.map(item => (
                <button key={item.id} type="button" onClick={() => { go(item.id, true); setMenuOpen(false); }} className={`text-left py-3 px-2 rounded ${active===item.id?'bg-yellow-400 text-gray-900':'text-white hover:bg-gray-700'}`}>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
