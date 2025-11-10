
import React from 'react';
import type { ImageData } from '../types';
import { Spinner } from './Spinner';

interface ImageViewerProps {
  originalImage: ImageData;
  enhancedImage: ImageData | null;
  isLoading: boolean;
  onReset: () => void;
}

const ArrowRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);


export const ImageViewer: React.FC<ImageViewerProps> = ({ originalImage, enhancedImage, isLoading, onReset }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">Original</h3>
          <div className="w-full aspect-square bg-base-200 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
            <img src={originalImage.url} alt="Original" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-300">Enhanced</h3>
          <div className="w-full aspect-square bg-base-200 rounded-lg shadow-lg overflow-hidden flex items-center justify-center relative">
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
                <Spinner />
                <p className="mt-2 text-brand-light">Enhancing...</p>
              </div>
            )}
            {enhancedImage ? (
              <img src={enhancedImage.url} alt="Enhanced" className="max-w-full max-h-full object-contain" />
            ) : (
                !isLoading && <p className="text-gray-400">Enhanced image will appear here.</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
            onClick={onReset}
            className="bg-base-300 hover:bg-base-200 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 shadow-md"
        >
            Upload Another Image
        </button>
        {enhancedImage && (
             <a
             href={enhancedImage.url}
             download="enhanced-image.png"
             className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 shadow-md flex items-center justify-center"
           >
             Download Enhanced Image
           </a>
        )}
      </div>
    </div>
  );
};
