
import React from 'react';

const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 8 }) => {
  return (
    <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-brand-primary`}></div>
  );
};

export default LoadingSpinner;
