import { CATEGORIES, ENGINES, MODELS, YEARS } from "./catalog";
import { PARTS } from "./parts";
import type {
  Category,
  Engine,
  Model,
  Part,
  VehicleYear,
} from "./types";

export type { Category, Engine, Model, Part, VehicleYear, CartItem } from "./types";
export { CATEGORIES, ENGINES, MODELS, YEARS } from "./catalog";
export { PARTS } from "./parts";

export function getYears(): VehicleYear[] {
  return YEARS;
}

export function getModels(year: VehicleYear): Model[] {
  return MODELS.filter((m) => m.years.includes(year));
}

export function getEngines(year: VehicleYear, modelId: string): Engine[] {
  return ENGINES.filter((e) => {
    if (!e.years.includes(year)) return false;
    if (e.modelIds && e.modelIds.length > 0 && !e.modelIds.includes(modelId)) {
      return false;
    }
    return true;
  });
}

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getModelById(modelId: string): Model | undefined {
  return MODELS.find((m) => m.id === modelId);
}

export function getEngineById(engineId: string): Engine | undefined {
  return ENGINES.find((e) => e.id === engineId);
}

export function getCategoryById(categoryId: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === categoryId);
}

export function getPartById(partId: string): Part | undefined {
  return PARTS.find((p) => p.id === partId);
}

function partMatchesVehicle(
  part: Part,
  year: VehicleYear,
  modelId: string,
  engineId: string,
): boolean {
  if (part.years.length > 0 && !part.years.includes(year)) return false;
  if (part.modelIds.length > 0 && !part.modelIds.includes(modelId)) return false;
  if (part.engineIds.length > 0 && !part.engineIds.includes(engineId)) {
    return false;
  }
  return true;
}

export function getParts(
  year: VehicleYear,
  modelId: string,
  engineId: string,
  categoryId: string,
): Part[] {
  return PARTS.filter(
    (p) =>
      p.categoryId === categoryId &&
      partMatchesVehicle(p, year, modelId, engineId),
  );
}

/** Search by part number, brand, description, or info (case-insensitive). */
export function searchParts(query: string): Part[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return PARTS.filter((p) => {
    const haystack = [
      p.partNumber,
      p.brand,
      p.description,
      p.info,
      p.id,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function parseYear(value: string | undefined): VehicleYear | null {
  if (!value) return null;
  const n = Number(value);
  if (YEARS.includes(n as VehicleYear)) return n as VehicleYear;
  return null;
}
