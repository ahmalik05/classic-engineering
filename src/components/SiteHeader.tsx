"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { SearchBar } from "./SearchBar";

const TABS = [
  { href: "/", label: "Part Catalog", match: (p: string) => p === "/" },
  {
    href: "/search",
    label: "Part Number Search",
    match: (p: string) => p.startsWith("/search"),
  },
  {
    href: "/cart",
    label: "Cart",
    match: (p: string) => p.startsWith("/cart"),
  },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, ready } = useCart();

  return (
    <header className="border-b border-ce-border bg-ce-navy text-white">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-3 py-2.5">
        <Link href="/" className="group min-w-0 shrink-0">
          <div className="font-display text-xl font-bold tracking-wide text-ce-gold sm:text-2xl">
            Classic Engineering
          </div>
          <div className="text-[11px] leading-tight text-ce-muted sm:text-xs">
            Parts for 1959–1963 Cadillacs
          </div>
        </Link>

        <div className="w-full min-w-[220px] flex-1 sm:max-w-xl">
          <SearchBar variant="header" />
        </div>

        <Link
          href="/cart"
          className="shrink-0 rounded border border-ce-gold/40 bg-ce-navy-deep px-3 py-1.5 text-xs font-semibold text-ce-gold hover:bg-black/30"
        >
          Cart{ready ? ` (${itemCount})` : ""}
        </Link>
      </div>

      <nav className="border-t border-white/10 bg-ce-navy-deep">
        <div className="mx-auto flex max-w-[1400px] gap-0 overflow-x-auto px-2">
          {TABS.map((tab) => {
            const active = tab.match(pathname);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium ${
                  active
                    ? "border-b-2 border-ce-gold bg-white/5 text-ce-gold"
                    : "text-ce-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab.label}
                {tab.href === "/cart" && ready && itemCount > 0
                  ? ` (${itemCount})`
                  : ""}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
