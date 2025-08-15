import React, { useState } from 'react';
import { DocumentViewerProps, DocumentViewerConfig } from '../types/DocumentCompareProps';
import { useDocumentLoader } from '../hooks/useDocumentLoader';
import { useDocumentRenderer } from '../hooks/useDocumentRenderer';
import { downloadDocument } from '../services/downloadService';
import { DocumentControls } from './DocumentControls';
import { DocumentCanvas } from './DocumentCanvas';
import { URLInput } from './URLInput';

const defaultConfig: DocumentViewerConfig = {
  maxZoom: 2.0,
  minZoom: 0.25,
  defaultZoom: 1.5,
  enableDownload: true,
};

/**
 * Main document viewer component - can be used as a standalone library component
 */
export const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  url, 
  scale, 
  currentPage, 
  onPageChange, 
  onZoomChange, 
  viewerId,
  className = '',
  showControls = true,
  showDownload = true
}) => {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string>('');
  
  const { document, documentTitle, loading, error } = useDocumentLoader(url);
  const canvasRef = useDocumentRenderer(
    document, 
    scale, 
    currentPage, 
    (error) => setLocalError(error.message)
  );

  const displayError = error || localError;

  const handlePageNavigation = (pageNum: number): void => {
    if (document && pageNum >= 1 && pageNum <= document.numPages) {
      onPageChange(viewerId, pageNum);
    }
  };

  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      const pageNum = parseInt(target.value);
      if (!isNaN(pageNum)) {
        handlePageNavigation(pageNum);
      }
    }
  };

  const handleZoomIn = (): void => {
    onZoomChange(viewerId, 0.25);
  };

  const handleZoomOut = (): void => {
    onZoomChange(viewerId, -0.25);
  };

  const handleZoomReset = (): void => {
    onZoomChange(viewerId, 1.0, true);
  };

  const handleUrlInput = (newUrl: string): void => {
    setLocalError('');
    onPageChange(viewerId, 1, newUrl);
  };

  const handleDownload = async (): Promise<void> => {
    if (!url || downloading) return;
    
    setDownloading(true);
    setLocalError('');
    
    try {
      await downloadDocument(url, document);
    } catch (err) {
      const error = err as Error;
      console.error('Download error:', error);
      setLocalError(`Download failed: ${error.message}. Try right-clicking the document and selecting "Save As..."`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={`h-full flex flex-col bg-gray-100 ${className}`}>
      {/* URL Input */}
      <URLInput 
        url={url}
        onUrlChange={handleUrlInput}
        placeholder="Enter document URL (PDF or image)"
      />

      {/* Controls */}
      {showControls && document && (
        <DocumentControls
          document={document}
          documentTitle={documentTitle}
          currentPage={currentPage}
          scale={scale}
          downloading={downloading}
          showDownload={showDownload}
          onPageNavigation={handlePageNavigation}
          onPageInput={handlePageInput}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleZoomReset}
          onDownload={handleDownload}
        />
      )}
      
      {/* Document Display Area */}
      <DocumentCanvas
        canvasRef={canvasRef}
        url={url}
        loading={loading}
        error={displayError}
        document={document}
      />
    </div>
  );
};