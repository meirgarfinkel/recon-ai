"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// Modern pill theme toggle switch
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  // "mounted" fixes hydration mismatch on first paint
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle Theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-13 h-7.5 flex items-center rounded-full transition-colors bg-white/80"
    >
      {/* Sun icon */}
      <span className={`z-10 ml-0.5 flex items-center transition-opacity ${isDark ? "opacity-100" : "opacity-0"}`}>
        <svg
          className="w-6 h-6 text-black"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <circle cx="10" cy="10" r="3" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x = 10 + Math.cos(angle) * 6;
            const y = 10 + Math.sin(angle) * 6;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="1"
                fill="currentColor"
              />
            );
          })}
        </svg>
      </span>

      {/* Moon icon */}
      <span className={`absolute right-0.5 flex items-center transition-opacity ${isDark ? "opacity-0" : "opacity-100"}`}>
        <svg
          className="w-5 h-5 text-black"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>

      {/* Knob */}
      <span
        className={`absolute top-0.7 w-6 h-6 rounded-full bg-bg-nav transition-transform duration-100 ${isDark ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}
