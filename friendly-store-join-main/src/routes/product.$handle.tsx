import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  Loader2,
  ShieldCheck,
  Truck,
  Zap,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Boxes,
  Gauge,
  Thermometer,
  Volume2,
  Package,
  Wrench,
  ClipboardCheck,
} from "lucide-react";
import { fetchProductByHandle, fetchProducts } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { ProductCard } from "@/components/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
});

const OS_OPTIONS = ["Vnish OS", "Braiins OS"] as const;

function tagValue(tags: string[] | undefined, prefix: string): string | null {
  if (!tags) return null;
  const t = tags.find((x) => x.toLowerCase().startsWith(prefix.toLowerCase() + ":"));
  return t ? t.split(":").slice(1).join(":") : null;
}

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });
  const { data: related } = useQuery({
    queryKey: ["related", product?.node.productType ?? ""],
    queryFn: () =>
      fetchProducts(
        product?.node.productType ? `product_type:${product.node.productType}` : undefined,
        4,
      ),
    enabled: !!product,
  });

  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  const [os, setOs] = useState<string>(OS_OPTIONS[0]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [imgIdx, setImgIdx] = useState(0);

  const isOsLikeOption = (name: string) =>
    /firmware|^os$|operating system|tuning/i.test(name);

  const variant = useMemo(() => {
    if (!product) return null;
    const variants = product.node.variants.edges;
    const match = variants.find((v) =>
      v.node.selectedOptions.every((o) =>
        isOsLikeOption(o.name) ? true : selected[o.name] ? selected[o.name] === o.value : true,
      ),
    );
    return (match ?? variants[0])?.node ?? null;
  }, [product, selected]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading…
      </div>
    );
  }

  if (!product) {
    throw notFound();
  }

  const node = product.node;
  const images = node.images.edges;
  const heroImg = images[imgIdx]?.node ?? images[0]?.node;

  // Tag-driven specs (with sensible fallbacks so all miner pages look complete)
  const hashrate = tagValue(node.tags, "hashrate") || "—";
  const power = tagValue(node.tags, "power") || "3250W ± 5%";
  const efficiency = tagValue(node.tags, "efficiency") || "—";
  const algo = tagValue(node.tags, "algo") || "SHA-256";
  const noise = tagValue(node.tags, "noise") || "75 dB";
  const cooling = tagValue(node.tags, "cooling") || "Air-cooled · 4× fans";
  const tempRange = tagValue(node.tags, "temp") || "5°C – 40°C";
  const psuRec = tagValue(node.tags, "psu") || "APW12 / 3000W+";

  const handleAdd = async () => {
    if (!variant) return;
    const baseOptions = (variant.selectedOptions || []).filter(
      (o) => !isOsLikeOption(o.name),
    );
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: [...baseOptions, { name: "Operating System", value: os }],
    });
  };

  return (
    <div className="px-6 lg:px-10">
      <div className="mx-auto max-w-7xl pt-10 pb-32">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2 text-border">/</span>
          <Link to="/products" className="hover:text-foreground">Products</Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-foreground">{node.title}</span>
        </nav>

        {/* HERO */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16">
          {/* Gallery */}
          <div>
            <div
              className="relative aspect-square rounded-2xl overflow-hidden border border-border/60 bg-gradient-to-br from-surface-elevated via-surface to-background"
            >
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl"
                style={{
                  boxShadow:
                    "0 0 120px -30px color-mix(in oklab, var(--glow) 35%, transparent)",
                }}
              />
              {heroImg ? (
                <img
                  src={heroImg.url}
                  alt={heroImg.altText || node.title}
                  className="relative h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                  <Cpu className="h-16 w-16 opacity-30" />
                </div>
              )}
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium uppercase tracking-widest bg-primary/10 backdrop-blur border border-primary/30 text-primary">
                Tested Surplus
              </span>
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2.5">
                {images.map((img, i) => (
                  <button
                    key={img.node.url}
                    onClick={() => setImgIdx(i)}
                    className={`aspect-square rounded-lg overflow-hidden border transition ${
                      i === imgIdx
                        ? "border-primary shadow-[0_0_0_1px_var(--primary)]"
                        : "border-border/60 hover:border-primary/40"
                    }`}
                  >
                    <img src={img.node.url} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:pt-2">
            {node.productType && (
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary">
                {node.productType}
              </p>
            )}
            <h1 className="mt-3 font-display text-3xl lg:text-[2.6rem] leading-[1.1] font-semibold tracking-tight">
              {node.title}
            </h1>

            {/* Quick stats */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground font-mono uppercase tracking-widest">
              <span><span className="text-foreground">{hashrate}</span> hashrate</span>
              <span className="text-border">•</span>
              <span><span className="text-foreground">{algo}</span></span>
              <span className="text-border">•</span>
              <span><span className="text-foreground">{efficiency}</span></span>
            </div>

            <div className="mt-7 flex items-baseline gap-3">
              <p className="font-display text-4xl font-semibold text-foreground">
                ${parseFloat(variant?.price.amount ?? node.priceRange.minVariantPrice.amount).toLocaleString()}
              </p>
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                {variant?.price.currencyCode ?? node.priceRange.minVariantPrice.currencyCode}
              </span>
            </div>

            {node.description && (
              <p className="mt-6 text-[15px] text-muted-foreground leading-relaxed max-w-prose">
                {node.description}
              </p>
            )}

            {/* Hashrate / variant options */}
            {node.options
              .filter((o) => o.values.length > 1 && !isOsLikeOption(o.name))
              .map((option) => (
                <div key={option.name} className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                      {option.name}
                    </h3>
                    {selected[option.name] && (
                      <span className="text-xs text-foreground font-mono">{selected[option.name]}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {option.values.map((v) => {
                      const active = selected[option.name] === v;
                      return (
                        <button
                          key={v}
                          onClick={() => setSelected((s) => ({ ...s, [option.name]: v }))}
                          className={`px-4 py-3.5 rounded-lg border text-sm font-medium transition ${
                            active
                              ? "border-primary text-primary bg-primary/10 shadow-[0_0_30px_-10px_var(--primary)]"
                              : "border-border bg-surface hover:border-primary/40 hover:bg-surface-elevated"
                          }`}
                        >
                          {v}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

            {/* OS selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">
                  Operating System
                </h3>
                <span className="text-xs text-foreground font-mono">{os}</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {OS_OPTIONS.map((v) => {
                  const active = os === v;
                  return (
                    <button
                      key={v}
                      onClick={() => setOs(v)}
                      className={`px-4 py-3.5 rounded-lg border text-sm font-medium transition ${
                        active
                          ? "border-primary text-primary bg-primary/10 shadow-[0_0_30px_-10px_var(--primary)]"
                          : "border-border bg-surface hover:border-primary/40 hover:bg-surface-elevated"
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2.5 text-[11px] text-muted-foreground">
                Same price on either OS — flashed and verified before shipping.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                disabled={isAdding || !variant?.availableForSale}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-[0.14em] btn-premium light-sweep disabled:opacity-50"
              >
                {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Cart"}
              </button>
              <Link
                to="/wholesale"
                className="sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-lg border border-border bg-surface-elevated text-sm font-semibold uppercase tracking-[0.14em] hover:border-primary/50 transition"
              >
                Request Wholesale Quote
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-8 grid grid-cols-2 gap-2.5">
              {[
                { icon: ShieldCheck, label: "Tested & verified" },
                { icon: Truck, label: "Insured US shipping" },
                { icon: Zap, label: "Tuned & ready" },
                { icon: Boxes, label: "Farm-pull inventory" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-surface/60 px-3.5 py-3 text-xs text-muted-foreground"
                >
                  <b.icon className="h-4 w-4 text-primary" /> {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BENCHMARKED & DEPLOYMENT READY */}
        <section className="mt-28 grid md:grid-cols-2 gap-5">
          <FeatureCard
            icon={ClipboardCheck}
            title="Benchmarked & Tested"
            points={[
              "Stress-tested under sustained load before shipment",
              "Firmware flashed, verified, and serial-logged",
              "Hashboards, fans, and PSU inspected per unit",
              "Performance benchmarks recorded and archived",
            ]}
          />
          <FeatureCard
            icon={Wrench}
            title="Deployment Ready"
            points={[
              "Tuned profiles for stable, long-term operation",
              "Configured for immediate pool connection",
              "Suitable for hosted facilities and home setups",
              "Built for serious miners and farm operators",
            ]}
          />
        </section>

        {/* SPECIFICATIONS */}
        <section className="mt-20">
          <SectionHeading
            eyebrow="Technical"
            title="Specifications"
            subtitle="Every unit is benchmarked and inspected before fulfillment."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <SpecCell icon={Gauge} label="Hashrate" value={hashrate} />
            <SpecCell icon={Zap} label="Power" value={power} />
            <SpecCell icon={Cpu} label="Algorithm" value={algo} />
            <SpecCell icon={ShieldCheck} label="Efficiency" value={efficiency} />
            <SpecCell icon={Volume2} label="Noise" value={noise} />
            <SpecCell icon={Wrench} label="Cooling" value={cooling} />
            <SpecCell icon={Thermometer} label="Operating Temp" value={tempRange} />
            <SpecCell icon={Package} label="Recommended PSU" value={psuRec} />
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <InfoPanel title="Included">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />1× Miner unit (tested & flashed)</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />Selected OS pre-installed (Vnish or Braiins)</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />Insured packaging and freight</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />Benchmark report on request</li>
              </ul>
            </InfoPanel>
            <InfoPanel title="Shipping & Warranty">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Insured domestic freight from US warehouses, typically 2–5 business days.
                30-day functional warranty on every unit. Bulk and pallet orders ship via
                LTL freight with tracking and signature confirmation.
              </p>
            </InfoPanel>
          </div>
        </section>

        {/* WHOLESALE / FARM CTA */}
        <section className="mt-20 relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-surface-elevated via-surface to-background p-8 lg:p-12">
          <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl"
            style={{
              boxShadow: "0 0 120px -40px color-mix(in oklab, var(--glow) 30%, transparent)",
            }}
          />
          <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary">
                Wholesale & Farm Orders
              </p>
              <h3 className="mt-3 font-display text-2xl lg:text-3xl font-semibold tracking-tight">
                Scaling an operation? Get pallet quantities at wholesale pricing.
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                Bulk surplus miners, farm-pull units, and pallet quantities of tested
                ASIC inventory available by request. Every unit serial-logged, benchmarked,
                and ready to deploy.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="/wholesale"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-[0.14em] btn-premium light-sweep"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-4 rounded-lg border border-border bg-surface/60 text-sm font-semibold uppercase tracking-[0.14em] hover:border-primary/50 transition"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            subtitle="Straight answers from our deployment team."
          />
          <Accordion type="single" collapsible className="rounded-2xl border border-border/60 bg-surface/40 divide-y divide-border/60">
            {FAQ.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-0 px-6">
                <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 pr-4">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Related */}
        {related && related.filter((r) => r.node.handle !== handle).length > 0 && (
          <section className="mt-24">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-2xl lg:text-3xl font-semibold tracking-tight">
                You may also consider
              </h2>
              <Link
                to="/products"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related
                .filter((r) => r.node.handle !== handle)
                .slice(0, 4)
                .map((r) => (
                  <ProductCard key={r.node.id} product={r} />
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

const FAQ = [
  {
    q: "Are these miners tested before shipping?",
    a: "Yes. Every unit is benchmarked under sustained load, fully inspected, and firmware-verified before it leaves our facility. We log serials, performance, and a test report on request.",
  },
  {
    q: "Are units new, used, or refurbished?",
    a: "Our inventory is professionally tested surplus — primarily farm-pull units and verified pre-owned hardware. Each one is inspected, cleaned, and re-flashed before shipment.",
  },
  {
    q: "Which operating system should I choose, Vnish OS or Braiins OS?",
    a: "Both are fully supported and identically priced. Vnish typically offers more granular tuning and autotune curves; Braiins is open-source with strong stability and pool integration. If you're unsure, Vnish OS is our default recommendation.",
  },
  {
    q: "Is a PSU included with the miner?",
    a: "Most listings ship miner-only. Compatible PSUs (APW12 / 3000W+) are available as add-ons — message us before checkout and we'll bundle pricing.",
  },
  {
    q: "Do you offer bulk or wholesale pricing?",
    a: "Yes. We supply pallet quantities and farm-scale orders with tiered pricing. Submit a wholesale quote request and our sales team will respond within one business day.",
  },
  {
    q: "What warranty do you offer?",
    a: "Every unit ships with a 30-day functional warranty covering hashrate stability and hardware faults under normal operating conditions.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl lg:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  points,
}: {
  icon: React.ElementType;
  title: string;
  points: string[];
}) {
  return (
    <div className="relative rounded-2xl border border-border/60 bg-surface/60 p-7 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />
      <div className="relative">
        <div className="inline-flex items-center justify-center h-11 w-11 rounded-lg bg-primary/10 border border-primary/30 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
        <ul className="mt-4 space-y-2.5">
          {points.map((p) => (
            <li key={p} className="flex gap-2.5 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SpecCell({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface/60 p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{label}</span>
      </div>
      <p className="mt-2 font-display text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}

function InfoPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface/60 p-6">
      <h3 className="font-display font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
