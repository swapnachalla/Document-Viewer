import { DocumentData } from '../types/DocumentCompareProps';
import { extractTitleFromUrl } from '../utils/fileUtils';

/**
 * Load image document from URL
 */
export const loadImageDocument = async (
  url: string
): Promise<{ document: DocumentData; title: string | null }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = (): void => {
      try {
        const document: DocumentData = {
          type: 'image',
          image: img,
          width: img.naturalWidth,
          height: img.naturalHeight,
          numPages: 1
        };
        
        const title = extractTitleFromUrl(url);
        resolve({ document, title });
      } catch (err) {
        reject(new Error('Failed to process loaded image'));
      }
    };
    
    img.onerror = (): void => {
      reject(new Error('Failed to load image: Could not load image from URL'));
    };
    
    img.src = url;
  });
};