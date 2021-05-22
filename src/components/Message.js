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
        sent ? 'justify-end bg-blue-400' : 'justify-start bg-green-400'
      } flex text-white`}
    >
      <div>
        {photoURL ? (
          <img src={photoURL} alt='avatar' className='rounded-full w-8' />
        ) : null}
        {displayName ? <p>{displayName}</p> : null}
      </div>
      <p>{text}</p>
      {createdAt?.seconds ? (
        <span>
          {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
        </span>
      ) : null}
    </div>
  );
}
