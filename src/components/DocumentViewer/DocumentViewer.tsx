import React, { useState, useEffect } from 'react';
import { DocumentDownload } from '../DocumentDownload/DocumentDownload';
import { DocumentZoom } from '../DocumentZoom/DocumentZoom';
import './DocumentViewer.css';

export interface DocumentViewerProps {
  id: string;
  initialUrl?: string;
  onClose: (id: string) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  id,
  initialUrl = '',
  onClose
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [scale, setScale] = useState(1.0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (url) {
      loadDocument();
    }
  }, [url]);

  const loadDocument = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Extract document info from URL
      const urlParts = url.split('/');
      const filename = urlParts[urlParts.length - 1];
      const extension = filename.split('.').pop()?.toUpperCase() || 'DOCUMENT';
      
      setDocumentTitle(filename || 'Document');
      setDocumentType(extension);
      
      // For demo purposes, assume all documents have 1 page
      // In a real implementation, you'd parse the document to get page count
      setTotalPages(1);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to load document');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      loadDocument();
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleZoomReset = () => {
    setScale(1.0);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="document-viewer">
      <div className="viewer-header">
        <div className="url-input-section">
          <form onSubmit={handleUrlSubmit}>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter document URL..."
              className="url-input"
            />
            <button type="submit" className="load-btn">Load</button>
          </form>
        </div>
        
        <button 
          className="close-btn" 
          onClick={() => onClose(id)}
          title="Close Viewer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {url && (
        <div className="document-info">
          <div className="document-details">
            <span className="document-title">{documentTitle}</span>
            <span className="document-type">{documentType}</span>
          </div>
          
          <div className="viewer-controls">
            <DocumentZoom
              scale={scale}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onReset={handleZoomReset}
            />
            
            <DocumentDownload
              documentUrl={url}
              documentTitle={documentTitle}
            />
          </div>
        </div>
      )}

      <div className="document-content">
        {isLoading && <div className="loading">Loading document...</div>}
        {error && <div className="error">{error}</div>}
        
        {url && !isLoading && !error && (
          <>
            <div className="document-frame" style={{ transform: `scale(${scale})` }}>
              <iframe
                src={url}
                width="100%"
                height="600px"
                title={documentTitle}
                frameBorder="0"
              />
            </div>
            
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="page-btn"
                >
                  Previous
                </button>
                
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="page-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};