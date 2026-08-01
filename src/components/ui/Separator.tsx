import React from 'react';

interface SeparatorProps {
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ className = "" }) => {
  return (
    <div className={`stripe-separator max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="stripe-separator-bottom !max-w-none !px-0 !border-x-0 !mx-0"/>
    </div>
  );
};
