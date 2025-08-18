import React from 'react';
import { DocumentCompare } from './components/DocumentCompare';
import './index.css'
/**
 * Main application component - now just a wrapper around DocumentCompare
 */
const App: React.FC = () => {
  const sampleUrls = [
    'https://i.natgeofe.com/n/98d12234-9585-4189-83d6-c6437f2f3272/NationalGeographic_707610.jpg',
    'https://export.arxiv.org/pdf/1706.03762',
  ];

  return (
    <div className="h-screen">
      <DocumentCompare
        initialUrls={sampleUrls}
        config={{
          maxZoom: 2.0,
          minZoom: 0.25,
          defaultZoom: 1.5,
          maxViewers: 6,
          enableDownload: true,
          enableMultipleViewers: true,
        }}
        className="h-full"
        onDocumentLoad={(viewerId, document) => {
          console.log(`Document loaded in viewer ${viewerId}:`, document);
        }}
        onError={(viewerId, error) => {
          console.error(`Error in viewer ${viewerId}:`, error);
        }}
      />
    </div>
  );
};

export default App;
