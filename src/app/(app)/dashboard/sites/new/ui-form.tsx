"use client";
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export default function NewSiteForm() {
  const [name, setName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/sites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, subdomain }) });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'Failed to create site');
      return;
    }
    router.push('/dashboard/sites');
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input className="w-full rounded border px-3 py-2" placeholder="Site name" value={name} onChange={e => setName(e.target.value)} />
      <input className="w-full rounded border px-3 py-2" placeholder="subdomain" value={subdomain} onChange={e => setSubdomain(e.target.value)} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="rounded bg-brand px-4 py-2 text-white">Create</button>
    </form>
  );
}
