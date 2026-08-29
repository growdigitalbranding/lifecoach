import type { Metadata } from "next";
import Link from "next/link";
import { AboutHero } from "@/components/about-hero";
import { Testimonials } from "@/components/testimonials";
import { Reveal } from "@/components/reveal";
import { BOOKING_URL, SERVICES, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.tagline,
};

/**
 * The front door.
 *
 * This used to be the About page — hero, then five hundred words of biography
 * before any offer or proof appeared. About pages convert well for people who
 * already trust you; as a homepage it asked a stranger to read a career story
 * before finding out what was sold or what it cost.
 *
 * The order here follows the questions a coaching buyer actually asks: is this
 * for me, who says so, what exactly is it and what does it cost, what is the
 * smallest step I can take. The full story now lives at /about for the people
 * who want it.
 */
export default function HomePage() {
  return (
    <>
      <AboutHero />

      {/* 1 — is this for me? */}
      <section className="border-t border-[var(--rule)] py-24 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--forest)]">
              Who this is for
            </p>
          </Reveal>
          <div className="md:col-span-8">
            <Reveal>
              <p className="display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.15]">
                Most people who find me are doing well. That&apos;s usually the
                problem.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-base">
                Competent, promoted, well-reviewed, and quietly aware that the
                next ten years look exactly like the last three. Nothing is
                wrong enough to act on — which is precisely what makes it hard
                to leave.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-sm font-medium transition-colors hover:border-[var(--forest)] hover:text-[var(--forest)]"
              >
                More about how I work
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2 — who says so? Renders nothing until real quotes exist. */}
      <Testimonials className="border-t border-[var(--rule)] py-24 sm:py-28" />

      {/* 3 — what is it, and what does it cost? Prices up front, deliberately. */}
      <section
        aria-labelledby="services-heading"
        className="border-t border-[var(--rule)] bg-[var(--bone-deep)] py-24 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--forest)]">
              Two things, done properly
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 id="services-heading" className="display mt-4 max-w-2xl text-4xl sm:text-5xl">
              What I actually do
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
            {SERVICES.map((service, i) => {
              const investment = service.meta.find((m) => m.label === "Investment");
              return (
                <Reveal key={service.slug} delay={i}>
                  <div className="flex h-full flex-col border-t border-[var(--ink)] pt-6">
                    <h3 className="display display--nobreak text-3xl">{service.title}</h3>
                    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {service.summary}
                    </p>
                    {investment && (
                      <p className="mt-6 text-sm font-medium">{investment.value}</p>
                    )}
                    <Link
                      href="/services"
                      className="mt-4 inline-flex items-center gap-2 self-start border-b border-[var(--ink)] pb-1 text-sm transition-colors hover:border-[var(--forest)] hover:text-[var(--forest)]"
                    >
                      What&apos;s involved
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 — the smallest possible next step. */}
      <section className="border-t border-[var(--rule)] py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="display max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">
              Start with a conversation that costs you nothing.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--ink-soft)]">
              Thirty minutes, free, genuinely no pitch. About a third of these
              end with me recommending someone else — a therapist, a career
              counsellor, a different coach. That&apos;s a good outcome.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={BOOKING_URL || "/contact"}
                {...(BOOKING_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-3 bg-[var(--forest)] px-7 py-4 text-sm uppercase tracking-[0.18em] text-[var(--on-forest)] transition-opacity hover:opacity-88"
              >
                Book an intro call
                <span aria-hidden="true">→</span>
              </a>
              {BOOKING_URL && (
                <Link
                  href="/contact"
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--forest)]"
                >
                  Or write to me first
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
