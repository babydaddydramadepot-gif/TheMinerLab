import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCartSync } from "@/hooks/useCartSync";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">Error 404</p>
        <h1 className="mt-3 font-display text-5xl font-semibold">Signal lost</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has been decommissioned or never existed.
        </p>
        <Link
          to="/"
          className="inline-flex mt-6 items-center px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider hover:opacity-90"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider"
          >
            Try again
          </button>
          <a href="/" className="px-5 py-2.5 rounded-md border border-border text-xs font-semibold uppercase tracking-wider">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Miner Lab — Premium Crypto Mining Hardware" },
      { name: "description", content: "Tested ASIC miners, tuned systems, and mining infrastructure built for serious miners. USA-based shipping and wholesale inventory." },
      { property: "og:title", content: "The Miner Lab — Premium Crypto Mining Hardware" },
      { property: "og:description", content: "Tested ASIC miners, tuned systems, and mining infrastructure built for serious miners. USA-based shipping and wholesale inventory." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "The Miner Lab — Premium Crypto Mining Hardware" },
      { name: "twitter:description", content: "Tested ASIC miners, tuned systems, and mining infrastructure built for serious miners. USA-based shipping and wholesale inventory." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/f88371d4-dfcd-4e57-b34d-c242fb00bbf4" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/f88371d4-dfcd-4e57-b34d-c242fb00bbf4" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartSyncMount />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" theme="dark" />
    </QueryClientProvider>
  );
}

function CartSyncMount() {
  useCartSync();
  return null;
}
