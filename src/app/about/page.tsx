import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className="max-w-2xl border border-ce-border bg-ce-panel px-4 py-5 text-sm leading-relaxed text-ce-ink">
      <h1 className="mb-2 text-lg font-bold">About Classic Engineering</h1>
      <p className="mb-3">
        Classic Engineering is a specialty parts catalog focused exclusively on
        vintage Cadillacs from model years{" "}
        <strong>1959 through 1963</strong>. We do not list other makes or years
        — the catalog is intentionally narrow so restorers and owners can find
        period-correct components quickly.
      </p>
      <p className="mb-3">
        This website is a <strong>preliminary frontend</strong>: navigation,
        search, and cart behavior are real, but inventory, pricing, checkout,
        and accounts are still mock data. A future developer can replace the
        typed modules under <code className="text-xs">src/data/</code> with a
        database and API without redesigning the UI.
      </p>
      <p>
        Browse the{" "}
        <Link href="/" className="text-ce-link hover:underline">
          Part Catalog
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="text-ce-link hover:underline">
          contact us
        </Link>
        .
      </p>
    </article>
  );
}
