import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Build your academic website in minutes</h1>
      <p className="mt-4 text-lg text-slate-700 max-w-2xl">
        A no-code site builder for professors, researchers, and labs. Showcase publications, projects, teaching, and more.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/dashboard" className="rounded-md bg-brand px-5 py-2.5 text-white hover:bg-brand-dark">Get started</Link>
        <a href="#features" className="rounded-md border border-slate-300 px-5 py-2.5 hover:bg-slate-50">Explore features</a>
      </div>

      <section id="features" className="mt-16 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-semibold">Academic templates</h3>
          <p className="mt-2 text-slate-700">Start from curated personal and lab templates designed for academia.</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-semibold">Publications & projects</h3>
          <p className="mt-2 text-slate-700">Import from ORCID, add projects, and keep your site up to date.</p>
        </div>
      </section>
    </main>
  );
}
