import type { Metadata } from "next";
import { PartsTable } from "@/components/PartsTable";
import { QuickCart } from "@/components/QuickCart";
import { SearchBar } from "@/components/SearchBar";
import { searchParts } from "@/data";

export const metadata: Metadata = {
  title: "Part Number Search",
};

type SearchParams = Promise<{ q?: string }>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const results = q.trim() ? searchParts(q) : [];

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
      <section className="min-w-0 flex-1">
        <h1 className="mb-1 text-base font-bold text-ce-ink">
          Part Number / Keyword Search
        </h1>
        <p className="mb-3 text-xs text-ce-ink-muted">
          Search Classic Engineering mock inventory by part number, brand, or
          description. Scope: 1959–1963 Cadillac parts only.
        </p>

        <div className="mb-4 max-w-xl">
          <SearchBar key={q} variant="page" initialQuery={q} />
        </div>

        {q.trim() ? (
          <>
            <p className="mb-2 text-xs text-ce-ink-muted">
              {results.length} result{results.length === 1 ? "" : "s"} for “
              {q.trim()}”
            </p>
            <PartsTable
              parts={results}
              emptyMessage="No parts matched that search."
            />
          </>
        ) : (
          <p className="border border-ce-border bg-ce-panel px-3 py-4 text-sm text-ce-ink-muted">
            Enter a part number or keyword to search the catalog.
          </p>
        )}
      </section>

      <div className="hidden xl:block">
        <QuickCart />
      </div>
    </div>
  );
}
