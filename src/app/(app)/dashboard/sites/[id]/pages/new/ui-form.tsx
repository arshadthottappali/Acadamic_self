"use client";
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export default function NewPageForm({ siteId }: { siteId: string }) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch(`/api/sites/${siteId}/pages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, slug }) });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Failed to create page');
      return;
    }
    router.push(`/dashboard/sites/${siteId}/pages`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input className="w-full rounded border px-3 py-2" placeholder="Page name" value={name} onChange={e => setName(e.target.value)} />
      <input className="w-full rounded border px-3 py-2" placeholder="slug" value={slug} onChange={e => setSlug(e.target.value)} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="rounded bg-brand px-4 py-2 text-white">Create</button>
    </form>
  );
}
