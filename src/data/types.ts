/** Shared catalog & cart types — keep stable so a future API/DB can map cleanly. */

export type VehicleYear = 1959 | 1960 | 1961 | 1962 | 1963;

export interface Model {
  id: string;
  name: string;
  /** Years this model appears in the catalog */
  years: VehicleYear[];
}

export interface Engine {
  id: string;
  name: string;
  shortName: string;
  /** Years this engine is listed for */
  years: VehicleYear[];
  /** If set, only these model ids; otherwise available for all models in those years */
  modelIds?: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Part {
  id: string;
  brand: string;
  partNumber: string;
  description: string;
  info: string;
  price: number;
  categoryId: string;
  /** Applicability — empty array means all years in catalog */
  years: VehicleYear[];
  /** Empty = all models for those years */
  modelIds: string[];
  /** Empty = all engines for those years/models */
  engineIds: string[];
}

export interface CartItem {
  partId: string;
  quantity: number;
}
