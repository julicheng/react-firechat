import React from 'react';

export default function Wrapper({ children = null }) {
  return (
    <div className='overflow-y-scroll h-full m-8 mx-auto w-9/12 md:w-6/12 bg-white rounded shadow flex justify-center flex-col items-center'>
      {children}
    </div>
  );
}
