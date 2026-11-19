'use client';

import type { CSSProperties } from 'react';

// Stable positions prevent hydration differences. No canvas or animation library is required.
const bubbles = [
  [3, 1.5, 24, .67, 12, -4], [89, 2.2, 48, .84, 16, -9],
  [74, 6.4, 19, .72, 13, -2], [7, 9.1, 60, .50, 17, -7],
  [95, 11.4, 35, .63, 11, -5], [64, 14.8, 67, .48, 19, -13],
  [31, 17.6, 17, .63, 13, -3], [83, 19.3, 29, .67, 14, -6],
  [11, 23.2, 83, .46, 22, -12], [96, 25.1, 22, .58, 17, -8],
  [66, 27.7, 31, .63, 14, -4], [4, 31, 37, .67, 15, -8],
  [92, 33.8, 76, .48, 19, -11], [18, 36.4, 16, .65, 12, -4],
  [79, 39.2, 41, .60, 18, -9], [7, 41, 23, .60, 14, -5],
  [96, 43.6, 32, .52, 19, -8], [49, 47.3, 57, .36, 21, -11],
  [13, 50.6, 29, .68, 15, -4], [85, 52.9, 20, .62, 12, -3],
  [97, 55.2, 53, .48, 20, -15], [2, 58.6, 40, .55, 18, -7],
  [57, 61.3, 26, .65, 14, -10], [93, 64.5, 85, .40, 22, -13],
  [18, 66.1, 14, .69, 13, -6], [78, 68.8, 34, .62, 17, -10],
  [6, 71.4, 70, .44, 18, -4], [94, 74.3, 22, .74, 13, -8],
  [41, 77.1, 38, .46, 20, -11], [10, 79.9, 25, .60, 14, -7],
  [82, 82.3, 64, .47, 19, -10], [97, 84.8, 16, .70, 12, -6],
  [3, 87.6, 45, .53, 18, -13], [65, 90.1, 21, .62, 13, -5],
  [91, 92.8, 34, .59, 15, -10], [17, 95.4, 63, .40, 21, -7],
  [76, 97.6, 25, .65, 14, -12],
] as const;

export default function AtmosphereBubbles() {
  return (
    <div className="auren-bubble-atmosphere" aria-hidden="true">
      {bubbles.map(([left, top, size, opacity, duration, delay], i) => (
        <span
          key={i}
          className={`auren-real-bubble ${i % 7 === 0 ? 'auren-bubble-distant' : ''}`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
