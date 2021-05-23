import React from 'react';

export default function Wrapper({ children = null }) {
  return (
    <div className='bg-blue-100 overflow-y-scroll h-full m-8 mx-auto w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12 rounded shadow flex justify-center flex-col items-center'>
      {children}
    </div>
  );
}
