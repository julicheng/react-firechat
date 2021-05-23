import React from 'react';
import { formatRelative } from 'date-fns';

export default function Message({
  createdAt = null,
  text = '',
  displayName = '',
  photoURL = '',
  sent = false,
}) {
  return (
    <div
      className={`${
        sent ? 'self-end ' : 'self-start '
      } bg-gray-50 my-2 mx-4 rounded-lg px-4 py-3 shadow-md max-w-sm`}
    >
      <div className='flex justify-start items-center'>
        {photoURL ? (
          <img src={photoURL} alt='avatar' className='rounded-full w-6' />
        ) : null}
        {displayName ? (
          <p
            className={`${
              sent ? 'text-purple-500' : 'text-indigo-500'
            } pl-2 text-xs font-medium`}
          >
            {displayName}
          </p>
        ) : null}
      </div>
      <p className='break-all my-2 text-sm'>{text}</p>
      {createdAt?.seconds ? (
        <p className='text-xs text-right text-gray-400'>
          {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
        </p>
      ) : null}
    </div>
  );
}
