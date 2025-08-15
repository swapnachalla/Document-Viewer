import { FileInfo } from '../types/DocumentCompareProps';

/**
 * Utility function to detect file type from URL
 */
export const detectFileType = (url: string): FileInfo => {
  if (!url) return { type: 'pdf', extension: 'pdf' };
  
  if (url.startsWith('data:')) {
    if (url.includes('data:application/pdf')) {
      return { type: 'pdf', extension: 'pdf' };
    } else if (url.includes('data:image/')) {
      const mimeMatch = url.match(/data:image\/([^;]+)/);
      const extension = mimeMatch ? mimeMatch[1] : 'jpg';
      return { type: 'image', extension };
    }
  }
  
  const urlParts = url.split('?')[0];
  const extension = urlParts.split('.').pop()?.toLowerCase() || '';
  
  const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'webp'];
  const pdfExtensions = ['pdf'];
  
  if (imageExtensions.includes(extension)) {
    return { type: 'image', extension };
  } else if (pdfExtensions.includes(extension)) {
    return { type: 'pdf', extension };
  }
  
  return { type: 'pdf', extension: 'pdf' };
};

/**
 * Utility function to extract title from URL
 */
export const extractTitleFromUrl = (url: string): string | null => {
  if (!url) return null;
  
  try {
    const urlPath = new URL(url).pathname;
    const filename = urlPath.split('/').pop();
    if (filename && filename.includes('.')) {
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
      const decodedName = decodeURIComponent(nameWithoutExt);
      const cleanName = decodedName
        .replace(/[_-]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .trim();
      return cleanName.length > 0 ? cleanName : null;
    }
  } catch (e) {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    if (lastPart && lastPart.includes('.')) {
      const nameWithoutExt = lastPart.replace(/\.[^/.]+$/, '');
      return nameWithoutExt.replace(/[_-]/g, ' ').trim() || null;
    }
  }
  
  return null;
};

/**
 * Generate a clean filename for downloads
 */
export const generateDownloadFilename = (url: string, defaultName = 'document'): string => {
  try {
    const urlPath = new URL(url).pathname;
    const extractedName = urlPath.split('/').pop() || defaultName;
    const filename = extractedName.replace(/\.[^/.]+$/, '') || defaultName;
    return filename.replace(/[^a-zA-Z0-9\-_]/g, '_').substring(0, 50);
  } catch (e) {
    return defaultName;
  }
};