import React from 'react';

const Protected = () => {
  return (
    <div>
      <h1>Protected Route</h1>
      <p>This is a protected route that can only be accessed after login.</p>
    </div>
  );
};

export default Protected;