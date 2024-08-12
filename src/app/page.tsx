import TableList from '@/components/TableList';

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-5 py-10">
      <h2 className="text-xl font-medium">Hi, I'm Josh 👋</h2>
      <div className="w-full">
        <TableList />
      </div>
    </main>
  );
}
