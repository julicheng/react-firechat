import React from 'react';

export default function Button({ onClick = null, children = null }) {
  return (
    <button
      className='py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 flex-initial'
      onClick={onClick}
    >
      {children}
    </button>
  );
}
