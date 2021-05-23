import React from 'react';

export default function Wrapper({ children = null }) {
  return (
    <div className='bg-blue-100 overflow-y-scroll h-full m-8 mx-auto w-9/12 md:w-6/12 rounded shadow flex justify-center flex-col items-center'>
      {children}
    </div>
  );
}
