import React, { useState } from 'react';
import { DocumentViewer } from '../DocumentViewer/DocumentViewer';
import './MultiDocumentViewer.css';

interface ViewerInstance {
  id: string;
  createdAt: Date;
}

export interface MultiDocumentViewerProps {
  maxViewers?: number;
  initialViewers?: number;
  allowDynamicAdd?: boolean;
  showViewerCount?: boolean;
}

export const MultiDocumentViewer: React.FC<MultiDocumentViewerProps> = ({
  maxViewers = 10,
  initialViewers = 1,
  allowDynamicAdd = true,
  showViewerCount = true
}) => {
  // Initialize with the specified number of initial viewers
  const [viewers, setViewers] = useState<ViewerInstance[]>(() => {
    const initialViewerList: ViewerInstance[] = [];
    for (let i = 0; i < Math.max(1, initialViewers); i++) {
      initialViewerList.push({
        id: (i + 1).toString(),
        createdAt: new Date()
      });
    }
    return initialViewerList;
  });

  const [viewerCount, setViewerCount] = useState('1');

  const addViewers = () => {
    const count = parseInt(viewerCount, 10);
    if (isNaN(count) || count <= 0) {
      alert('Please enter a valid number');
      return;
    }

    const currentCount = viewers.length;
    const newViewersToAdd = Math.min(count, maxViewers - currentCount);
    
    if (newViewersToAdd <= 0) {
      alert(`Cannot add more viewers. Maximum is ${maxViewers}, current: ${currentCount}`);
      return;
    }

    const newViewers: ViewerInstance[] = [];
    for (let i = 0; i < newViewersToAdd; i++) {
      newViewers.push({
        id: (Date.now() + i).toString(),
        createdAt: new Date()
      });
    }

    setViewers(prev => [...prev, ...newViewers]);

    if (newViewersToAdd < count) {
      alert(`Added ${newViewersToAdd} viewers (reached maximum of ${maxViewers})`);
    }
  };

  const removeViewer = (id: string) => {
    if (viewers.length > 1) {
      setViewers(prev => prev.filter(viewer => viewer.id !== id));
    }
  };

  const removeAllViewers = () => {
    if (window.confirm('Are you sure you want to close all viewers except one?')) {
      setViewers([viewers[0]]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addViewers();
    }
  };

  const canAddMore = viewers.length < maxViewers;
  const availableSlots = maxViewers - viewers.length;

  return (
    <div className="multi-document-viewer">
      <div className="viewer-header">
        <div className="viewer-info">
          <h2>Document Viewer</h2>
          {showViewerCount && (
            <div className="viewer-stats">
              <span className="viewer-count">
                {viewers.length} viewer{viewers.length !== 1 ? 's' : ''} open
              </span>
              <span className="viewer-limit">
                (Max: {maxViewers})
              </span>
            </div>
          )}
        </div>
        
        <div className="viewer-controls">
          {allowDynamicAdd && (
            <>
              <div className="add-viewers-section">
                <input
                  type="number"
                  value={viewerCount}
                  onChange={(e) => setViewerCount(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Number"
                  min="1"
                  max={availableSlots}
                  className="viewer-count-input"
                />
                <button
                  className="add-viewers-btn"
                  onClick={addViewers}
                  disabled={!canAddMore || !viewerCount || parseInt(viewerCount, 10) <= 0}
                  title={canAddMore ? `Add ${viewerCount || 0} viewer(s) (${availableSlots} slots available)` : `Maximum viewers reached (${maxViewers})`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add {viewerCount && parseInt(viewerCount, 10) > 0 ? `(${viewerCount})` : ''}
                </button>
              </div>

              {viewers.length > 1 && (
                <button 
                  className="remove-all-btn" 
                  onClick={removeAllViewers}
                  title="Close All Viewers (Keep One)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Close All
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="viewers-container">
        {viewers.map((viewer) => (
          <div key={viewer.id} className="viewer-wrapper">
            <DocumentViewer
              id={viewer.id}
              onClose={removeViewer}
            />
          </div>
        ))}
      </div>
    </div>
  );
};