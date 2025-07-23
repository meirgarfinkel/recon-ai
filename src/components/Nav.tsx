// components/Nav.tsx
"use client";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { useState } from "react";

function Dropdown({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="px-4 py-2 font-medium hover:text-accent transition-colors flex items-center justify-center">
        {label} <span className="ml-1">&#x25BE;</span>
      </button>

      {/* Bridge element to prevent gap hover issues */}
      {open && (
        <div className="absolute top-full left-0 right-0 h-3 bg-transparent" />
      )}

      {open && (
        <div className="absolute left-1/2 transform -translate-x-1/2 shadow mt-3 w-56 rounded-xl bg-bg-secondary text-text-primary z-20">
          {items.map(item => (
            <a
              href="#"
              key={item}
              className="block px-6 py-3 hover:bg-text-secondary/10 rounded-xl"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 py-3 bg-bg-nav shadow-sm shadow-text-secondary font-sans text-lg">
      {/* Logo */}
      <Link href="/" className="block">
        <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
      </Link>

      {/* Links */}
      <div className="flex items-center space-x-4 text-text-nav transition-colors">
        <Link href="/dashboard" className="px-4 py-2 font-medium hover:text-accent">
          Home
        </Link>
        <Dropdown
          label="Your RAGs"
          items={[
            "Solutions Overview",
            "Fleet Tracking",
            "Fleet Maintenance",
            "Fleet Safety",
            "Fuel Management",
            "EV Fleet",
            "Mobile Apps"
          ]}
        />
        <Link href="#" className="px-4 py-2 font-medium hover:text-accent">
          Help
        </Link>
        <Link href="#" className="px-4 py-2 font-medium hover:text-accent">
          About
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <Link
          href="/login"
          className="rounded-full px-5 py-1 bg-accent hover:bg-accent-hover text-accent-text font-semibold transition-colors"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
