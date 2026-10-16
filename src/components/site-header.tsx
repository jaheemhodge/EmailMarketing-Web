"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // On the homepage, the header blends into the dark hero until the page scrolls,
  // then becomes an inset light pill — matching every other page's always-on pill.
  // Opening the mobile drawer forces the pill look too, so the close icon stays visible.
  const pill = scrolled || !isHome || open;
  const light = isHome && !scrolled && !open;

  // The chat preview has its own compact profile header in place of site-wide nav.
  if (pathname?.startsWith("/new")) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div
        className={`pointer-events-auto flex h-14 items-center justify-between gap-6 transition-[background-color,border-color,box-shadow,width,margin-top,border-radius] duration-300 ${
          pill
            ? "mt-4 w-[calc(100%-2rem)] max-w-[1200px] rounded-full border border-border bg-background/95 px-5 shadow-soft backdrop-blur-md sm:px-6"
            : "mt-0 w-full rounded-none border-transparent bg-transparent px-6 md:px-10"
        }`}
      >
        <Link
          href="/"
          className={`font-display text-lg font-bold tracking-tight transition-colors ${
            light ? "text-background" : "text-foreground"
          }`}
          onClick={() => setOpen(false)}
        >
          JAH<span className={light ? "text-mint" : "text-accent"}>.</span>MEDIA
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                light
                  ? "text-background/75 hover:text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-[0.97] ${
              light ? "bg-mint text-forest" : "bg-accent text-background"
            }`}
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
            className={`h-[1.5px] w-6 transition-transform duration-300 ease-[var(--ease-drawer)] ${
              light && !open ? "bg-background" : "bg-foreground"
            } ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-[1.5px] w-6 transition-transform duration-300 ease-[var(--ease-drawer)] ${
              light && !open ? "bg-background" : "bg-foreground"
            } ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
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
