# Online PDF Compare

A React component library for viewing and comparing multiple documents side by side. Supports PDF, images, and other document formats with zoom, download, and multi-viewer capabilities.

[![npm version](https://badge.fury.io/js/document-viewer.svg)](https://badge.fury.io/js/document-viewer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 📄 **Multi-Document Viewer**: View multiple documents simultaneously
- 🔍 **Zoom Controls**: Zoom in, zoom out, and reset document scale
- 📥 **Download Support**: Download documents directly from the viewer
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ⚙️ **Configurable**: Customizable viewer limits and initial settings
- 🎨 **Modern UI**: Clean, professional interface with smooth animations

## Installation

```bash
npm install @swapnachalla/document-viewer
```

or

```bash
yarn add @swapnachalla/document-viewer
```

## Quick Start

```jsx
import React from 'react';
import { MultiDocumentViewer } from 'document-viewer';
import 'document-viewer/dist/index.css';

function App() {
  return (
    <div className="App">
      <MultiDocumentViewer />
    </div>
  );
}

export default App;
```

## Components

### MultiDocumentViewer

The main component that manages multiple document viewers.

```jsx
import { MultiDocumentViewer } from 'document-viewer';

<MultiDocumentViewer
  maxViewers={8}           // Maximum number of viewers (default: 10)
  initialViewers={2}       // Initial number of viewers (default: 1)
  allowDynamicAdd={true}   // Allow adding viewers dynamically (default: true)
  showViewerCount={true}   // Show viewer count and limit (default: true)
/>
```

### DocumentViewer

Individual document viewer component.

```jsx
import { DocumentViewer } from 'document-viewer';

<DocumentViewer
  id="viewer-1"
  initialUrl="https://example.com/document.pdf"
  onClose={(id) => console.log(`Closed viewer: ${id}`)}
/>
```

### DocumentZoom

Standalone zoom controls component.

```jsx
import { DocumentZoom } from 'document-viewer';

<DocumentZoom
  scale={1.0}
  onZoomIn={() => setScale(s => Math.min(s + 0.25, 3.0))}
  onZoomOut={() => setScale(s => Math.max(s - 0.25, 0.5))}
  onReset={() => setScale(1.0)}
  minScale={0.5}
  maxScale={3.0}
/>
```

### DocumentDownload

Standalone download component.

```jsx
import { DocumentDownload } from 'document-viewer';

<DocumentDownload
  documentUrl="https://example.com/document.pdf"
  documentTitle="My Document"
  onDownload={() => console.log('Document downloaded')}
/>
```

## API Reference

### MultiDocumentViewer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxViewers` | `number` | `10` | Maximum number of viewers allowed |
| `initialViewers` | `number` | `1` | Number of viewers to start with |
| `allowDynamicAdd` | `boolean` | `true` | Allow users to add/remove viewers |
| `showViewerCount` | `boolean` | `true` | Show viewer count and limit |

### DocumentViewer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | *required* | Unique identifier for the viewer |
| `initialUrl` | `string` | `""` | Initial document URL to load |
| `onClose` | `(id: string) => void` | *required* | Callback when viewer is closed |

### DocumentZoom Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scale` | `number` | *required* | Current scale/zoom level |
| `onZoomIn` | `() => void` | *required* | Callback for zoom in action |
| `onZoomOut` | `() => void` | *required* | Callback for zoom out action |
| `onReset` | `() => void` | *required* | Callback for reset zoom action |
| `minScale` | `number` | `0.5` | Minimum zoom scale |
| `maxScale` | `number` | `3.0` | Maximum zoom scale |

### DocumentDownload Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `documentUrl` | `string` | *required* | URL of the document to download |
| `documentTitle` | `string` | *required* | Title/filename for the download |
| `onDownload` | `() => void` | `undefined` | Optional callback after download |

## Usage Examples

### Basic Multi-Viewer Setup

```jsx
import React from 'react';
import { MultiDocumentViewer } from 'document-viewer';
import 'document-viewer/dist/index.css';

function DocumentCompareApp() {
  return (
    <div style={{ height: '100vh' }}>
      <MultiDocumentViewer
        maxViewers={4}
        initialViewers={2}
        showViewerCount={true}
      />
    </div>
  );
}
```

### Custom Document Viewer

```jsx
import React, { useState } from 'react';
import { DocumentViewer, DocumentZoom, DocumentDownload } from 'document-viewer';

function CustomViewer() {
  const [scale, setScale] = useState(1.0);
  
  return (
    <div>
      <DocumentViewer
        id="custom-viewer"
        initialUrl="https://example.com/sample.pdf"
        onClose={(id) => console.log(`Viewer ${id} closed`)}
      />
      
      {/* Custom controls */}
      <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
        <DocumentZoom
          scale={scale}
          onZoomIn={() => setScale(s => Math.min(s + 0.25, 3.0))}
          onZoomOut={() => setScale(s => Math.max(s - 0.25, 0.5))}
          onReset={() => setScale(1.0)}
        />
        
        <DocumentDownload
          documentUrl="https://example.com/sample.pdf"
          documentTitle="Sample Document"
          onDownload={() => alert('Download started!')}
        />
      </div>
    </div>
  );
}
```

### Responsive Layout

```jsx
import React from 'react';
import { MultiDocumentViewer } from 'document-viewer';

function ResponsiveApp() {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          padding: 0;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 10px;
          }
        }
      `}</style>
      
      <MultiDocumentViewer
        maxViewers={6}
        initialViewers={1}
        allowDynamicAdd={true}
      />
    </div>
  );
}
```

## Styling

The library includes default CSS styles. Import the styles in your main application file:

```jsx
import 'document-viewer/dist/index.css';
```

### Custom Styling

You can override the default styles by targeting the component classes:

```css
/* Override viewer header background */
.viewer-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white;
}

/* Customize zoom controls */
.zoom-controls {
  background-color: #f0f0f0 !important;
  border-radius: 8px !important;
}

/* Style add button */
.add-viewers-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%) !important;
}
```

## Supported Formats

The library supports viewing various document formats:

- **PDF files** (.pdf)
- **Images** (.jpg, .jpeg, .png, .gif, .bmp, .webp)
- **Web documents** (any URL that can be displayed in an iframe)

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## TypeScript Support

The library includes TypeScript definitions out of the box. No additional installation required.

```tsx
import { MultiDocumentViewer, DocumentViewerProps } from 'document-viewer';

const config: DocumentViewerProps = {
  id: 'viewer-1',
  initialUrl: 'https://example.com/doc.pdf',
  onClose: (id: string) => console.log(id)
};
```
## Test Screenshot
<img width="1873" height="947" alt="image" src="https://github.com/swapnachalla/Document-Viewer/blob/main/src/components/MultiDocumentViewer/Document-Viewer-Test.png" />

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md).

### Development Setup

```bash
# Clone the repository
git clone https://github.com/swapnachalla/document-viewer.git
cd document-viewer

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## License

MIT © [Swapna Challa](https://github.com/swapnachalla)

## Support

- 🐛 Issues: [GitHub Issues](https://github.com/swapnachalla/document-viewer/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/swapnachalla/document-viewer/discussions)

## Changelog

### v1.0.0
- Initial release
- Multi-document viewer support
- Zoom and download functionality
- Responsive design
- TypeScript support

---

Made with ❤️ by [Swapna Challa](https://github.com/swapnachalla)

## [![Stargazers repo roster for @swapnachalla/Document-Viewer](https://reporoster.com/stars/dark/notext/swapnachalla/Document-Viewer)](https://github.com/swapnachalla/Document-Viewer/stargazers)
