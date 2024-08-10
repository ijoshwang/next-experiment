import TableList from '@/components/TableList';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-5 p-24">
      <h2 className="text-xl font-medium">Hi, I'm Josh 👋</h2>
      <div className="w-full">
        <TableList />
      </div>
    </main>
  );
}
