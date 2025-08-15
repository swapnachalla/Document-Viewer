import { useState, useEffect } from 'react';
import { DocumentData } from '../types/DocumentCompareProps';
import { detectFileType } from '../utils/fileUtils';
import { loadPDFDocument } from '../services/pdfService';
import { loadImageDocument } from '../services/imageService';

interface UseDocumentLoaderResult {
  document: DocumentData | null;
  documentTitle: string | null;
  loading: boolean;
  error: string;
}

/**
 * Hook for loading documents (PDF or images)
 */
export const useDocumentLoader = (
  url: string,
  corsProxy?: string
): UseDocumentLoaderResult => {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [documentTitle, setDocumentTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleError = (error: Error): void => {
    console.error('Document loader error:', error);
    setError(`Error: ${error.message || error}`);
    setLoading(false);
    setDocument(null);
    setDocumentTitle(null);
  };

  useEffect(() => {
    if (!url) {
      setDocument(null);
      setDocumentTitle(null);
      setError('');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    setDocumentTitle(null);
    
    const fileInfo = detectFileType(url);
    
    const loadDocument = async () => {
      try {
        if (fileInfo.type === 'image') {
          const { document: loadedDoc, title } = await loadImageDocument(url);
          setDocument(loadedDoc);
          setDocumentTitle(title);
        } else {
          const { document: loadedDoc, title } = await loadPDFDocument(url, corsProxy);
          setDocument(loadedDoc);
          setDocumentTitle(title);
        }
        
        setError('');
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        let errorMessage = 'Failed to load document';
        
        if (error.message.includes('fetch')) {
          errorMessage = 'Failed to fetch document - check URL or try a different document';
        } else if (error.message.includes('CORS')) {
          errorMessage = 'CORS error - server does not allow cross-origin requests';
        } else if (error.message.includes('InvalidPDFException')) {
          errorMessage = 'Invalid PDF file or corrupted document';
        }
        
        handleError(new Error(`${errorMessage}: ${error.message || 'Unknown error'}`));
      }
    };

    loadDocument();
  }, [url, corsProxy]);

  return { document, documentTitle, loading, error };
};