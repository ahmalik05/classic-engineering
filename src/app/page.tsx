import { CatalogCenter } from "@/components/CatalogCenter";
import { CatalogNav } from "@/components/CatalogNav";
import { QuickCart } from "@/components/QuickCart";
import {
  getCategoryById,
  getEngineById,
  getModelById,
  parseYear,
} from "@/data";

type SearchParams = Promise<{
  year?: string;
  model?: string;
  engine?: string;
  category?: string;
}>;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const year = parseYear(sp.year);

  // Validate drill-down chain so bad query params fall back cleanly
  let modelId: string | null = null;
  let engineId: string | null = null;
  let categoryId: string | null = null;

  if (year && sp.model && getModelById(sp.model)?.years.includes(year)) {
    modelId = sp.model;
  }

  if (year && modelId && sp.engine) {
    const engine = getEngineById(sp.engine);
    if (
      engine &&
      engine.years.includes(year) &&
      (!engine.modelIds?.length || engine.modelIds.includes(modelId))
    ) {
      engineId = sp.engine;
    }
  }

  if (year && modelId && engineId && sp.category && getCategoryById(sp.category)) {
    categoryId = sp.category;
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
      <CatalogNav
        year={year}
        modelId={modelId}
        engineId={engineId}
        categoryId={categoryId}
      />
      <CatalogCenter
        year={year}
        modelId={modelId}
        engineId={engineId}
        categoryId={categoryId}
      />
      <div className="hidden xl:block">
        <QuickCart />
      </div>
    </div>
  );
}
