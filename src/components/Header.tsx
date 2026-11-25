"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/60 bg-neutral-950/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-display text-xl tracking-wide text-amber-200">
          Moon Gallery
        </Link>

        <ul className="hidden gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm transition-colors hover:text-amber-200 ${
                  pathname === l.href ? "text-amber-200" : "text-neutral-300"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Menu">
          ☰
        </button>
      </nav>

      {open && (
        <ul className="space-y-2 border-t border-neutral-800/60 px-4 py-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block py-1 text-neutral-300">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}