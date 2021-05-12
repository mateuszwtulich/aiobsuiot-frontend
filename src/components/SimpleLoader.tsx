import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function SimpleLoader() {
  return (
    <div className="SimpleLoader">
      <ClipLoader
        loading
        size={50}
      />
    </div>
  );
}
