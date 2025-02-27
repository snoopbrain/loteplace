import React from 'react';
import { useParams } from 'react-router-dom';
import properties from '../data/properties';

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));

  if (!property) {
    return <h1>Property not found</h1>;
  }

  return (
    <div>
      <h1>{property.title}</h1>
      <img src={property.image} alt={property.title} />
      <p>{property.description}</p>
    </div>
  );
};

export default PropertyDetails;