import React from 'react';
import './DocumentZoom.css';

export interface DocumentZoomProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  minScale?: number;
  maxScale?: number;
}

export const DocumentZoom: React.FC<DocumentZoomProps> = ({
  scale,
  onZoomIn,
  onZoomOut,
  onReset,
  minScale = 0.5,
  maxScale = 3.0
}) => {
  const canZoomIn = scale < maxScale;
  const canZoomOut = scale > minScale;

  return (
    <div className="zoom-controls">
      <button 
        className="zoom-btn zoom-out" 
        onClick={onZoomOut}
        disabled={!canZoomOut}
        title="Zoom Out"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </button>
      
      <span className="zoom-level">{Math.round(scale * 100)}%</span>
      
      <button 
        className="zoom-btn zoom-in" 
        onClick={onZoomIn}
        disabled={!canZoomIn}
        title="Zoom In"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </button>
      
      <button 
        className="zoom-btn zoom-reset" 
        onClick={onReset}
        title="Reset Zoom"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M1 4v6h6"/>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
        </svg>
      </button>
    </div>
  );
};