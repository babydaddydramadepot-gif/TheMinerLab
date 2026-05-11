import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { SlidersHorizontal, Cable, Boxes, ArrowRight, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop ASIC Miners & Mining Hardware — The Miner Lab" },
      { name: "description", content: "Browse tested ASIC miners, power supplies, Loki kits and accessories. Antminer S19 Pro, S19 XP, S19j Pro, S17 Pro in stock." },
      { property: "og:title", content: "Shop Mining Hardware — The Miner Lab" },
      { property: "og:description", content: "ASIC miners, power supplies, Loki kits, accessories and wholesale pallet quantities." },
    ],
  }),
  component: ProductsPage,
});

const CATEGORIES = [
  { id: "all", label: "All Products", q: undefined },
  { id: "asic", label: "ASIC Miners", q: "product_type:ASIC OR title:antminer" },
  { id: "psu", label: "Power Supplies", q: "product_type:PSU OR title:APW OR title:power" },
  { id: "loki", label: "Loki Kits", q: "title:loki OR product_type:Loki" },
  { id: "accessories", label: "Accessories", q: "product_type:Accessories OR title:fan OR title:cable" },
  { id: "wholesale", label: "Wholesale", q: "tag:wholesale OR title:pallet OR title:bulk" },
];

const HASHRATES = ["88TH", "92TH", "96TH", "100TH", "110TH", "140TH"];

function ProductsPage() {
  const [cat, setCat] = useState("all");
  const [hashrate, setHashrate] = useState<string | null>(null);
  const [sort, setSort] = useState("featured");

  const baseQuery = CATEGORIES.find((c) => c.id === cat)?.q;
  const queryParts = [baseQuery, hashrate ? `title:*${hashrate}*` : null].filter(Boolean);
  const query = queryParts.length ? queryParts.join(" AND ") : undefined;

  return (
    <div className="px-6 lg:px-10">
      <div className="mx-auto max-w-7xl pt-12 pb-24">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-xs tracking-widest uppercase text-primary">Catalog</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">All Products</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Tested ASIC miners, tuned systems, and supporting infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-8">
            <FilterGroup label="Category">
              <div className="flex flex-wrap lg:flex-col gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className={`text-left text-sm px-3 py-2 rounded-md border transition ${
                      cat === c.id
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-border bg-surface hover:border-primary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup label="Hashrate">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setHashrate(null)}
                  className={`text-xs px-3 py-1.5 rounded-md border ${
                    hashrate === null ? "border-primary/60 text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  Any
                </button>
                {HASHRATES.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHashrate(h)}
                    className={`text-xs px-3 py-1.5 rounded-md border font-mono ${
                      hashrate === h ? "border-primary/60 text-primary" : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup label="Sort">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title">Alphabetical</option>
              </select>
            </FilterGroup>
          </aside>

          {/* Grid */}
          <div>
            <div className="lg:hidden mb-5 flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" /> Filters above
            </div>
            {cat === "accessories" ? (
              <AccessoriesPlaceholder />
            ) : cat === "wholesale" ? (
              <WholesalePlaceholder />
            ) : (
              <ProductGrid query={query} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-3">{label}</h3>
      {children}
    </div>
  );
}

function PlaceholderShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-surface-elevated via-surface to-background px-8 py-20 lg:py-28 text-center">
      <div className="absolute inset-0 grid-bg opacity-[0.08] pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -translate-x-1/2 h-[360px] w-[360px] rounded-full blur-3xl animate-breathe pointer-events-none"
        style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--glow) 18%, transparent), transparent)" }}
      />
      <div className="relative max-w-xl mx-auto">{children}</div>
    </div>
  );
}

function AccessoriesPlaceholder() {
  return (
    <PlaceholderShell>
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 border border-primary/30 text-primary">
        <Cable className="h-6 w-6" />
      </div>
      <p className="mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-primary">Accessories</p>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        Accessories Coming Soon
      </h2>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Additional cables, fans, hashboards, and mining accessories are being added to inventory. Check back shortly or contact our team for specific parts.
      </p>
      <div className="mt-8">
        <Link
          to="/contact"
          className="btn-premium inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-border bg-surface-elevated text-sm font-semibold uppercase tracking-wider hover:border-primary/50"
        >
          Request a Part <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </PlaceholderShell>
  );
}

function WholesalePlaceholder() {
  return (
    <PlaceholderShell>
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 border border-primary/30 text-primary">
        <Boxes className="h-6 w-6" />
      </div>
      <p className="mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-primary">Wholesale</p>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        Need Wholesale Quantities?
      </h2>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        We supply pallet quantities and large-volume miner deployments for farms, resellers, and infrastructure operators. Every unit tested, serial-logged, and ready to deploy.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          to="/wholesale"
          className="btn-premium light-sweep inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider"
        >
          Contact for Wholesale Pricing <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/contact"
          className="btn-premium inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-border bg-surface-elevated text-sm font-semibold uppercase tracking-wider hover:border-primary/50"
        >
          <MessageSquare className="h-4 w-4" /> Talk to Sales
        </Link>
      </div>
    </PlaceholderShell>
  );
}
