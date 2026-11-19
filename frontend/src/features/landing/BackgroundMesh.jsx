import React from 'react';

export function BackgroundMesh() {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen pointer-events-none"
      style={{
        zIndex: -20,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      {/* 1. Deep Cosmic Radial Gradient (Exact HackX Colors) */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, #180038 0%, #0d0021 60%, #05000d 100%)',
          zIndex: -19
        }}
      />

      {/* 2. Rotating Moving-Gradient Geometric SVG Mark (Exact HackX 3D Central Mark) */}
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center select-none pointer-events-none"
        style={{
          zIndex: -10,
          transform: 'translateZ(0)',
          willChange: 'transform, opacity'
        }}
      >
        <svg
          viewBox="0 0 895 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-opacity duration-700"
          style={{
            height: '38vh',
            width: '34vh',
            opacity: 0.65,
            filter: 'blur(1.5px) drop-shadow(0 0 25px rgba(174, 115, 242, 0.4)) drop-shadow(0 0 50px rgba(82, 0, 199, 0.35))'
          }}
        >
          <defs>
            <linearGradient id="movingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5200c7" />
              <stop offset="33%" stopColor="#ae73f2" />
              <stop offset="66%" stopColor="#7801ff" />
              <stop offset="100%" stopColor="#5200c7" />
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                from="0 447.5 500"
                to="360 447.5 500"
                dur="15s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>
          <path
            d="M335.279 0.25L559.355 400.69L894.574 999.75H559.721L335.645 599.31L0.425781 0.25H335.279ZM335.177 999.75H0.535156L335.177 600.119V999.75ZM894.465 0.25L559.823 399.88V0.25H894.465Z"
            fill="url(#movingGradient)"
          />
        </svg>
      </div>

      {/* 3. Subtle Linear Ambient Gradient Overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(115deg, rgba(24, 0, 56, 0.15), rgba(13, 0, 33, 0.05) 55%, rgba(5, 0, 13, 0.12))',
          zIndex: -8
        }}
      />

      {/* 4. Procedural Fractal Noise Filter (Exact HackX VisionNoise) */}
      <svg
        className="pointer-events-none fixed top-0 left-0 w-full h-full opacity-[0.12]"
        style={{ zIndex: -5, display: 'block' }}
      >
        <defs>
          <filter id="visionNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="1" result="noise" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.14 0"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#visionNoise)" />
      </svg>
    </div>
  );
}
