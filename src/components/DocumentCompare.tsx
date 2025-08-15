import React, { useState } from 'react';
import { ViewerState, DocumentCompareProps, DocumentViewerConfig } from '../types/DocumentCompareProps';
import { DocumentViewer } from './DocumentViewer';

const defaultConfig: DocumentViewerConfig = {
  maxZoom: 2.0,
  minZoom: 0.25,
  defaultZoom: 1.5,
  maxViewers: 6,
  enableDownload: true,
  enableMultipleViewers: true,
};

/**
 * Main DocumentCompare component - This is the primary library export
 * Can be used as a complete document comparison solution
 */
export const DocumentCompare: React.FC<DocumentCompareProps> = ({
  initialUrls = ['', ''],
  config = defaultConfig,
  className = '',
  onDocumentLoad,
  onError
}) => {
  const mergedConfig = { ...defaultConfig, ...config };
  
  const [viewers, setViewers] = useState<ViewerState[]>(() => {
    return initialUrls.map((url, index) => ({
      id: index + 1,
      url,
      scale: mergedConfig.defaultZoom || 1.5,
      currentPage: 1,
    }));
  });

  const handleUrlChange = (id: number, newUrl: string): void => {
    setViewers(prevViewers =>
      prevViewers.map(viewer =>
        viewer.id === id ? { ...viewer, url: newUrl, currentPage: 1 } : viewer
      )
    );
  };

  const handleZoomChange = (id: number, delta: number, isReset = false): void => {
    setViewers(prevViewers =>
      prevViewers.map(viewer => {
        if (viewer.id === id) {
          let newScale: number;
          if (isReset) {
            newScale = delta;
          } else {
            newScale = viewer.scale + delta;
          }
          newScale = Math.max(
            mergedConfig.minZoom || 0.25, 
            Math.min(mergedConfig.maxZoom || 2.0, newScale)
          );
          return { ...viewer, scale: newScale };
        }
        return viewer;
      })
    );
  };

  const handlePageChange = (id: number, newPage: number, newUrl?: string): void => {
    setViewers(prevViewers =>
      prevViewers.map(viewer =>
        viewer.id === id 
          ? { 
              ...viewer, 
              currentPage: newPage,
              ...(newUrl !== undefined && { url: newUrl })
            }
          : viewer
      )
    );
  };

  const addViewer = (): void => {
    if (viewers.length < (mergedConfig.maxViewers || 6)) {
      const newId = Math.max(...viewers.map(v => v.id)) + 1;
      setViewers(prev => [...prev, { 
        id: newId, 
        url: '', 
        scale: mergedConfig.defaultZoom || 1.5, 
        currentPage: 1 
      }]);
    }
  };

  const removeViewer = (id: number): void => {
    if (viewers.length > 1) {
      setViewers(prev => prev.filter(viewer => viewer.id !== id));
    }
  };

  return (
    <div className={`h-full flex flex-col bg-gray-50 ${className}`}>
      {/* Header - only show if multiple viewers are enabled */}
      {mergedConfig.enableMultipleViewers && (
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">📄 Document Compare</h1>
            <button
              onClick={addViewer}
              disabled={viewers.length >= (mergedConfig.maxViewers || 6)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add Viewer ({viewers.length}/{mergedConfig.maxViewers || 6})
            </button>
          </div>
        </header>
      )}

      {/* Document Viewers */}
      <div className="flex-1 flex overflow-hidden">
        {viewers.map((viewer) => (
          <div
            key={viewer.id}
            className="flex-1 border-r border-gray-200 last:border-r-0 relative"
            style={{ minWidth: '300px' }}
          >
            {mergedConfig.enableMultipleViewers && viewers.length > 1 && (
              <button
                onClick={() => removeViewer(viewer.id)}
                className="absolute top-0 right-0 z-10 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                title="Remove Viewer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <DocumentViewer
              url={viewer.url}
              scale={viewer.scale}
              currentPage={viewer.currentPage}
              onPageChange={handlePageChange}
              onZoomChange={handleZoomChange}
              viewerId={viewer.id}
              showDownload={mergedConfig.enableDownload}
            />
          </div>
        ))}
      </div>
    </div>
  );
};