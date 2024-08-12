import { Suspense } from 'react'
import { Loader2Icon } from 'lucide-react'

import { getCollectedUsers } from '@/lib/action'

import TableList from './TableList'

export default async function TableWrapper() {
  const initialData = await getCollectedUsers()

  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-80 gap-4">
            <p>Loading...</p>
            <Loader2Icon className="animate-spin h-6 w-6 text-primary ml-6" />
          </div>
        }
      >
        <TableList initialData={initialData} />
      </Suspense>
    </div>
  )
}
