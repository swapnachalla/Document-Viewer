import { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { DocumentData } from '../types/DocumentCompareProps';

/**
 * Hook for rendering documents on canvas
 */
export const useDocumentRenderer = (
  document: DocumentData | null,
  scale: number,
  currentPage: number,
  onError?: (error: Error) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderingTaskRef = useRef<pdfjsLib.RenderTask | null>(null);

  useEffect(() => {
    if (!document || !canvasRef.current) return;

    // Cancel any ongoing rendering task
    if (renderingTaskRef.current) {
      try {
        renderingTaskRef.current.cancel();
      } catch (e) {
        // Ignore cancellation errors
      }
      renderingTaskRef.current = null;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const renderDocument = async (): Promise<void> => {
      try {
        if (document.type === 'image' && document.image) {
          const img = document.image;
          
          const scaledWidth = img.naturalWidth * scale;
          const scaledHeight = img.naturalHeight * scale;
          
          canvas.width = scaledWidth;
          canvas.height = scaledHeight;
          
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, scaledWidth, scaledHeight);
          
        } else if (document.type === 'pdf' && document.pdf) {
          const page = await document.pdf.getPage(currentPage);
          const viewport = page.getViewport({ scale });
          
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          context.clearRect(0, 0, canvas.width, canvas.height);

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          
          const renderTask = page.render(renderContext);
          renderingTaskRef.current = renderTask;
          
          await renderTask.promise;
          renderingTaskRef.current = null;
        }
      } catch (err) {
        const error = err as Error;
        if (error.name !== 'RenderingCancelledException') {
          console.error('Rendering error:', error);
          onError?.(new Error(`Error rendering: ${error.message}`));
        }
        renderingTaskRef.current = null;
      }
    };

    renderDocument();

    return () => {
      if (renderingTaskRef.current) {
        try {
          renderingTaskRef.current.cancel();
        } catch (e) {
          // Ignore cleanup errors
        }
        renderingTaskRef.current = null;
      }
    };
  }, [document, scale, currentPage, onError]);

  return canvasRef;
};