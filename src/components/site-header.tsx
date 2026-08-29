"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { BOOKING_URL, NAV, SITE } from "@/lib/content";

/**
 * Site chrome: navigation, page scroll progress, and a header that gets out of
 * the way while you read.
 *
 * The progress bar is the one piece of persistent motion on the site. It earns
 * that because these are long pages and it answers a question the reader
 * actually has — how much of this is left — with a single hairline.
 */
/**
 * About lives at the site root, so a plain `startsWith` would mark it active on
 * every page. Only the root route needs an exact match; the rest have children
 * (a journal article is still "Journal").
 */
function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress, scrollY } = useScroll();
  // Spring the progress so it glides rather than stepping with each wheel tick.
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide on the way down, reveal the moment the reader scrolls back up —
    // the gesture that means "I want the controls".
    if (menuOpen) return;
    setHidden(latest > previous && latest > 160);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--rule)] bg-[var(--bone)]/85 backdrop-blur-md"
      animate={{ y: hidden && !reduced ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="display text-lg tracking-[-0.02em]"
          onClick={() => setMenuOpen(false)}
        >
          {SITE.name}
          <span className="ml-2 hidden text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] sm:inline">
            {SITE.role}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="relative py-1 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                  >
                    {active && (
                      // A single shared element slides between items instead of
                      // each link fading its own underline in and out.
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-0 h-px w-full bg-[var(--forest)]"
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    <span className={active ? "text-[var(--ink)]" : undefined}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/*
          A persistent call to action. These are long, scroll-driven pages, and
          a reader who decides at 70% depth previously had to hunt for an
          inline text link. Styled solid so it does not read as a sixth nav
          item, and it rides the existing hide-on-scroll behaviour — so it
          comes back the instant someone scrolls up to look for it.
        */}
        <a
          href={BOOKING_URL || "/contact"}
          {...(BOOKING_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="hidden bg-[var(--forest)] px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[var(--on-forest)] transition-opacity hover:opacity-88 md:inline-block"
        >
          Book an intro call
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="text-sm uppercase tracking-[0.18em] md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Page scroll progress. */}
      <motion.div
        className="h-px origin-left bg-[var(--forest)]"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            className="overflow-hidden border-t border-[var(--rule)] md:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="px-6 py-4">
              {NAV.map((item) => (
                <li key={item.href} className="border-b border-[var(--rule)] last:border-0">
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="block py-3 text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={BOOKING_URL || "/contact"}
                  {...(BOOKING_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMenuOpen(false)}
                  className="block bg-[var(--forest)] px-5 py-3 text-center text-xs uppercase tracking-[0.16em] text-[var(--on-forest)]"
                >
                  Book an intro call
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
