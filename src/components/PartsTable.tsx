import type { Part } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";

type Props = {
  parts: Part[];
  emptyMessage?: string;
};

export function PartsTable({
  parts,
  emptyMessage = "No parts found for this selection.",
}: Props) {
  if (parts.length === 0) {
    return (
      <p className="border border-ce-border bg-ce-panel px-3 py-4 text-sm text-ce-ink-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-ce-border">
      <table className="w-full min-w-[720px] border-collapse text-left text-xs">
        <thead>
          <tr className="bg-ce-navy text-white">
            <th className="px-2 py-1.5 font-semibold">Brand</th>
            <th className="px-2 py-1.5 font-semibold">Part Number</th>
            <th className="px-2 py-1.5 font-semibold">Description</th>
            <th className="px-2 py-1.5 font-semibold">Info</th>
            <th className="px-2 py-1.5 text-right font-semibold">Price</th>
            <th className="px-2 py-1.5 text-center font-semibold">Add</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part, i) => (
            <tr
              key={part.id}
              className={i % 2 === 0 ? "bg-white" : "bg-ce-row"}
            >
              <td className="border-t border-ce-border px-2 py-1.5 font-medium text-ce-ink">
                {part.brand}
              </td>
              <td className="border-t border-ce-border px-2 py-1.5 font-mono text-[11px] text-ce-link">
                {part.partNumber}
              </td>
              <td className="border-t border-ce-border px-2 py-1.5 text-ce-ink">
                {part.description}
              </td>
              <td className="border-t border-ce-border px-2 py-1.5 text-ce-ink-muted">
                {part.info}
              </td>
              <td className="border-t border-ce-border px-2 py-1.5 text-right font-semibold tabular-nums text-ce-ink">
                {formatPrice(part.price)}
              </td>
              <td className="border-t border-ce-border px-2 py-1.5 text-center">
                <AddToCartButton partId={part.id} compact />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
