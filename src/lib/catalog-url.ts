import type { VehicleYear } from "@/data/types";

export type CatalogSelection = {
  year?: VehicleYear | null;
  model?: string | null;
  engine?: string | null;
  category?: string | null;
};

/** Build catalog home URL with drill-down query params. */
export function catalogHref(sel: CatalogSelection): string {
  const params = new URLSearchParams();
  if (sel.year) params.set("year", String(sel.year));
  if (sel.model) params.set("model", sel.model);
  if (sel.engine) params.set("engine", sel.engine);
  if (sel.category) params.set("category", sel.category);
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}
