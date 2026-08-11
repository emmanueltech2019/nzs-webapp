"use client";
import React from "react";
import "./tape.css";

export default function Tape() {
  const items = ["NaijaZone", "Nigeria Made Goods", "🇳🇬", "NaijaZone", "Nigeria Made Goods", "🇳🇬", "NaijaZone", "Nigeria Made Goods", "🇳🇬", "NaijaZone", "Nigeria Made Goods", "🇳🇬"];

  return (
    <div className="tape-container max-w-lg">
      <div className="tape-track">
        {items.map((item, index) => (
          <span key={index} className="tape-item">
            {item}
          </span>
        ))}

        {/* Duplicate for seamless loop */}
        {items.map((item, index) => (
          <span key={ `dup-${index}`} className="tape-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
