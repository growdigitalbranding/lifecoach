import Image from "next/image";
import { PORTRAIT } from "@/lib/content";

/**
 * The photograph, when there is one.
 *
 * Returns null while `PORTRAIT` is unset, so the hero keeps its generative
 * field and nothing renders as a broken or empty frame. The moment a real
 * image is dropped into /public and named in content.ts, it takes this space.
 */
export function Portrait({
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 34vw, 80vw",
}: {
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!PORTRAIT) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={PORTRAIT.src}
        alt={PORTRAIT.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
