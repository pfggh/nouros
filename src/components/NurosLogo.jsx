import React from 'react';
import { motion } from 'framer-motion';

export default function NurosLogo({ size = 'medium', showTagline = true, className = '' }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Brand Name with Sunburst O */}
      <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 tracking-widest font-cinzel font-black">
        <span className={`text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] ${
          isLarge ? 'text-4xl sm:text-6xl font-black' : isSmall ? 'text-xl' : 'text-2xl sm:text-3xl'
        }`}>
          NŪR
        </span>

        {/* Intricate Sunburst Iris 'O' */}
        <div className={`relative flex items-center justify-center ${
          isLarge ? 'w-10 h-10 sm:w-14 sm:h-14' : isSmall ? 'w-5 h-5' : 'w-7 h-7 sm:w-8 sm:h-8'
        }`}>
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full gpu"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Outer golden rays */}
            <g stroke="#D4AF37" strokeWidth="2.5">
              {[...Array(24)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 44 * Math.cos((i * 15 * Math.PI) / 180)}
                  y2={50 + 44 * Math.sin((i * 15 * Math.PI) / 180)}
                  opacity={i % 2 === 0 ? "0.95" : "0.5"}
                  strokeWidth={i % 2 === 0 ? "3" : "1.5"}
                />
              ))}
            </g>
            {/* Middle decorative ring */}
            <circle cx="50" cy="50" r="28" fill="#0B0E14" stroke="#FFF0B9" strokeWidth="2" />
            {/* Inner pupil/sun center */}
            <circle cx="50" cy="50" r="14" fill="url(#sunGlowLogo)" />
            <defs>
              <radialGradient id="sunGlowLogo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF" />
                <stop offset="60%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#D4AF37" />
              </radialGradient>
            </defs>
          </motion.svg>
        </div>

        <span className={`text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] ${
          isLarge ? 'text-4xl sm:text-6xl font-black' : isSmall ? 'text-xl' : 'text-2xl sm:text-3xl'
        }`}>
          S
        </span>
      </div>

      {/* Subtitles & Slogan */}
      {showTagline && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center mt-1"
        >
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-[#D4AF37] uppercase">
            PUB — RESTAURANT
          </span>
          <span className="text-[9px] sm:text-[11px] tracking-[0.25em] text-gray-300 uppercase font-light mt-0.5">
            NIGHTS HIT DIFFERENT
          </span>
        </motion.div>
      )}
    </div>
  );
}
