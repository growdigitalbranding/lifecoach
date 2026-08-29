import Link from "next/link";
import { NAV, SITE } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--forest)] text-[var(--on-forest)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="display text-4xl sm:text-5xl">{SITE.tagline}</p>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[var(--on-forest-muted)]">
              {SITE.bookingWindow}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 border-b border-[var(--on-forest-muted)] pb-1 text-sm transition-colors hover:border-[var(--on-forest)] hover:text-[var(--on-forest)]"
            >
              Start with an intro call
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="text-[11px] uppercase tracking-[0.22em] text-[var(--on-forest-muted)]">Pages</h2>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--on-forest-muted)] transition-colors hover:text-[var(--on-forest)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-[11px] uppercase tracking-[0.22em] text-[var(--on-forest-muted)]">
              Direct
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-[var(--on-forest-muted)]">
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-[var(--on-forest)]">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}
                  className="transition-colors hover:text-[var(--on-forest)]"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="pt-2 text-[var(--on-forest-muted)]">{SITE.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--on-forest-muted)]/40 pt-8 text-xs text-[var(--on-forest-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Coaching is not a substitute for therapy
            or medical care.
          </p>
          <Link
            href="/privacy"
            className="underline-offset-4 transition-colors hover:text-[var(--on-forest)] hover:underline"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
