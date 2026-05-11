import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Boxes, Package, ShieldCheck, Truck } from "lucide-react";
import warehouseImg from "@/assets/wholesale-warehouse.jpg";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale Mining Hardware — The Miner Lab" },
      { name: "description", content: "Bulk ASIC miners, pallet quantities and mining farm hardware. Request a wholesale quote on S19 Pro, S19 XP, S19j Pro and S17 Pro." },
      { property: "og:title", content: "Wholesale Mining Hardware — The Miner Lab" },
      { property: "og:description", content: "Pallet quantities, mining farm setups and operator-tier pricing." },
      { property: "og:image", content: warehouseImg },
    ],
  }),
  component: WholesalePage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  product: z.string().trim().min(1, "Select a product").max(120),
  quantity: z.string().trim().min(1, "Quantity required").max(50),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const INVENTORY = [
  { model: "Antminer S19 Pro", th: "110 TH/s", power: "3250W", note: "Tested · pallet ready" },
  { model: "Antminer S19 XP", th: "140 TH/s", power: "3010W", note: "Premium efficiency" },
  { model: "Antminer S19j Pro", th: "100 TH/s", power: "2950W", note: "Workhorse fleet" },
  { model: "Antminer S17 Pro", th: "53 TH/s", power: "2094W", note: "Budget hashrate" },
];

function WholesalePage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success("Quote request received", { description: "Our wholesale team will reply within 1 business day." });
    e.currentTarget.reset();
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={warehouseImg} alt="Industrial warehouse with mining hardware pallets" loading="lazy" className="h-full w-full object-cover opacity-40" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>
        <div className="px-6 lg:px-10 pt-20 pb-24">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-xs tracking-widest uppercase text-primary">Wholesale</p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl font-semibold leading-tight max-w-3xl">
              Pallet quantities,<br /><span className="text-gradient">facility-ready hardware.</span>
            </h1>
            <p className="mt-5 text-muted-foreground max-w-xl text-lg">
              Operator-tier pricing on bulk Antminer S19 Pro, S19 XP, S19j Pro and S17 Pro. Tested, tuned and freighted to your facility.
            </p>
          </div>
        </div>
      </section>

      <div className="px-6 lg:px-10">
        <div className="mx-auto max-w-7xl pb-24">
          {/* Inventory */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-semibold mb-6">Available wholesale inventory</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {INVENTORY.map((i) => (
                <div key={i.model} className="rounded-xl border border-border bg-surface p-6">
                  <Package className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 font-display font-semibold">{i.model}</h3>
                  <div className="mt-2 font-mono text-xs text-muted-foreground space-y-0.5">
                    <p>{i.th}</p>
                    <p>{i.power}</p>
                  </div>
                  <p className="mt-3 text-xs text-primary">{i.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust */}
          <div className="grid lg:grid-cols-3 gap-4 mb-16">
            {[
              { icon: ShieldCheck, t: "Verified hardware", d: "Hashboard, thermal and PSU pass on every unit." },
              { icon: Boxes, t: "Pallet logistics", d: "Bulk freight scheduling and consolidated shipments." },
              { icon: Truck, t: "USA freight", d: "Insured domestic delivery, international on request." },
            ].map((b) => (
              <div key={b.t} className="rounded-xl border border-border bg-surface p-7">
                <b.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-display font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-surface/60 p-8 lg:p-12">
            <h2 className="font-display text-3xl font-semibold">Request a wholesale quote</h2>
            <p className="mt-2 text-sm text-muted-foreground">Operator-tier pricing. Reply within 1 business day.</p>

            <form onSubmit={onSubmit} className="mt-8 grid sm:grid-cols-2 gap-5">
              <Field name="name" label="Full name" required />
              <Field name="company" label="Company" />
              <Field name="email" label="Email" type="email" required />
              <Field name="phone" label="Phone" />
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Product *</label>
                <select name="product" required className="mt-1.5 w-full bg-surface-elevated border border-border rounded-md px-3 py-2.5 text-sm">
                  <option value="">Select…</option>
                  <option>Antminer S19 Pro</option>
                  <option>Antminer S19 XP</option>
                  <option>Antminer S19j Pro</option>
                  <option>Antminer S17 Pro</option>
                  <option>Mixed pallet</option>
                </select>
              </div>
              <Field name="quantity" label="Quantity / pallets" required placeholder="e.g. 50 units or 1 pallet" />
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea name="message" rows={4} maxLength={2000} className="mt-1.5 w-full bg-surface-elevated border border-border rounded-md px-3 py-2.5 text-sm" placeholder="Facility location, deployment timeline, firmware preference…" />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button
                  disabled={submitting}
                  className="px-7 py-3.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:opacity-90 disabled:opacity-50 glow-border"
                >
                  {submitting ? "Sending…" : "Request Quote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ name, label, type = "text", required, placeholder }: { name: string; label: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}{required && " *"}</label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={255}
        placeholder={placeholder}
        className="mt-1.5 w-full bg-surface-elevated border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary/60"
      />
    </div>
  );
}
