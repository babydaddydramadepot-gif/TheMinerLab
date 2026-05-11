import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, PackageX } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ProductGrid({ query, limit = 50 }: { query?: string; limit?: number }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", query ?? "", limit],
    queryFn: () => fetchProducts(query, limit),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading products…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-surface p-10 text-center">
        <p className="text-sm text-muted-foreground">Could not load products. Please try again.</p>
      </div>
    );
  }

  const products = data ?? [];

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-16 text-center">
        <PackageX className="h-10 w-10 mx-auto text-muted-foreground/40 mb-4" />
        <h3 className="font-display text-xl font-semibold">No products found</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Your storefront is connected to Shopify and ready. Tell the Lovable chat what products to add (e.g. "Add the Antminer S19 Pro with 100TH/110TH variants at $2,400") and they'll appear here instantly.
        </p>
        <Link
          to="/contact"
          className="inline-flex mt-6 items-center px-5 py-2.5 rounded-md text-xs font-medium tracking-wider uppercase border border-primary/40 text-primary hover:bg-primary/10"
        >
          Contact Sales
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((p) => (
        <ProductCard key={p.node.id} product={p} />
      ))}
    </div>
  );
}
