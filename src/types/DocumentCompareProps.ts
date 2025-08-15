import * as pdfjsLib from 'pdfjs-dist';

export interface FileInfo {
  type: 'pdf' | 'image';
  extension: string;
}

export interface DocumentData {
  type: 'pdf' | 'image';
  pdf?: pdfjsLib.PDFDocumentProxy;
  image?: HTMLImageElement;
  width?: number;
  height?: number;
  numPages: number;
}

export interface ViewerState {
  id: number;
  url: string;
  scale: number;
  currentPage: number;
}

export interface DocumentViewerProps {
  url: string;
  scale: number;
  currentPage: number;
  onPageChange: (viewerId: number, newPage: number, newUrl?: string) => void;
  onZoomChange: (viewerId: number, delta: number, isReset?: boolean) => void;
  viewerId: number;
  className?: string;
  showControls?: boolean;
  showDownload?: boolean;
}

export interface PDFMetadata {
  info?: {
    Title?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface DocumentViewerConfig {
  maxZoom?: number;
  minZoom?: number;
  defaultZoom?: number;
  maxViewers?: number;
  corsProxy?: string;
  enableDownload?: boolean;
  enableMultipleViewers?: boolean;
}

export interface DocumentCompareProps {
  initialUrls?: string[];
  config?: DocumentViewerConfig;
  className?: string;
  onDocumentLoad?: (viewerId: number, document: DocumentData) => void;
  onError?: (viewerId: number, error: string) => void;
}