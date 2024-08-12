import TableWrapper from '@/components/TableWrapper'

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-5 py-10">
      <h2 className="text-xl font-medium">Josh's Next Experiment 👋</h2>
      <TableWrapper />
    </main>
  )
}
