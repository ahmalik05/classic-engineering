"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { lines, subtotal, itemCount, ready, setQuantity, removeItem } =
    useCart();

  if (!ready) {
    return <p className="text-sm text-ce-ink-muted">Loading cart…</p>;
  }

  if (itemCount === 0) {
    return (
      <div className="border border-ce-border bg-ce-panel px-4 py-6 text-sm">
        <p className="mb-3 text-ce-ink">Your cart is empty.</p>
        <Link href="/" className="text-ce-link hover:underline">
          Browse the part catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto border border-ce-border">
        <table className="w-full min-w-[640px] border-collapse text-left text-xs">
          <thead>
            <tr className="bg-ce-navy text-white">
              <th className="px-2 py-1.5 font-semibold">Part</th>
              <th className="px-2 py-1.5 font-semibold">Part Number</th>
              <th className="px-2 py-1.5 text-right font-semibold">Price</th>
              <th className="px-2 py-1.5 text-center font-semibold">Qty</th>
              <th className="px-2 py-1.5 text-right font-semibold">Line Total</th>
              <th className="px-2 py-1.5 text-center font-semibold"> </th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, i) => (
              <tr
                key={line.partId}
                className={i % 2 === 0 ? "bg-white" : "bg-ce-row"}
              >
                <td className="border-t border-ce-border px-2 py-2">
                  <div className="font-medium text-ce-ink">
                    {line.part.description}
                  </div>
                  <div className="text-ce-ink-muted">{line.part.brand}</div>
                </td>
                <td className="border-t border-ce-border px-2 py-2 font-mono text-ce-link">
                  {line.part.partNumber}
                </td>
                <td className="border-t border-ce-border px-2 py-2 text-right tabular-nums">
                  {formatPrice(line.part.price)}
                </td>
                <td className="border-t border-ce-border px-2 py-2 text-center">
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={line.quantity}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      if (Number.isFinite(n)) setQuantity(line.partId, n);
                    }}
                    className="w-14 rounded border border-ce-border px-1 py-0.5 text-center"
                    aria-label={`Quantity for ${line.part.partNumber}`}
                  />
                </td>
                <td className="border-t border-ce-border px-2 py-2 text-right font-semibold tabular-nums">
                  {formatPrice(line.part.price * line.quantity)}
                </td>
                <td className="border-t border-ce-border px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeItem(line.partId)}
                    className="text-red-700 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-end gap-2 border border-ce-border bg-ce-panel px-4 py-3">
        <div className="text-sm font-semibold text-ce-ink">
          Subtotal:{" "}
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded bg-neutral-400 px-4 py-2 text-sm font-semibold text-white"
        >
          Checkout
        </button>
        <p className="max-w-sm text-right text-xs text-ce-ink-muted">
          Checkout coming soon — payments, shipping, and accounts will be added
          in a later phase.
        </p>
      </div>
    </div>
  );
}
