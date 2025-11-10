
import React, { useRef, useState, useCallback } from 'react';
import { Spinner } from './Spinner';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

const UploadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <div className="w-full max-w-2xl text-center">
      <div className="p-8 bg-base-200 border-2 border-dashed border-base-300 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-semibold mb-2 text-white">Enhance Your Image</h2>
        <p className="text-gray-400 mb-6">Upload a photo to see the AI magic. Get higher resolution and better quality in seconds.</p>
        
        <div 
          className={`relative flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg transition-colors duration-200 ${dragActive ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-500 hover:border-brand-light'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            disabled={isLoading}
          />
          {isLoading ? (
            <div className="flex flex-col items-center">
              <Spinner />
              <p className="mt-4 text-lg text-brand-light">Enhancing your image...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center cursor-pointer" onClick={handleClick}>
                <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-white font-semibold">Drag & drop your image here</p>
                <p className="text-gray-400 text-sm mt-1">or click to browse</p>
                <p className="text-xs text-gray-500 mt-4">Supports PNG, JPG, WEBP</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
