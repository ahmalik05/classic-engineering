"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export function QuickCart() {
  const { lines, subtotal, itemCount, ready, removeItem } = useCart();

  return (
    <aside className="w-full shrink-0 border border-ce-border bg-ce-panel text-xs lg:w-52">
      <div className="border-b border-ce-border bg-ce-navy px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-ce-gold">
        Quick Cart
      </div>
      <div className="px-2 py-2">
        {!ready ? (
          <p className="text-ce-ink-muted">Loading…</p>
        ) : itemCount === 0 ? (
          <p className="text-ce-ink-muted">Cart is empty.</p>
        ) : (
          <ul className="mb-2 max-h-64 space-y-2 overflow-y-auto">
            {lines.map((line) => (
              <li
                key={line.partId}
                className="border-b border-ce-border/70 pb-1.5 last:border-0"
              >
                <div className="font-mono text-[10px] text-ce-link">
                  {line.part.partNumber}
                </div>
                <div className="leading-snug text-ce-ink">
                  {line.part.description}
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-1 text-ce-ink-muted">
                  <span>
                    qty {line.quantity} ·{" "}
                    {formatPrice(line.part.price * line.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(line.partId)}
                    className="text-[10px] text-red-700 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-1 flex items-center justify-between border-t border-ce-border pt-2 font-semibold text-ce-ink">
          <span>Subtotal</span>
          <span className="tabular-nums">
            {ready ? formatPrice(subtotal) : "—"}
          </span>
        </div>

        <Link
          href="/cart"
          className="mt-2 block rounded bg-ce-navy px-2 py-1.5 text-center font-semibold text-white hover:bg-ce-navy-deep"
        >
          View Cart
        </Link>
      </div>
    </aside>
  );
}
