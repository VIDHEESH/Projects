import React from 'react';

const Species = ({ name, description, image }) => {
  const placeholderImage = 'https://via.placeholder.com/150';

  return (
    <li>
      <h2>{name}</h2>
      <p>{description}</p>
      <img src={image || placeholderImage} alt={name} />
    </li>
  );
};

export default Species;