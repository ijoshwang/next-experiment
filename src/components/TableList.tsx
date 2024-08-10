import { IUser } from '@/types';

import React from 'react';

const testData: IUser[] = [
  {
    name: 'Tom1',
    nickname: 'IamTom',
    age: 6,
    createdBy: 'Jack',
  },
  {
    name: 'Tom2',
    nickname: 'IamTom',
    age: 9,
  },
  {
    name: 'Tom3',
    nickname: 'IamTom',
    age: 12,
  },
  {
    name: 'Tom4',
    nickname: 'IamTom',
    age: 15,
  },
];

const TableList = () => {
  return (
    <div className="overflow-x-auto">
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
            <tbody className="w-full divide-y divide-border-200">
              {testData.map((item: IUser, index) => (
                <tr key={index + item.name}>
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
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableList;
