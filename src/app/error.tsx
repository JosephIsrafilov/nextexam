"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="container py-10">
      <h2 className="text-xl font-semibold">Error</h2>
      <pre className="mt-3 rounded bg-black/5 p-3">{error.message}</pre>
    </div>
  );
}
