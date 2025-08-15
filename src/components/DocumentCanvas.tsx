// filepath: /workspaces/online-pdf-compare/src/components/DocumentCanvas.tsx
import React from 'react';
import { DocumentData } from '../types/DocumentCompareProps';

interface DocumentCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  url: string;
  loading: boolean;
  error: string;
  document: DocumentData | null;
}

export const DocumentCanvas: React.FC<DocumentCanvasProps> = ({
  canvasRef,
  url,
  loading,
  error,
  document
}) => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
      {!url && <div className="text-center text-gray-500">Enter a document URL to begin</div>}
      {loading && <div className="text-center text-blue-500 p-4">Loading document...</div>}
      {error && <div className="text-center text-red-500 p-4">{error}</div>}
      {document && (
        <canvas
          ref={canvasRef}
          className="shadow-lg border border-gray-200 max-w-full max-h-full"
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      )}
    </div>
  );
};