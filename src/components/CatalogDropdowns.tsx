"use client";

import { useRouter } from "next/navigation";
import {
  getCategories,
  getEngines,
  getModels,
  getYears,
  getCategoryById,
  getEngineById,
  getModelById,
  type VehicleYear,
} from "@/data";
import { catalogHref } from "@/lib/catalog-url";

type Props = {
  year: VehicleYear | null;
  modelId: string | null;
  engineId: string | null;
  categoryId: string | null;
};

type JumpSel = {
  year?: VehicleYear | null;
  model?: string | null;
  engine?: string | null;
  category?: string | null;
};

/**
 * Cascading vehicle picker — every Cadillac year stays available, and each
 * prior choice stays editable so users can jump back without losing their place.
 */
export function CatalogDropdowns({
  year,
  modelId,
  engineId,
  categoryId,
}: Props) {
  const router = useRouter();

  const years = getYears();
  const models = year ? getModels(year) : [];
  const engines = year && modelId ? getEngines(year, modelId) : [];
  const categories = year && modelId && engineId ? getCategories() : [];

  const model = modelId ? getModelById(modelId) : undefined;
  const engine = engineId ? getEngineById(engineId) : undefined;
  const category = categoryId ? getCategoryById(categoryId) : undefined;

  function go(sel: JumpSel) {
    router.push(catalogHref(sel));
  }

  return (
    <div className="mb-3 border border-ce-border bg-ce-panel">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ce-border bg-ce-navy px-3 py-2">
        <div>
          <div className="text-sm font-bold text-ce-gold">
            Select your Cadillac
          </div>
          <div className="text-[11px] text-ce-muted">
            Year → Model → Engine → Category — reopen any dropdown to change
            your path
          </div>
        </div>
        {(year || modelId || engineId || categoryId) && (
          <button
            type="button"
            onClick={() => go({})}
            className="rounded border border-ce-gold/40 px-2 py-1 text-[11px] font-semibold text-ce-gold hover:bg-white/10"
          >
            Clear selection
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 xl:grid-cols-4">
        <BigSelect
          label="Year"
          value={year ? String(year) : ""}
          placeholder="All Cadillac years…"
          disabled={false}
          options={years.map((y) => ({
            value: String(y),
            label: `${y} Cadillac`,
          }))}
          onChange={(v) => {
            if (!v) {
              go({});
              return;
            }
            go({ year: Number(v) as VehicleYear });
          }}
        />

        <BigSelect
          label="Model"
          value={modelId ?? ""}
          placeholder={year ? "Choose model…" : "Select a year first"}
          disabled={!year}
          options={models.map((m) => ({ value: m.id, label: m.name }))}
          onChange={(v) => {
            if (!year) return;
            if (!v) {
              go({ year });
              return;
            }
            go({ year, model: v });
          }}
        />

        <BigSelect
          label="Engine"
          value={engineId ?? ""}
          placeholder={
            modelId ? "Choose engine…" : "Select year & model first"
          }
          disabled={!year || !modelId}
          options={engines.map((e) => ({
            value: e.id,
            label: e.name,
          }))}
          onChange={(v) => {
            if (!year || !modelId) return;
            if (!v) {
              go({ year, model: modelId });
              return;
            }
            go({ year, model: modelId, engine: v });
          }}
        />

        <BigSelect
          label="Category"
          value={categoryId ?? ""}
          placeholder={
            engineId ? "Choose category…" : "Select engine first"
          }
          disabled={!year || !modelId || !engineId}
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
          onChange={(v) => {
            if (!year || !modelId || !engineId) return;
            if (!v) {
              go({ year, model: modelId, engine: engineId });
              return;
            }
            go({
              year,
              model: modelId,
              engine: engineId,
              category: v,
            });
          }}
        />
      </div>

      <SelectionPath
        year={year}
        modelName={model?.name}
        engineName={engine?.shortName}
        categoryName={category?.name}
        modelId={modelId}
        engineId={engineId}
        onJump={go}
      />
    </div>
  );
}

function BigSelect({
  label,
  value,
  placeholder,
  disabled,
  options,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className={`flex flex-col gap-1 ${disabled ? "opacity-55" : ""}`}>
      <span className="text-[11px] font-bold uppercase tracking-wide text-ce-ink-muted">
        {label}
      </span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full appearance-auto rounded border border-ce-border bg-white px-2 py-2 text-sm font-medium text-ce-ink shadow-sm focus:border-ce-navy focus:outline-none focus:ring-1 focus:ring-ce-navy disabled:cursor-not-allowed disabled:bg-ce-row"
        aria-label={label}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SelectionPath({
  year,
  modelName,
  engineName,
  categoryName,
  modelId,
  engineId,
  onJump,
}: {
  year: VehicleYear | null;
  modelName?: string;
  engineName?: string;
  categoryName?: string;
  modelId: string | null;
  engineId: string | null;
  onJump: (sel: JumpSel) => void;
}) {
  if (!year) {
    return (
      <div className="border-t border-ce-border bg-white px-3 py-2 text-xs text-ce-ink-muted">
        Path:{" "}
        <span className="font-medium text-ce-ink">
          Cadillac (1959–1963) — pick a year above
        </span>
      </div>
    );
  }

  const steps: { key: string; label: string; jump: () => void }[] = [
    {
      key: "make",
      label: "Cadillac",
      jump: () => onJump({}),
    },
    {
      key: "year",
      label: String(year),
      jump: () => onJump({ year }),
    },
  ];

  if (modelId && modelName) {
    steps.push({
      key: "model",
      label: modelName,
      jump: () => onJump({ year, model: modelId }),
    });
  }
  if (engineId && engineName) {
    steps.push({
      key: "engine",
      label: engineName,
      jump: () => onJump({ year, model: modelId, engine: engineId }),
    });
  }
  if (categoryName) {
    steps.push({
      key: "category",
      label: categoryName,
      jump: () => {},
    });
  }

  return (
    <div className="border-t border-ce-border bg-white px-3 py-2 text-xs">
      <span className="mr-1 text-ce-ink-muted">Your path:</span>
      <ol className="inline-flex flex-wrap items-center gap-1">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <li key={step.key} className="inline-flex items-center gap-1">
              {i > 0 && (
                <span className="text-ce-ink-muted" aria-hidden="true">
                  ›
                </span>
              )}
              {isLast ? (
                <span className="rounded bg-ce-navy px-1.5 py-0.5 font-semibold text-white">
                  {step.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={step.jump}
                  className="rounded px-1.5 py-0.5 font-medium text-ce-link hover:bg-ce-row-hover hover:underline"
                  title={`Go back to ${step.label}`}
                >
                  {step.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
