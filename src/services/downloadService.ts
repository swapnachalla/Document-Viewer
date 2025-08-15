import { DocumentData, FileInfo } from '../types/DocumentCompareProps';
import { detectFileType, generateDownloadFilename } from '../utils/fileUtils';

/**
 * Download document with multiple fallback strategies
 */
export const downloadDocument = async (
  url: string,
  document: DocumentData | null,
  corsProxy?: string
): Promise<void> => {
  if (!url) throw new Error('No URL provided');

  const filename = generateDownloadFilename(url);
  const fileInfo = detectFileType(url);
  const fullFilename = `${filename}.${fileInfo.extension}`;

  let downloadSuccess = false;
  let lastError: Error | null = null;

  // Strategy 1: Direct fetch
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': fileInfo.type === 'pdf' ? 'application/pdf' : 'image/*',
      },
    });
    
    if (response.ok) {
      const blob = await response.blob();
      downloadBlob(blob, fullFilename);
      downloadSuccess = true;
    }
  } catch (error) {
    lastError = error as Error;
    console.warn('Direct download failed:', error);
  }

  // Strategy 2: CORS proxy
  if (!downloadSuccess && url.startsWith('http') && !url.includes(window.location.hostname)) {
    try {
      const proxyUrl = corsProxy ? `${corsProxy}/${url}` : `https://cors-anywhere.herokuapp.com/${url}`;
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      
      if (response.ok) {
        const blob = await response.blob();
        downloadBlob(blob, fullFilename);
        downloadSuccess = true;
      }
    } catch (error) {
      lastError = error as Error;
      console.warn('CORS proxy download failed:', error);
    }
  }

  // Strategy 3: Canvas-based download for images
  if (!downloadSuccess && document && document.type === 'image' && document.image) {
    try {
      const canvas = window.document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = document.image.naturalWidth;
        canvas.height = document.image.naturalHeight;
        
        ctx.drawImage(document.image, 0, 0);
        
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            downloadBlob(blob, fullFilename);
            downloadSuccess = true;
          }
        }, `image/${fileInfo.extension === 'jpg' ? 'jpeg' : fileInfo.extension}`);
      }
    } catch (error) {
      lastError = error as Error;
    }
  }

  // Strategy 4: Open in new tab as fallback
  if (!downloadSuccess) {
    window.open(url, '_blank');
    return; // Consider this a success since user can save manually
  }

  if (!downloadSuccess) {
    throw new Error(`Download failed: ${lastError?.message || 'All download methods failed'}`);
  }
};

/**
 * Download blob as file
 */
const downloadBlob = (blob: Blob, filename: string): void => {
  const downloadUrl = window.URL.createObjectURL(blob);
  
  const link = window.document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  link.style.display = 'none';
  
  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);
  
  setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 1000);
};