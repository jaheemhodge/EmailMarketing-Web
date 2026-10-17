"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The homepage is the chat experience and has its own compact profile header.
  if (pathname === "/") return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div className="pointer-events-auto mt-4 flex h-14 w-[calc(100%-2rem)] max-w-[1200px] items-center justify-between gap-6 rounded-full border border-border bg-background/95 px-5 shadow-soft backdrop-blur-md sm:px-6">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          JAH<span className="text-accent">.</span>MEDIA
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03] active:scale-[0.97]"
          >
            Book a Call
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-[1.5px] w-6 bg-foreground transition-transform duration-300 ease-[var(--ease-drawer)] ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-6 bg-foreground transition-transform duration-300 ease-[var(--ease-drawer)] ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`pointer-events-auto fixed inset-x-0 top-[72px] bottom-0 z-40 bg-background transition-transform duration-300 ease-[var(--ease-drawer)] md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 font-display text-2xl font-medium text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-background"
          >
            Book a Call
          </Link>
          <p className="mt-10 text-sm text-muted">{site.email}</p>
        </nav>
      </div>
    </header>
  );
}
