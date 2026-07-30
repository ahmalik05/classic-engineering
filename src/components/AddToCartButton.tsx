"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  partId: string;
  compact?: boolean;
};

export function AddToCartButton({ partId, compact }: Props) {
  const { addItem } = useCart();
  const [flash, setFlash] = useState(false);

  function handleClick() {
    addItem(partId, 1);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 900);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded border px-2 py-0.5 text-xs font-semibold ${
        flash
          ? "border-green-700 bg-green-700 text-white"
          : "border-ce-navy bg-ce-navy text-white hover:bg-ce-navy-deep"
      }`}
    >
      {flash ? "Added" : compact ? "Add" : "Add to Cart"}
    </button>
  );
}
