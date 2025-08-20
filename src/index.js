import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


export { MultiDocumentViewer } from './components/MultiDocumentViewer/MultiDocumentViewer';
export { DocumentViewer } from './components/DocumentViewer/DocumentViewer';
export { DocumentZoom } from './components/DocumentZoom/DocumentZoom';
export { DocumentDownload } from './components/DocumentDownload/DocumentDownload';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

