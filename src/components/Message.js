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
    <div style={{ background: `${sent ? `pink` : `turquoise`}` }}>
      {photoURL ? <img src={photoURL} alt='avatar' width={45} /> : null}
      {displayName ? <p>{displayName}</p> : null}
      {createdAt?.seconds ? (
        <span>
          {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
        </span>
      ) : null}
      <p>{text}</p>
    </div>
  );
}
