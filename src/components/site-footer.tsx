"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { footerLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-14 text-center">
      <div className="container-page flex flex-col items-center">
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={2} />
        </button>

        <p className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} JAH Media
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm font-semibold text-foreground">
          {footerLinks.map((link, i) => (
            <span key={link.href} className="flex items-center gap-2">
              {i > 0 ? <span className="text-muted">·</span> : null}
              <Link href={link.href} className="transition-colors hover:text-accent">
                {link.label}
              </Link>
            </span>
          ))}
          <span className="flex items-center gap-2">
            <span className="text-muted">·</span>
            <Link href="/contact" className="transition-colors hover:text-accent">
              Contact
            </Link>
          </span>
        </div>

        <a
          href={`mailto:${site.email}`}
          className="mt-4 text-xs text-muted transition-colors hover:text-foreground"
        >
          {site.email}
        </a>
      </div>
    </footer>
  );
}
