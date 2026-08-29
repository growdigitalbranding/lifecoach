import Link from "next/link";
import { NAV } from "@/lib/content";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-32 sm:py-40">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--clay)]">404</p>
      <h1 className="display mt-6 max-w-2xl text-[clamp(2.5rem,6vw,4.5rem)]">
        That page isn&apos;t here.
      </h1>
      <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[var(--ink-soft)]">
        Either it moved or the link was wrong. Everything on the site is one of
        these five:
      </p>
      <ul className="mt-10 border-t border-[var(--rule)]">
        {NAV.map((item) => (
          <li key={item.href} className="border-b border-[var(--rule)]">
            <Link
              href={item.href}
              className="block py-4 text-lg transition-colors hover:text-[var(--clay)]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
