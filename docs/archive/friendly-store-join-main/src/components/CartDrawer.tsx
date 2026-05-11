import { useState, useEffect } from "react";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "USD";

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const checkout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative h-10 w-10 inline-flex items-center justify-center rounded-md border border-border bg-surface-elevated hover:border-primary/50 transition"
        aria-label="Open cart"
      >
        <ShoppingCart className="h-4.5 w-4.5" />
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold inline-flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-full sm:max-w-md glass border-l border-border flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h3 className="font-display text-lg font-semibold">Your Cart</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {totalItems === 0 ? "Empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-surface-elevated">
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <ShoppingCart className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">Your cart is empty</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 rounded-lg border border-border bg-surface-elevated/50">
                      <div className="h-20 w-20 rounded-md overflow-hidden bg-surface flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.product.node.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {item.selectedOptions.map((o) => o.value).join(" · ") || item.variantTitle}
                        </p>
                        <p className="text-sm font-semibold text-primary mt-1.5">
                          ${parseFloat(item.price.amount).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="h-7 w-7 inline-flex items-center justify-center rounded border border-border hover:border-primary/50"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="h-7 w-7 inline-flex items-center justify-center rounded border border-border hover:border-primary/50"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="ml-auto h-7 w-7 inline-flex items-center justify-center rounded text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border p-5 space-y-4 bg-surface/80">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="font-display text-xl font-semibold">
                      {currency} ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={checkout}
                    disabled={isLoading || isSyncing}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground py-3.5 text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition disabled:opacity-50 glow-border"
                  >
                    {isLoading || isSyncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ExternalLink className="h-4 w-4" /> Secure Checkout</>}
                  </button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    Powered by Shopify · SSL encrypted
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
