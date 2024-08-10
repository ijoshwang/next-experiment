import React from 'react';
import FormAdd from './FormAdd';

const PageAdd = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-6 sm:max-w-md justify-center mx-auto rounded-lg border shadow-sm">
      <h2 className="text-xl font-semibold">Add user</h2>
      <FormAdd />
    </div>
  );
};

export default PageAdd;
