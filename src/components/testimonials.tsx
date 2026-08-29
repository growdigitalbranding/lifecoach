import { TESTIMONIALS, type Testimonial } from "@/lib/content";

/**
 * Renders nothing at all when there are no testimonials.
 *
 * That is the important behaviour. The alternative — shipping plausible
 * placeholder quotes — would attach invented endorsements to a real practice,
 * and an empty section is merely missing where a fabricated one is dishonest.
 */
export function Testimonials({
  service,
  heading = "What people say",
  className = "",
}: {
  /** Filter to one service's quotes; omit for the general set. */
  service?: Testimonial["service"];
  heading?: string;
  className?: string;
}) {
  const quotes = service
    ? TESTIMONIALS.filter((t) => t.service === service)
    : TESTIMONIALS;

  if (quotes.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className={className}>
      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="testimonials-heading"
          className="text-xs uppercase tracking-[0.28em] text-[var(--forest)]"
        >
          {heading}
        </h2>
        <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.slice(0, 3).map((quote) => (
            <li key={quote.name} className="border-t border-[var(--ink)] pt-6">
              <blockquote className="display text-xl leading-[1.25] sm:text-2xl">
                &ldquo;{quote.quote}&rdquo;
              </blockquote>
              <p className="mt-5 text-sm text-[var(--muted)]">
                <span className="font-medium text-[var(--ink)]">{quote.name}</span>
                {" — "}
                {quote.role}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
