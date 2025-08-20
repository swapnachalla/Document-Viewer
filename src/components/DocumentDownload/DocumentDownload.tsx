import React from 'react';
import './DocumentDownload.css';

export interface DocumentDownloadProps {
  documentUrl: string;
  documentTitle: string;
  onDownload?: () => void;
}

export const DocumentDownload: React.FC<DocumentDownloadProps> = ({
  documentUrl,
  documentTitle,
  onDownload
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(documentUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = documentTitle || 'document';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      onDownload?.();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <button 
      className="download-btn" 
      onClick={handleDownload}
      title="Download Document"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7,10 12,15 17,10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Download
    </button>
  );
};