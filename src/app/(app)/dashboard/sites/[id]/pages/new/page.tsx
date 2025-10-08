import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NewPageForm from './ui-form';

type Params = { params: { id: string } };

export default async function NewPage({ params }: Params) {
  const session = await getServerSession();
  if (!session) redirect('/login');
  return (
    <section>
      <h1 className="text-2xl font-semibold">Create a new page</h1>
      <div className="mt-6 max-w-lg">
        <NewPageForm siteId={params.id} />
      </div>
    </section>
  );
}
