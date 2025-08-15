import * as pdfjsLib from 'pdfjs-dist';
import { DocumentData, PDFMetadata } from '../types/DocumentCompareProps';
import { extractTitleFromUrl } from '../utils/fileUtils';

// Configure PDF.js worker
export const configurePDFWorker = (): void => {
  try {
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
    }
  } catch (error) {
    console.error('Error configuring PDF.js worker:', error);
  }
};

/**
 * Load PDF document from URL
 */
export const loadPDFDocument = async (
  url: string,
  corsProxy?: string
): Promise<{ document: DocumentData; title: string | null }> => {
  configurePDFWorker();

  let pdfUrl = url;
  
  // Handle CORS issues for external URLs
  if (url.startsWith('http') && !url.includes(window.location.hostname)) {
    try {
      await fetch(url, { 
        method: 'HEAD',
        mode: 'no-cors'
      });
    } catch (corsError) {
      console.warn('CORS issue detected, trying with proxy...');
      pdfUrl = corsProxy ? `${corsProxy}/${url}` : `https://cors-anywhere.herokuapp.com/${url}`;
    }
  }

  const loadingTask = pdfjsLib.getDocument({
    url: pdfUrl,
    cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
    disableStream: true,
    disableAutoFetch: false,
    httpHeaders: {
      'Accept': 'application/pdf,*/*',
    },
    withCredentials: false,
  });
  
  const loadedPdf = await loadingTask.promise;
  
  const document: DocumentData = {
    type: 'pdf',
    pdf: loadedPdf,
    numPages: loadedPdf.numPages
  };
  
  // Extract title from PDF metadata
  let title: string | null = null;
  try {
    const metadata = await loadedPdf.getMetadata() as PDFMetadata;
    if (metadata?.info?.Title) {
      title = metadata.info.Title.trim();
    }
    
    if (!title || title.length === 0) {
      title = extractTitleFromUrl(url);
    }
  } catch (metadataError) {
    console.warn('Could not extract PDF metadata:', metadataError);
    title = extractTitleFromUrl(url);
  }
  
  return { document, title };
};