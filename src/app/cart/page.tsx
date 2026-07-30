import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div>
      <h1 className="mb-1 text-base font-bold text-ce-ink">Shopping Cart</h1>
      <p className="mb-3 text-xs text-ce-ink-muted">
        Cart contents are stored in this browser (localStorage) for the
        preliminary demo.
      </p>
      <CartView />
    </div>
  );
}
