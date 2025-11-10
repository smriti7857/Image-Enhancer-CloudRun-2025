
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageViewer } from './components/ImageViewer';
import { DeploymentGuide } from './components/DeploymentGuide';
import { Footer } from './components/Footer';
import { enhanceImage } from './services/geminiService';
import { fileToBase64 } from './utils/imageUtils';
import type { ImageData } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeploymentGuide, setShowDeploymentGuide] = useState<boolean>(false);

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setEnhancedImage(null);

    try {
      const base64Data = await fileToBase64(file);
      const originalImageData: ImageData = {
        url: base64Data,
        mimeType: file.type,
      };
      setOriginalImage(originalImageData);

      const enhancedBase64 = await enhanceImage(base64Data, file.type);
      if (enhancedBase64) {
        setEnhancedImage({
          url: `data:${file.type};base64,${enhancedBase64}`,
          mimeType: file.type,
        });
      } else {
        throw new Error('Image enhancement failed to produce a result.');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during image enhancement.';
      setError(`Failed to enhance image. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setOriginalImage(null);
    setEnhancedImage(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-gray-100 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
        ) : (
          <ImageViewer
            originalImage={originalImage}
            enhancedImage={enhancedImage}
            isLoading={isLoading}
            onReset={handleReset}
          />
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500 text-red-300 rounded-lg text-center">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
      </main>
      
      {showDeploymentGuide && <DeploymentGuide onClose={() => setShowDeploymentGuide(false)} />}
      
      <Footer onShowGuide={() => setShowDeploymentGuide(true)} />
    </div>
  );
};

export default App;
