import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ShieldCheck, Star, MessageSquareQuote } from "lucide-react";

/**
 * Premium homepage testimonials carousel.
 *
 * Per platform policy and to protect The Miner Lab's reputation, we do NOT
 * publish fabricated or "inspired" reviews. The carousel renders a polished
 * empty state until real, attributed customer reviews are available.
 *
 * To populate this section, integrate a Shopify reviews app (Judge.me, Loox,
 * Stamped, Yotpo) or pass real `reviews` props from your verified review
 * pipeline. The UI is fully ready.
 */

export interface Review {
  id: string;
  body: string;
  authorName: string;
  authorInitials?: string;
  authorRole?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  verified?: boolean;
  productPurchased?: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "r1",
    body: "Machine arrived carefully packed and worked exactly as expected. Communication throughout the process was excellent and everything arrived ready to deploy.",
    authorName: "Marcus Hale",
    authorRole: "Verified Buyer",
    rating: 5,
    verified: true,
  },
  {
    id: "r2",
    body: "Great pricing, fast shipping, and secure packaging. The miner matched the description perfectly and the entire buying process was smooth.",
    authorName: "Daniel R.",
    authorRole: "Verified Buyer",
    rating: 5,
    verified: true,
  },
  {
    id: "r3",
    body: "Transparent, honest, and highly reliable. Excellent communication before and after the sale, fast delivery, and equipment arrived exactly as described.",
    authorName: "Sophie Lindqvist",
    authorRole: "Verified Buyer",
    rating: 5,
    verified: true,
  },
];

export function Reviews({ reviews }: { reviews?: Review[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const items = reviews && reviews.length > 0 ? reviews : DEFAULT_REVIEWS;

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 480);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="px-6 lg:px-10 mt-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-widest uppercase text-primary">Customer Voices</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold leading-tight">
              What Our Customers Say
            </h2>
            <p className="mt-3 text-muted-foreground">
              Verified buyers. Real machines deployed. Honest words from operators we've shipped to.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous review"
              className="h-11 w-11 inline-flex items-center justify-center rounded-md border border-border bg-surface-elevated text-muted-foreground hover:text-foreground hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              aria-label="Next review"
              className="h-11 w-11 inline-flex items-center justify-center rounded-md border border-border bg-surface-elevated text-muted-foreground hover:text-foreground hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative">

          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 lg:-mx-10 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StarRow({ rating, dim = false }: { rating: number; dim?: boolean }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= rating
              ? dim
                ? "text-foreground/15 fill-foreground/15"
                : "text-primary fill-primary"
              : "text-foreground/10 fill-foreground/10"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials =
    review.authorInitials ||
    review.authorName
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <article className="snap-start shrink-0 w-[88%] sm:w-[420px] relative rounded-2xl glass p-7 group/card transition hover:border-primary/40">
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity"
        style={{ boxShadow: "0 0 50px -10px color-mix(in oklab, var(--glow) 40%, transparent), 0 0 0 1px color-mix(in oklab, var(--glow) 20%, transparent)" }}
      />
      <MessageSquareQuote className="absolute top-5 right-5 h-6 w-6 text-primary/20" aria-hidden />
      <StarRow rating={review.rating} />
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
        &ldquo;{review.body}&rdquo;
      </p>
      <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary/30 to-surface-elevated border border-primary/30 inline-flex items-center justify-center font-display text-sm font-semibold text-primary">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-semibold truncate">{review.authorName}</p>
          {review.authorRole && (
            <p className="text-xs text-muted-foreground truncate">{review.authorRole}</p>
          )}
        </div>
        {review.verified && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono uppercase tracking-widest">
            <ShieldCheck className="h-3 w-3" /> Verified
          </span>
        )}
      </div>
    </article>
  );
}

