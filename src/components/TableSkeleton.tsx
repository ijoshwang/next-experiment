import React from 'react'

import { Skeleton } from './ui/skeleton'

const TableSkeleton = () => {
  return (
    <tbody className="w-full divide-y divide-border-200">
      {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
        <tr key={item}>
          <td className="table-content-cell font-medium">
            <Skeleton className="cell-skeleton w-[100px]" />
          </td>
          <td className="table-content-cell text-muted-foreground">
            <Skeleton className="cell-skeleton" />
          </td>
          <td className="table-content-cell text-muted-foreground">
            <Skeleton className="cell-skeleton" />
          </td>
          <td className="table-content-cell text-muted-foreground">
            <Skeleton className="cell-skeleton" />
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default TableSkeleton
