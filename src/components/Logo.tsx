/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  lightBackground?: boolean;
  horizontal?: boolean;
}

export default function Logo({ className = "w-48 h-auto", showText = true, lightBackground = true, horizontal = false }: LogoProps) {
  // Brand color scheme matching the logo image perfectly
  const strokeColor = lightBackground ? "#111111" : "#FAF6F0";
  const textColor = lightBackground ? "#111111" : "#FAF6F0";
  const goldColor = "#C9995A";

  const eyeSvg = (
    <svg 
      viewBox="0 0 400 240" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={horizontal ? "w-11 sm:w-14 h-auto shrink-0" : "w-full h-auto max-w-[280px]"}
    >
      {/* Eyebrow - heavy curved tapered stroke */}
      <path 
        d="M 120,90 Q 200,45 285,92 C 260,82 185,63 120,90 Z" 
        fill={strokeColor} 
      />

      {/* Eyelid crease - delicate curve */}
      <path 
        d="M 130,122 Q 200,92 270,122" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.85"
      />

      {/* Main lash line & eyelid */}
      <path 
        d="M 125,142 C 150,116 220,116 273,138 C 283,142 275,147 125,142 Z" 
        fill={strokeColor} 
      />

      {/* Eyelashes - individually swept curves radiating down & right */}
      {/* Left inner lashes (shorter) */}
      <path d="M 140,142 Q 133,153 125,151" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 148,142 Q 140,156 131,155" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 156,142 Q 148,159 138,159" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 164,142 Q 157,162 146,163" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />

      {/* Middle lashes (medium-long) */}
      <path d="M 172,142 Q 166,165 155,167" stroke={strokeColor} strokeWidth="1.53" strokeLinecap="round" />
      <path d="M 180,142 Q 175,169 164,171" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 188,142 Q 184,172 173,174" stroke={strokeColor} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M 197,142 Q 194,175 183,177" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 206,141 Q 204,178 193,180" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />

      {/* Outer lush volume lashes (longest, swept strongly to the right) */}
      <path d="M 215,140 Q 215,179 204,182" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 224,139 Q 226,179 216,183" stroke={strokeColor} strokeWidth="1.9" strokeLinecap="round" />
      <path d="M 233,138 Q 237,178 228,183" stroke={strokeColor} strokeWidth="1.9" strokeLinecap="round" />
      <path d="M 242,137 Q 248,176 241,182" stroke={strokeColor} strokeWidth="2.0" strokeLinecap="round" />
      <path d="M 251,136 Q 259,173 255,180" stroke={strokeColor} strokeWidth="2.0" strokeLinecap="round" />
      <path d="M 260,135 Q 270,169 269,176" stroke={strokeColor} strokeWidth="2.1" strokeLinecap="round" />
      <path d="M 268,134 Q 281,164 282,170" stroke={strokeColor} strokeWidth="2.1" strokeLinecap="round" />
      <path d="M 275,135 Q 291,159 294,163" stroke={strokeColor} strokeWidth="2.1" strokeLinecap="round" />
      <path d="M 280,138 Q 298,153 302,156" stroke={strokeColor} strokeWidth="1.9" strokeLinecap="round" />

      {/* Fine cross-over fillers for dense/textured look */}
      <path d="M 183,142 Q 170,166 159,168" stroke={strokeColor} strokeWidth="1.0" opacity="0.7" />
      <path d="M 200,142 Q 190,172 178,174" stroke={strokeColor} strokeWidth="1.0" opacity="0.7" />
      <path d="M 220,140 Q 215,176 201,178" stroke={strokeColor} strokeWidth="1.1" opacity="0.7" />
      <path d="M 238,138 Q 239,173 225,175" stroke={strokeColor} strokeWidth="1.1" opacity="0.7" />
      <path d="M 255,136 Q 261,168 248,170" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" />
      <path d="M 266,134 Q 276,161 264,163" stroke={strokeColor} strokeWidth="1.2" opacity="0.8" />

      {/* Glowing Gold Glitter Dust Particles (C9995A) floating on the right */}
      {/* Core dust trail */}
      <circle cx="282" cy="115" r="3" fill={goldColor} opacity="0.9" />
      <circle cx="292" cy="110" r="1.5" fill={goldColor} opacity="0.9" />
      <circle cx="288" cy="120" r="2" fill={goldColor} opacity="0.75" />
      <circle cx="296" cy="116" r="2.5" fill={goldColor} opacity="0.8" />
      <circle cx="305" cy="112" r="1" fill={goldColor} opacity="0.9" />
      <circle cx="312" cy="115" r="2" fill={goldColor} opacity="0.85" />
      <circle cx="321" cy="111" r="1.5" fill={goldColor} opacity="0.7" />

      {/* Upper sprinkles */}
      <circle cx="286" cy="98" r="1" fill={goldColor} opacity="0.8" />
      <circle cx="295" cy="100" r="2" fill={goldColor} opacity="0.85" />
      <circle cx="304" cy="96" r="1.5" fill={goldColor} opacity="0.95" />
      <circle cx="316" cy="103" r="1" fill={goldColor} opacity="0.75" />
      <circle cx="328" cy="106" r="1.8" fill={goldColor} opacity="0.8" />
      <circle cx="334" cy="101" r="1.2" fill={goldColor} opacity="0.65" />

      {/* Lower sprinkles */}
      <circle cx="294" cy="128" r="1.8" fill={goldColor} opacity="0.85" />
      <circle cx="300" cy="122" r="1.2" fill={goldColor} opacity="0.9" />
      <circle cx="309" cy="127" r="2" fill={goldColor} opacity="0.7" />
      <circle cx="318" cy="123" r="1" fill={goldColor} opacity="0.85" />
      <circle cx="325" cy="130" r="1.5" fill={goldColor} opacity="0.6" />

      {/* Micro dust particles */}
      <circle cx="278" cy="106" r="0.8" fill={goldColor} />
      <circle cx="308" cy="107" r="0.7" fill={goldColor} />
      <circle cx="315" cy="119" r="0.8" fill={goldColor} />
      <circle cx="329" cy="115" r="0.5" fill={goldColor} />
      <circle cx="338" cy="112" r="0.9" fill={goldColor} />
      <circle cx="344" cy="118" r="0.6" fill={goldColor} />
    </svg>
  );

  if (horizontal) {
    return (
      <div className={`flex items-center space-x-2 sm:space-x-3.5 ${className}`}>
        {eyeSvg}
        {showText && (
          <div className="flex flex-col text-left select-none shrink-0">
            <h1 
              className="font-display font-light uppercase tracking-[0.16em] leading-none"
              style={{ 
                color: textColor, 
                fontSize: '14px',
                fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" 
              }}
            >
              GLAM
            </h1>
            <p 
              className="font-sans font-light uppercase tracking-[0.45em] text-[7.5px] mt-1"
              style={{ 
                color: textColor, 
                fontFamily: "'DM Sans', 'Inter', sans-serif"
              }}
            >
              ESTHETIX
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Scalable SVG Eye Art */}
      {eyeSvg}

      {/* Structured Typography under the eye */}
      {showText && (
        <div className="text-center mt-3 select-none">
          <h1 
            className="font-display font-light uppercase tracking-[0.2em] leading-none"
            style={{ 
              color: textColor, 
              fontSize: 'min(10vw, 36px)',
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" 
            }}
          >
            GLAM
          </h1>
          <p 
            className="font-sans font-light uppercase tracking-[0.55em] text-center"
            style={{ 
              color: textColor, 
              fontSize: 'min(3.2vw, 11px)', 
              marginTop: '5px',
              fontFamily: "'DM Sans', 'Inter', sans-serif"
            }}
          >
            ESTHETIX
          </p>
        </div>
      )}
    </div>
  );
}
