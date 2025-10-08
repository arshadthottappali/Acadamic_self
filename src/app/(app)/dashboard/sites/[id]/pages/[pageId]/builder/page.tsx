"use client";
import { useEffect, useRef, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import { useRouter } from 'next/navigation';

type Params = { params: { id: string; pageId: string } };

export default function BuilderPage({ params }: Params) {
  const editorRef = useRef<any>(null);
  const elRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch(`/api/pages/${params.pageId}`);
      const page = await res.json();
      if (!mounted) return;
      const editor = grapesjs.init({
        container: elRef.current!,
        fromElement: false,
        height: '80vh',
        storageManager: false,
      });
      if (page?.html) editor.setComponents(page.html);
      if (page?.css) editor.setStyle(page.css);
      editorRef.current = editor;
      setLoading(false);
    })();
    return () => { mounted = false; editorRef.current?.destroy(); };
  }, [params.pageId]);

  async function save() {
    const editor = editorRef.current;
    if (!editor) return;
    const html = editor.getHtml();
    const css = editor.getCss();
    await fetch(`/api/pages/${params.pageId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ html, css }) });
    router.back();
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Builder</h1>
        <button onClick={save} className="rounded bg-brand px-3 py-2 text-white">Save</button>
      </div>
      <div ref={elRef} className="border" />
      {loading && <p className="mt-2 text-sm text-slate-600">Loading...</p>}
    </section>
  );
}
