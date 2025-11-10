
import React from 'react';

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 8.25 1.5 1.5m-4.5-4.5 1.5 1.5m-6.75 0 1.5 1.5m9-1.5-1.5 1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75 14.25 5.25m2.25 2.25-1.5 1.5m-3-3-1.5-1.5m-3 1.5-1.5 1.5m6 6-1.5 1.5m3-3-1.5 1.5m-4.5 4.5-1.5 1.5m3-3-1.5 1.5" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-base-200/50 backdrop-blur-sm shadow-lg w-full">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <SparklesIcon className="w-8 h-8 mr-3 text-brand-light" />
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-white">
          AI Image Enhancer
        </h1>
      </div>
    </header>
  );
};
