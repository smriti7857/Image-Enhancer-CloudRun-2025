
import { GoogleGenAI, Modality } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we'll throw an error if the key is missing.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
const model = 'gemini-2.5-flash-image';

export const enhanceImage = async (base64ImageData: string, mimeType: string): Promise<string | null> => {
  // The Gemini API expects the base64 string without the data URL prefix.
  const pureBase64 = base64ImageData.split(',')[1];
  
  if (!pureBase64) {
      throw new Error("Invalid base64 image data provided.");
  }
  
  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: {
            parts: [
                {
                    inlineData: {
                        data: pureBase64,
                        mimeType: mimeType,
                    },
                },
                {
                    text: 'Upscale this image, enhancing its quality, resolution, and details. Make it look sharper and clearer, as if it was taken with a better camera.',
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    // Extract the base64 data from the first candidate's content part that has inlineData.
    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    
    return null;

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Forward a more user-friendly error message
    if (error instanceof Error) {
        throw new Error(`Gemini API request failed: ${error.message}`);
    }
    throw new Error('An unknown error occurred while contacting the Gemini API.');
  }
};
