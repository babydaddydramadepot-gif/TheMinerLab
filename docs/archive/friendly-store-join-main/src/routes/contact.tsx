import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Clock, MapPin } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Miner Lab" },
      { name: "description", content: "Talk to our mining hardware engineers. Sales, wholesale inquiries and technical support." },
      { property: "og:title", content: "Contact — The Miner Lab" },
      { property: "og:description", content: "Direct line to engineers, not a ticket queue." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  type: z.string().min(1),
  message: z.string().trim().min(1, "Message required").max(2000),
});

const FAQS = [
  { q: "How fast do you respond?", a: "Within 1 business day for sales and wholesale; same-day for active customers." },
  { q: "Do you support international buyers?", a: "Yes — international freight available for wholesale orders. Contact us for a quote." },
  { q: "Can I visit the warehouse?", a: "Walk-throughs are available for verified wholesale buyers by appointment." },
];

function ContactPage() {
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 600));
    setSending(false);
    toast.success("Message sent", { description: "We'll get back to you shortly." });
    e.currentTarget.reset();
  };

  return (
    <div className="px-6 lg:px-10 pt-12 pb-24">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs tracking-widest uppercase text-primary">Contact</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold">Talk to the team</h1>
        <p className="mt-3 text-muted-foreground max-w-xl">Sales, wholesale and technical support — direct from the warehouse.</p>

        <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-8">
          <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-surface/60 p-8 lg:p-10 grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Name *</label>
              <input name="name" required maxLength={100} className="mt-1.5 w-full bg-surface-elevated border border-border rounded-md px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email *</label>
              <input name="email" type="email" required maxLength={255} className="mt-1.5 w-full bg-surface-elevated border border-border rounded-md px-3 py-2.5 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Inquiry type *</label>
              <select name="type" required defaultValue="general" className="mt-1.5 w-full bg-surface-elevated border border-border rounded-md px-3 py-2.5 text-sm">
                <option value="general">General</option>
                <option value="wholesale">Wholesale inquiry</option>
                <option value="support">Technical support</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Message *</label>
              <textarea name="message" rows={6} required maxLength={2000} className="mt-1.5 w-full bg-surface-elevated border border-border rounded-md px-3 py-2.5 text-sm" />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button disabled={sending} className="px-7 py-3.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:opacity-90 disabled:opacity-50 glow-border">
                {sending ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>

          <aside className="space-y-4">
            <InfoCard icon={Mail} label="Email">
              <a href="mailto:sales@theminerlab.com" className="text-foreground hover:text-primary">sales@theminerlab.com</a>
            </InfoCard>
            <InfoCard icon={Clock} label="Hours">Mon–Fri · 9:00–17:00 CST</InfoCard>
            <InfoCard icon={MapPin} label="Warehouse">USA-based · address on request</InfoCard>
            <div className="rounded-xl border border-border bg-surface aspect-[4/3] grid-bg flex items-center justify-center text-xs text-muted-foreground">
              Map placeholder
            </div>
          </aside>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="font-display text-2xl font-semibold mb-5">Common questions</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-surface px-6 py-5 open:bg-surface-elevated">
                <summary className="cursor-pointer list-none flex items-center justify-between font-display font-semibold">
                  {f.q}
                  <span className="text-primary transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" /> {label}
      </div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}
