'use client'

import React, { useEffect, useState } from 'react'
import { Loader2Icon, RefreshCcw } from 'lucide-react'

import { getCollectedUsers } from '@/lib/action'
import { ICollectedUser } from '@/types'

import { Button } from './ui/button'
import TableSkeleton from './TableSkeleton'

const TableList = () => {
  const [data, setData] = useState<ICollectedUser[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response: ICollectedUser[] = await getCollectedUsers()
      setData(response)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-end sm:px-6 lg:px-8">
        <Button onClick={fetchData} variant="outline" disabled={isLoading}>
          {isLoading ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="mr-2 h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>
      <div className="inline-block align-middle min-w-full py-2 sm:px-6 lg:px-8">
        <div className="w-full mx-auto overflow-hidden shadow ring-1 ring-border ring-opacity-5 sm:rounded-lg ">
          <table className="min-w-full divide-y divide-border-300">
            <thead className="bg-muted">
              <tr>
                <th className="table-head-cell">Name</th>
                <th className="table-head-cell">Nickname</th>
                <th className="table-head-cell">Age</th>
                <th className="table-head-cell">CreatedBy</th>
              </tr>
            </thead>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <tbody className="w-full divide-y divide-border-200">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td className="table-content-cell font-medium">
                      {item.name}
                    </td>
                    <td className="table-content-cell text-muted-foreground">
                      {item.nickname}
                    </td>
                    <td className="table-content-cell text-muted-foreground">
                      {item.age}
                    </td>
                    <td className="table-content-cell text-muted-foreground">
                      {item.createdBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableList
