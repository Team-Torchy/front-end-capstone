import React from 'react';

const FeaturesList = ({ features }) => {
  // console.log(features);
  if (!features) { return null; }
  return (
    <ul>
      {features.map(feature => {
        return (
          <li key={features.indexOf(feature)}>{feature.feature}: {feature.value}</li>
        );
      })}
    </ul>
  );
};

export default FeaturesList;