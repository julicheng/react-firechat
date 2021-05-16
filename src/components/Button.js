import React from 'react';

export default function Button({ onClick = null, children = null }) {
  return <button onClick={onClick}>{children}</button>;
}
