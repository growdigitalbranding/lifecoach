import type { NextConfig } from "next";

/**
 * Content-Security-Policy for a statically prerendered marketing site.
 *
 * There is no per-request nonce here, and that is a deliberate change from how
 * this code ran when it lived inside a CRM. A nonce has to be minted per request
 * and stamped in while the page renders, which forces every page to render on
 * demand. These five pages fetch nothing and change a few times a year, so the
 * trade was backwards: paying for dynamic rendering to protect a page with no
 * injection surface.
 *
 * `'unsafe-inline'` covers Next's inline bootstrap on prerendered HTML. What
 * makes that acceptable here specifically:
 *  - Nothing on the site renders user-supplied HTML. Every string comes from
 *    src/lib/content.ts, and the only `dangerouslySetInnerHTML` is FAQ JSON-LD
 *    built from that same module.
 *  - The contact form echoes submitted values back only as React attribute
 *    values, which are escaped.
 *  - There is no auth, no session, and no cookie worth stealing.
 *
 * If user-generated content ever reaches a page, switch back: reinstate the
 * nonce in a proxy and let these routes render per request.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  // next/font self-hosts both faces, so no external font origin is needed.
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
