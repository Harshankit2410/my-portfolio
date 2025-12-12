// src/components/WhatsAppFloat.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  const phoneNumber = "917439749370"; // Your WhatsApp number

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebe5d] text-white p-4 rounded-full shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-4xl" />
    </a>
  );
}
