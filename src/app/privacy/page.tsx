import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-2xl border border-ce-border bg-ce-panel px-4 py-5 text-sm leading-relaxed text-ce-ink">
      <h1 className="mb-2 text-lg font-bold">Privacy Policy</h1>
      <p className="mb-3 text-ce-ink-muted">Placeholder page.</p>
      <p className="mb-3">
        Classic Engineering’s production privacy policy will be published here
        before launch. This preliminary demo stores cart contents only in your
        browser’s localStorage and does not collect accounts or payment data.
      </p>
      <p>
        When authentication, checkout, and analytics are added, this page should
        be replaced with a complete policy covering data collected, retention,
        and third-party processors.
      </p>
    </article>
  );
}
