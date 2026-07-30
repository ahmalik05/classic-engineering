import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ce-border bg-ce-panel text-xs text-ce-ink-muted">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-3 py-3">
        <p>
          © {new Date().getFullYear()} Classic Engineering — Vintage Cadillac
          parts only (1959–1963).
        </p>
        <nav className="flex flex-wrap gap-3">
          <Link href="/about" className="text-ce-link hover:underline">
            About
          </Link>
          <Link href="/privacy" className="text-ce-link hover:underline">
            Privacy
          </Link>
          <Link href="/contact" className="text-ce-link hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
