import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <article className="max-w-lg border border-ce-border bg-ce-panel px-4 py-5 text-sm text-ce-ink">
      <h1 className="mb-2 text-lg font-bold">Contact</h1>
      <p className="mb-4 text-xs text-ce-ink-muted">
        UI-only form — no backend email delivery yet. Prefer email for now.
      </p>

      <p className="mb-4">
        Email:{" "}
        <a
          href="mailto:parts@classicengineering.example"
          className="text-ce-link hover:underline"
        >
          parts@classicengineering.example
        </a>
      </p>

      <div className="space-y-3">
        <label className="block">
          <span className="mb-0.5 block text-xs font-semibold">Name</span>
          <input
            type="text"
            name="name"
            className="w-full rounded border border-ce-border px-2 py-1.5"
            disabled
            placeholder="Coming soon"
          />
        </label>
        <label className="block">
          <span className="mb-0.5 block text-xs font-semibold">Email</span>
          <input
            type="email"
            name="email"
            className="w-full rounded border border-ce-border px-2 py-1.5"
            disabled
            placeholder="Coming soon"
          />
        </label>
        <label className="block">
          <span className="mb-0.5 block text-xs font-semibold">Message</span>
          <textarea
            name="message"
            rows={4}
            className="w-full rounded border border-ce-border px-2 py-1.5"
            disabled
            placeholder="Contact form backend coming soon"
          />
        </label>
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded bg-neutral-400 px-3 py-1.5 text-xs font-semibold text-white"
        >
          Send (unavailable)
        </button>
      </div>
    </article>
  );
}
