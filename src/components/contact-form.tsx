"use client";

import { useActionState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { submitEnquiry, type EnquiryState } from "@/app/contact/actions";

const INITIAL: EnquiryState = { status: "idle" };

const FIELD =
  "w-full border-b border-[var(--rule)] bg-transparent py-3 text-[15px] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--forest)]";

/**
 * The conversion page gets the least motion on the site.
 *
 * Someone filling this in has already decided. Anything that delays, distracts
 * from, or animates the path to "send" is a cost with no matching benefit. The
 * only movement here is functional: errors slide in so you notice them, and the
 * form swaps for a confirmation so it's unambiguous that something happened.
 *
 * The form posts to a server action, so it also works with JavaScript disabled.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, INITIAL);
  const reduced = useReducedMotion();
  const duration = reduced ? 0 : 0.3;

  if (state.status === "sent") {
    return (
      <motion.div
        data-reveal
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
        className="border border-[var(--ink)] p-8"
        role="status"
      >
        <h2 className="display text-3xl">Thank you — it arrived.</h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--ink-soft)]">
          {state.message}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-8"
      noValidate
      // Uncontrolled inputs ignore a changed `defaultValue`; re-keying the form
      // on each attempt is what makes the echoed values actually appear.
      key={state.status === "error" ? "retry" : "fresh"}
    >
      <AnimatePresence>
        {state.status === "error" && state.message && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            className="border-l-2 border-[var(--forest)] bg-[var(--forest)]/5 py-3 pl-4 text-sm text-[var(--forest)]"
          >
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>

      <Field label="Your name" error={state.fieldErrors?.name} duration={duration}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          className={FIELD}
        />
      </Field>

      <Field label="Email" error={state.fieldErrors?.email} duration={duration}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          className={FIELD}
        />
      </Field>

      <Field label="What's this about?" error={state.fieldErrors?.intent} duration={duration}>
        <select
          id="intent"
          name="intent"
          defaultValue={state.values?.intent ?? "coaching"}
          className={FIELD}
        >
          <option value="coaching">One-on-one coaching</option>
          <option value="speaking">Keynote speaking</option>
          <option value="other">Something else</option>
        </select>
      </Field>

      <Field
        label="What's going on?"
        hint="A few sentences is plenty. There's no right way to write this."
        error={state.fieldErrors?.message}
        duration={duration}
        note="Nothing you write here is shared, quoted, or used in a talk."
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={state.values?.message}
          className={`${FIELD} resize-y`}
        />
      </Field>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-[13px] text-[var(--muted)]">
        What happens to what you write here is set out in the{" "}
        <a
          href="/privacy"
          className="border-b border-[var(--rule)] pb-0.5 transition-colors hover:border-[var(--forest)] hover:text-[var(--forest)]"
        >
          privacy notice
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex items-center gap-3 bg-[var(--forest)] px-7 py-4 text-sm uppercase tracking-[0.18em] text-[var(--on-forest)] transition-opacity hover:opacity-88 disabled:opacity-60"
      >
        {pending ? "Sending" : "Send it"}
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
        >
          →
        </span>
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  note,
  error,
  duration,
  children,
}: {
  label: string;
  hint?: string;
  /**
   * Reassurance shown *under* the control, where `hint` sits above it. The
   * confidentiality promise used to live only in the fourth FAQ section; the
   * moment that anxiety peaks is with a cursor in the message box.
   */
  note?: string;
  error?: string;
  duration: number;
  children: React.ReactElement<{ id?: string }>;
}) {
  const id = children.props.id;
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        {label}
      </label>
      {hint && <p className="mt-1 text-[13px] text-[var(--muted)]">{hint}</p>}
      <div className="mt-2">{children}</div>
      {note && <p className="mt-2 text-[13px] text-[var(--forest)]">{note}</p>}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration }}
            className="overflow-hidden text-[13px] text-[var(--forest)]"
          >
            <span className="block pt-2">{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
