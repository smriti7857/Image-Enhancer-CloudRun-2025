
import React from 'react';

interface FooterProps {
    onShowGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowGuide }) => {
  return (
    <footer className="w-full py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
        <p>Built with React, Tailwind CSS, and the Google Gemini API.</p>
        <button
          onClick={onShowGuide}
          className="mt-2 text-brand-light hover:text-white transition-colors duration-200 underline"
        >
          View Cloud Run Deployment Guide
        </button>
      </div>
    </footer>
  );
};
