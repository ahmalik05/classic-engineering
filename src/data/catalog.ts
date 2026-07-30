import type { Category, Engine, Model, VehicleYear } from "./types";

export const YEARS: VehicleYear[] = [1959, 1960, 1961, 1962, 1963];

export const MODELS: Model[] = [
  { id: "series-62", name: "Series 62", years: [1959, 1960, 1961, 1962, 1963] },
  { id: "deville", name: "DeVille", years: [1959, 1960, 1961, 1962, 1963] },
  { id: "eldorado", name: "Eldorado", years: [1959, 1960, 1961, 1962, 1963] },
  { id: "fleetwood", name: "Fleetwood", years: [1959, 1960, 1961, 1962, 1963] },
  {
    id: "sixty-special",
    name: "Sixty Special",
    years: [1959, 1960, 1961, 1962, 1963],
  },
];

export const ENGINES: Engine[] = [
  {
    id: "390-4bbl",
    name: "6.4L 390cid V8 (4-bbl)",
    shortName: "390 V8 4-bbl",
    years: [1959, 1960, 1961, 1962, 1963],
  },
  {
    id: "390-tripower",
    name: "6.4L 390cid V8 (Tri-Power)",
    shortName: "390 V8 Tri-Power",
    years: [1959, 1960, 1961],
    modelIds: ["eldorado"],
  },
];

export const CATEGORIES: Category[] = [
  { id: "brake-wheel-hub", name: "Brake & Wheel Hub" },
  { id: "engine", name: "Engine" },
  { id: "electrical", name: "Electrical" },
  { id: "cooling", name: "Cooling" },
  { id: "suspension", name: "Suspension" },
  { id: "steering", name: "Steering" },
  { id: "fuel-air", name: "Fuel & Air" },
  { id: "transmission", name: "Transmission" },
  { id: "exhaust", name: "Exhaust" },
  { id: "body-interior", name: "Body & Interior" },
];
