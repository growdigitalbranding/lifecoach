import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What the contact form collects, where it goes, how long it is kept, and how to have it deleted.",
};

/**
 * DRAFT — have this reviewed before launch.
 *
 * This describes what the code actually does today, which is the right
 * starting point and is not the same thing as legal advice. Obligations vary
 * by jurisdiction, and a UK or EU practice will need to name a lawful basis
 * and, depending on volume, more besides. The one thing worse than no privacy
 * notice is one that describes handling you do not actually do.
 */
const SECTIONS = [
  {
    h: "What this site collects",
    p: [
      "Only what you type into the contact form: your name, your email address, which service you are asking about, and your message. Nothing else.",
      "There are no analytics, no advertising pixels, no session recording and no third-party embeds. The site sets no cookies, so there is no cookie banner to dismiss.",
    ],
  },
  {
    h: "Where it goes",
    p: [
      "The form sends one email to the practice. It is delivered by Resend, an email provider, which processes the message in order to deliver it. It is not added to a mailing list, and there is no mailing list to be added to.",
      "Your message is not stored in a database by this website.",
    ],
  },
  {
    h: "How long it is kept",
    p: [
      "Enquiries that do not become client relationships are deleted within twelve months. If we start working together, records are kept for as long as the professional and tax obligations of the engagement require, and are covered by the coaching agreement rather than this notice.",
    ],
  },
  {
    h: "Confidentiality",
    p: [
      "Nothing you write in the contact form, and nothing said in a session, is shared, quoted, published or used in a talk — including in anonymised form — without your explicit written agreement.",
      "The exceptions are the ones any coach is bound by: a serious risk of harm to you or someone else, or a legal requirement to disclose.",
    ],
  },
  {
    h: "Your choices",
    p: [
      "You can ask what is held about you, ask for it to be corrected, or ask for it to be deleted. Email the address below and it will be done, with confirmation, and you do not need to give a reason.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--forest)]">Privacy</p>
      <h1 className="display mt-6 text-[clamp(2.25rem,5.5vw,3.75rem)]">
        What happens to what you write.
      </h1>
      <p className="mt-8 text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-base">
        The contact form invites you to describe something genuinely personal.
        This page says plainly where those words go. It is short because the
        site does very little with them.
      </p>

      {SECTIONS.map((section) => (
        <section key={section.h} className="mt-12">
          <h2 className="display text-2xl">{section.h}</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
            {section.p.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-12 border-t border-[var(--ink)] pt-8">
        <h2 className="display text-2xl">Getting in touch about this</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
          Email{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="border-b border-[var(--ink)] pb-0.5 transition-colors hover:border-[var(--forest)] hover:text-[var(--forest)]"
          >
            {SITE.email}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
