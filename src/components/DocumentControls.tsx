import React from 'react';
import { DocumentData } from '../types/DocumentCompareProps';

interface DocumentControlsProps {
  document: DocumentData;
  documentTitle: string | null;
  currentPage: number;
  scale: number;
  downloading: boolean;
  showDownload: boolean;
  onPageNavigation: (page: number) => void;
  onPageInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onDownload: () => void;
}

export const DocumentControls: React.FC<DocumentControlsProps> = ({
  document,
  documentTitle,
  currentPage,
  scale,
  downloading,
  showDownload,
  onPageNavigation,
  onPageInput,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onDownload
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-2 flex items-center justify-between text-sm">
      {/* Document Type Indicator with Title */}
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          document.type === 'pdf' 
            ? 'bg-red-100 text-red-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {document.type === 'pdf' ? 'PDF' : 'Image'}
        </span>
        {documentTitle && (
          <span className="text-sm font-medium text-gray-700 truncate max-w-xs" title={documentTitle}>
            {documentTitle}
          </span>
        )}
      </div>

      {/* Page Navigation (PDF only) */}
      {document.type === 'pdf' && (
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onPageNavigation(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            title="Previous Page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <input
            type="number"
            value={currentPage}
            onChange={(e) => {
              const pageNum = parseInt(e.target.value);
              if (!isNaN(pageNum)) {
                onPageNavigation(pageNum);
              }
            }}
            onKeyPress={onPageInput}
            min="1"
            max={document.numPages}
            className="w-12 px-1 py-1 border border-gray-300 rounded text-center text-xs focus:ring-blue-500 focus:border-blue-500"
          />
          
          <span className="text-gray-600 text-xs">of {document.numPages}</span>
          
          <button
            onClick={() => onPageNavigation(currentPage + 1)}
            disabled={currentPage >= document.numPages}
            className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            title="Next Page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="flex items-center space-x-1">
        <button
          onClick={onZoomOut}
          disabled={scale <= 0.25}
          className="p-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          title="Zoom Out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
        </button>
        
        <span className="text-xs font-medium w-10 text-center text-gray-700">
          {Math.round(scale * 100)}%
        </span>
        
        <button
          onClick={onZoomIn}
          disabled={scale >= 2.0}
          className="p-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          title="Zoom In"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
        
        <button
          onClick={onZoomReset}
          className="p-1.5 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-xs"
          title="Reset Zoom to 100%"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {showDownload && (
          <>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button
              onClick={onDownload}
              disabled={downloading}
              className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              title={downloading ? "Downloading..." : `Download ${document.type === 'pdf' ? 'PDF' : 'Image'}`}
            >
              {downloading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};