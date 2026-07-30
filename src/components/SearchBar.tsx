"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type Props = {
  variant?: "header" | "page";
  initialQuery?: string;
};

export function SearchBar({ variant = "page", initialQuery = "" }: Props) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  const isHeader = variant === "header";

  return (
    <form onSubmit={onSubmit} className="flex w-full gap-1">
      <input
        type="search"
        name="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Year, model, part type, or part number…"
        aria-label="Search parts"
        className={
          isHeader
            ? "min-w-0 flex-1 rounded border border-white/20 bg-white px-2 py-1.5 text-sm text-ce-ink placeholder:text-neutral-500"
            : "min-w-0 flex-1 rounded border border-ce-border bg-white px-2 py-1.5 text-sm text-ce-ink"
        }
      />
      <button
        type="submit"
        className={
          isHeader
            ? "shrink-0 rounded bg-ce-gold px-3 py-1.5 text-sm font-semibold text-ce-navy hover:bg-ce-gold-bright"
            : "shrink-0 rounded bg-ce-navy px-3 py-1.5 text-sm font-semibold text-white hover:bg-ce-navy-deep"
        }
      >
        Search
      </button>
    </form>
  );
}
