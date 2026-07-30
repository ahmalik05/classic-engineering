import Link from "next/link";
import {
  getCategories,
  getEngines,
  getModels,
  getParts,
  getCategoryById,
  getEngineById,
  getModelById,
  getYears,
  type VehicleYear,
} from "@/data";
import { catalogHref } from "@/lib/catalog-url";
import { CatalogBreadcrumb } from "./CatalogBreadcrumb";
import { PartsTable } from "./PartsTable";

type Props = {
  year: VehicleYear | null;
  modelId: string | null;
  engineId: string | null;
  categoryId: string | null;
};

export function CatalogCenter({
  year,
  modelId,
  engineId,
  categoryId,
}: Props) {
  const model = modelId ? (getModelById(modelId) ?? null) : null;
  const engine = engineId ? (getEngineById(engineId) ?? null) : null;
  const category = categoryId ? (getCategoryById(categoryId) ?? null) : null;

  return (
    <section className="min-w-0 flex-1">
      <CatalogBreadcrumb
        year={year}
        model={model}
        engine={engine}
        category={category}
      />

      {!year && <YearPicker />}

      {year && !modelId && <ModelPicker year={year} />}

      {year && modelId && model && !engineId && (
        <EnginePicker year={year} modelId={modelId} modelName={model.name} />
      )}

      {year && modelId && engineId && model && engine && !categoryId && (
        <CategoryPicker
          year={year}
          modelId={modelId}
          engineId={engineId}
          heading={`${year} ${model.name} — ${engine.shortName}`}
        />
      )}

      {year && modelId && engineId && categoryId && category && (
        <div>
          <h1 className="mb-1 text-base font-bold text-ce-ink">
            {category.name}
          </h1>
          <p className="mb-3 text-xs text-ce-ink-muted">
            {year} Cadillac {model?.name} · {engine?.name} · mock inventory
          </p>
          <PartsTable parts={getParts(year, modelId, engineId, categoryId)} />
        </div>
      )}
    </section>
  );
}

function YearPicker() {
  return (
    <div>
      <h1 className="mb-1 text-base font-bold text-ce-ink">
        Part Catalog — Cadillac 1959–1963
      </h1>
      <p className="mb-3 text-xs text-ce-ink-muted">
        Select a year in the left navigation (or below) to drill into models,
        engines, and part categories. Classic Engineering stocks vintage
        Cadillac parts for these model years only.
      </p>
      <ChooserList
        items={getYears().map((y) => ({
          href: catalogHref({ year: y }),
          label: `${y} Cadillac`,
        }))}
      />
    </div>
  );
}

function ModelPicker({ year }: { year: VehicleYear }) {
  const models = getModels(year);
  return (
    <div>
      <h1 className="mb-1 text-base font-bold text-ce-ink">
        {year} Cadillac — Select Model
      </h1>
      <p className="mb-3 text-xs text-ce-ink-muted">
        Choose a model to continue.
      </p>
      <ChooserList
        items={models.map((m) => ({
          href: catalogHref({ year, model: m.id }),
          label: m.name,
        }))}
      />
    </div>
  );
}

function EnginePicker({
  year,
  modelId,
  modelName,
}: {
  year: VehicleYear;
  modelId: string;
  modelName: string;
}) {
  const engines = getEngines(year, modelId);
  return (
    <div>
      <h1 className="mb-1 text-base font-bold text-ce-ink">
        {year} {modelName} — Select Engine
      </h1>
      <p className="mb-3 text-xs text-ce-ink-muted">
        Engine listings are representative for catalog navigation.
      </p>
      <ChooserList
        items={engines.map((e) => ({
          href: catalogHref({ year, model: modelId, engine: e.id }),
          label: e.name,
        }))}
      />
    </div>
  );
}

function CategoryPicker({
  year,
  modelId,
  engineId,
  heading,
}: {
  year: VehicleYear;
  modelId: string;
  engineId: string;
  heading: string;
}) {
  const categories = getCategories();
  return (
    <div>
      <h1 className="mb-1 text-base font-bold text-ce-ink">{heading}</h1>
      <p className="mb-3 text-xs text-ce-ink-muted">
        Select a part category to view the listing table.
      </p>
      <ChooserList
        items={categories.map((c) => ({
          href: catalogHref({
            year,
            model: modelId,
            engine: engineId,
            category: c.id,
          }),
          label: c.name,
        }))}
      />
    </div>
  );
}

function ChooserList({ items }: { items: { href: string; label: string }[] }) {
  return (
    <ul className="columns-1 gap-x-6 text-sm sm:columns-2">
      {items.map((item) => (
        <li key={item.href} className="mb-1 break-inside-avoid">
          <Link href={item.href} className="text-ce-link hover:underline">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
