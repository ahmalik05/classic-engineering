"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getPartById } from "@/data";
import type { CartItem, Part } from "@/data/types";

const STORAGE_KEY = "classic-engineering-cart";

export type CartLine = CartItem & { part: Part };

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (partId: string, quantity?: number) => void;
  setQuantity: (partId: string, quantity: number) => void;
  removeItem: (partId: string) => void;
  clearCart: () => void;
  ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function readRaw(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parseCart(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i) =>
        i &&
        typeof i.partId === "string" &&
        typeof i.quantity === "number" &&
        i.quantity > 0,
    );
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  emit();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "[]");
  // Client-only flag without useEffect setState (avoids hydration flash for cart count)
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const items = parseCart(raw);

  function addItem(partId: string, quantity = 1) {
    const prev = parseCart(readRaw());
    const existing = prev.find((i) => i.partId === partId);
    if (existing) {
      writeCart(
        prev.map((i) =>
          i.partId === partId
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        ),
      );
    } else {
      writeCart([...prev, { partId, quantity }]);
    }
  }

  function setQuantity(partId: string, quantity: number) {
    const prev = parseCart(readRaw());
    if (quantity <= 0) {
      writeCart(prev.filter((i) => i.partId !== partId));
      return;
    }
    writeCart(
      prev.map((i) => (i.partId === partId ? { ...i, quantity } : i)),
    );
  }

  function removeItem(partId: string) {
    writeCart(parseCart(readRaw()).filter((i) => i.partId !== partId));
  }

  function clearCart() {
    writeCart([]);
  }

  const lines: CartLine[] = [];
  for (const item of items) {
    const part = getPartById(item.partId);
    if (part) lines.push({ ...item, part });
  }

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = lines.reduce(
    (sum, l) => sum + l.part.price * l.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        lines,
        itemCount,
        subtotal,
        addItem,
        setQuantity,
        removeItem,
        clearCart,
        ready,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
