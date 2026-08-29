import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE, siteUrl } from "@/lib/content";

/**
 * `next/font` self-hosts both faces at build time, so the site makes no
 * request to Google and needs no external origin in the CSP.
 */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.tagline,
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.tagline,
    type: "website",
    siteName: SITE.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // No `data-scroll-behavior` here on purpose: Lenis owns scroll position,
    // and letting Next also manipulate scroll-behaviour on navigation would
    // fight it. See src/components/smooth-scroll.tsx.
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body>
        {/*
          Entrance animations render their hidden state on the server. With
          JavaScript off nothing would ever animate them in, so force every
          animated element to its resting state — the page then reads as plain,
          complete HTML. An `!important` rule beats Motion's inline styles.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <SmoothScroll>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-[var(--paper)]"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="pt-16">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
