import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NewSiteForm from './ui-form';

export default async function NewSitePage() {
  const session = await getServerSession();
  if (!session) redirect('/login');
  return (
    <section>
      <h1 className="text-2xl font-semibold">Create a new site</h1>
      <div className="mt-6 max-w-lg">
        <NewSiteForm />
      </div>
    </section>
  );
}
