import Link from "next/link";
import type { Category, Engine, Model, VehicleYear } from "@/data/types";
import { catalogHref } from "@/lib/catalog-url";

type Props = {
  year: VehicleYear | null;
  model: Model | null;
  engine: Engine | null;
  category: Category | null;
};

export function CatalogBreadcrumb({ year, model, engine, category }: Props) {
  const crumbs: { label: string; href?: string }[] = [
    { label: "Catalog", href: "/" },
  ];

  if (year) {
    crumbs.push({
      label: String(year),
      href: catalogHref({ year }),
    });
  }
  if (year && model) {
    crumbs.push({
      label: model.name,
      href: catalogHref({ year, model: model.id }),
    });
  }
  if (year && model && engine) {
    crumbs.push({
      label: engine.shortName,
      href: catalogHref({ year, model: model.id, engine: engine.id }),
    });
  }
  if (category) {
    crumbs.push({ label: category.name });
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-2 border-b border-ce-border pb-2 text-xs text-ce-ink-muted"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">›</span>}
            {c.href && i < crumbs.length - 1 ? (
              <Link href={c.href} className="text-ce-link hover:underline">
                {c.label}
              </Link>
            ) : (
              <span className="font-semibold text-ce-ink">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
