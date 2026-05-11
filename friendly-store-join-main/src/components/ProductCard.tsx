import { Link } from "@tanstack/react-router";
import { ArrowRight, Cpu } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";

function tagValue(tags: string[] | undefined, prefix: string): string | null {
  if (!tags) return null;
  const t = tags.find((x) => x.toLowerCase().startsWith(prefix.toLowerCase() + ":"));
  return t ? t.split(":").slice(1).join(":") : null;
}

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const hashrate = tagValue(node.tags, "hashrate");
  const efficiency = tagValue(node.tags, "efficiency");
  const algo = tagValue(node.tags, "algo");

  // One short spec line — prefer hashrate, fall back gracefully
  const specLine =
    hashrate && efficiency
      ? `${hashrate} · ${efficiency}`
      : hashrate || efficiency || algo || node.productType || null;

  return (
    <Link
      to="/product/$handle"
      params={{ handle: node.handle }}
      className="group relative flex flex-col rounded-2xl glass overflow-hidden border border-border/60 hover:border-primary/40 transition-[transform,border-color] duration-500 ease-out will-change-transform hover:-translate-y-1"
    >
      {/* IMAGE — larger, generous whitespace, no overlay specs */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-surface-elevated via-surface to-background">
        <div className="absolute inset-0 grid-bg opacity-20" />
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="h-12 w-12 text-muted-foreground/20" />
          </div>
        )}

        {/* badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
          {node.productType ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium uppercase tracking-widest bg-background/70 backdrop-blur border border-border/60 text-foreground/80">
              {node.productType}
            </span>
          ) : <span />}
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium uppercase tracking-widest bg-primary/10 backdrop-blur border border-primary/30 text-primary">
            Tested Surplus
          </span>
        </div>
      </div>

      {/* BODY — clean hierarchy, lots of breathing room */}
      <div className="flex flex-col flex-1 p-7">
        <h3 className="font-display text-xl font-semibold leading-tight tracking-tight">
          {node.title}
        </h3>

        {specLine && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {specLine}
          </p>
        )}

        <div className="mt-8 pt-6 border-t border-border/50 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              From
            </p>
            <p className="font-display text-2xl font-semibold text-foreground mt-1">
              ${parseFloat(price.amount).toLocaleString()}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/70 group-hover:text-primary transition-colors">
            View Product
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
