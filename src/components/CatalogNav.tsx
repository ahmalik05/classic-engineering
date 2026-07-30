import Link from "next/link";
import type { ReactNode } from "react";
import {
  getCategories,
  getEngines,
  getModels,
  getYears,
  type VehicleYear,
} from "@/data";
import { catalogHref } from "@/lib/catalog-url";

type Props = {
  year: VehicleYear | null;
  modelId: string | null;
  engineId: string | null;
  categoryId: string | null;
};

/** Left browse list — always shows every option at each reached level. */
export function CatalogNav({ year, modelId, engineId, categoryId }: Props) {
  const years = getYears();
  const models = year ? getModels(year) : [];
  const engines = year && modelId ? getEngines(year, modelId) : [];
  const categories = year && modelId && engineId ? getCategories() : [];

  return (
    <aside className="w-full shrink-0 border border-ce-border bg-ce-panel text-sm lg:w-56">
      <div className="border-b border-ce-border bg-ce-navy px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-ce-gold">
        All Cadillacs
      </div>

      <Section title="Year (every Cadillac)">
        <ul className="space-y-0.5">
          {years.map((y) => (
            <li key={y}>
              <NavLink
                href={catalogHref({ year: y })}
                active={year === y}
                depth={0}
              >
                {y} Cadillac
              </NavLink>
            </li>
          ))}
        </ul>
      </Section>

      {year && (
        <Section title={`Models — ${year}`}>
          <ul className="space-y-0.5">
            {models.map((m) => (
              <li key={m.id}>
                <NavLink
                  href={catalogHref({ year, model: m.id })}
                  active={modelId === m.id}
                  depth={1}
                >
                  {m.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {year && modelId && (
        <Section title="Engines">
          <ul className="space-y-0.5">
            {engines.map((e) => (
              <li key={e.id}>
                <NavLink
                  href={catalogHref({ year, model: modelId, engine: e.id })}
                  active={engineId === e.id}
                  depth={1}
                >
                  {e.shortName}
                </NavLink>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {year && modelId && engineId && (
        <Section title="Categories">
          <ul className="space-y-0.5">
            {categories.map((c) => (
              <li key={c.id}>
                <NavLink
                  href={catalogHref({
                    year,
                    model: modelId,
                    engine: engineId,
                    category: c.id,
                  })}
                  active={categoryId === c.id}
                  depth={1}
                >
                  {c.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </aside>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-ce-border px-2 py-2">
      <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-ce-ink-muted">
        {title}
      </div>
      {children}
    </div>
  );
}

function NavLink({
  href,
  active,
  depth,
  children,
}: {
  href: string;
  active: boolean;
  depth: number;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`block rounded px-1.5 py-0.5 leading-snug ${
        depth > 0 ? "pl-3" : ""
      } ${
        active
          ? "bg-ce-navy font-semibold text-white"
          : "text-ce-link hover:bg-ce-row-hover hover:underline"
      }`}
    >
      {children}
    </Link>
  );
}
