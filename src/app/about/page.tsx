import type { Metadata } from "next";
import Link from "next/link";
import { Principles } from "@/components/principles";
import { HorizontalTimeline } from "@/components/horizontal-timeline";
import { Portrait } from "@/components/portrait";
import { Reveal } from "@/components/reveal";
import { CREDENTIALS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "A small coaching practice — six-month one-on-one engagements and keynotes on the cost of a career that only makes sense from the outside.",
};

/**
 * Facts about how the practice operates, deliberately not credentials — see
 * CREDENTIALS in content.ts, which renders separately and only once real
 * accreditations exist. Nothing here can be false.
 */
const PRACTICE_FACTS = [
  { label: "Twelve clients, capped", detail: "Deliberately, permanently" },
  { label: "Six months, then an ending", detail: "No open-ended retainers" },
  { label: "Video by default", detail: "Walking sessions if you're local" },
  { label: "Confidential, without exception", detail: "Nothing from a session is shared or written about" },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--rule)] py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--forest)]">
                About the practice
              </p>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="display mt-6 text-[clamp(2.5rem,6vw,4.5rem)]">
                Most people who find me are doing well. That&apos;s usually the
                problem.
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-9 max-w-2xl space-y-5 text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-base">
                <p>
                  They&apos;re competent, promoted, well-reviewed, and quietly
                  aware that the next ten years look exactly like the last
                  three. Nothing is wrong enough to act on. That&apos;s
                  precisely what makes it hard to leave.
                </p>
                <p>
                  I coach people through the decisions that don&apos;t have a
                  spreadsheet answer — a pivot, a first leadership role, the
                  reckoning that tends to arrive around a birthday. Six months,
                  twenty-four sessions, a defined ending. Then you get on with
                  it without me.
                </p>
                <p>
                  I was on the other side of this once, several years into a
                  career I was good at and had stopped caring about. It took a
                  stranger asking one well-aimed question to unstick it. This
                  practice is my attempt to be that stranger, more reliably.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Renders only once a real photograph exists. */}
          <div className="md:col-span-5">
            <Portrait className="aspect-[4/5] w-full" sizes="(min-width: 768px) 38vw, 90vw" />
          </div>
        </div>
      </section>

      <Principles />

      <HorizontalTimeline />

      {CREDENTIALS.length > 0 && (
        <section
          aria-labelledby="credentials-heading"
          className="border-t border-[var(--rule)] py-24 sm:py-28"
        >
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <h2 id="credentials-heading" className="display text-3xl sm:text-4xl">
                Training and accreditation
              </h2>
            </Reveal>
            <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {CREDENTIALS.map((item, i) => (
                <Reveal key={item.label} delay={i}>
                  <div className="border-t border-[var(--ink)] pt-4">
                    <dt className="text-base font-medium">{item.label}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {item.detail}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="border-t border-[var(--rule)] py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="display text-3xl sm:text-4xl">How the practice runs</h2>
          </Reveal>
          <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PRACTICE_FACTS.map((item, i) => (
              <Reveal key={item.label} delay={i}>
                <div className="border-t border-[var(--ink)] pt-4">
                  <dt className="text-base font-medium">{item.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {item.detail}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={2}>
            <p className="mt-14 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
              {SITE.bookingWindow}{" "}
              <Link
                href="/contact"
                className="border-b border-[var(--ink)] pb-0.5 text-[var(--ink)] transition-colors hover:border-[var(--forest)] hover:text-[var(--forest)]"
              >
                The intro call is thirty minutes and free
              </Link>
              , and about a third of them end with me pointing you somewhere
              else.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
