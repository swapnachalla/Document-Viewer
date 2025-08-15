# React Document Viewer & Compare

A modern, feature-rich React component library for viewing and comparing PDF documents and images side-by-side. Built with TypeScript, PDF.js, and Tailwind CSS.

## ✨ Features

- 📄 **PDF Support**: View PDF documents with full page navigation
- 🖼️ **Image Support**: Display various image formats (JPEG, PNG, GIF, WebP)
- 🔍 **Zoom Controls**: Zoom in, out, and reset functionality
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ⚡ **High Performance**: Optimized rendering with canvas-based display
- 🔗 **URL Loading**: Load documents from any accessible URL
- 💾 **Download Support**: Download documents with fallback strategies
- 🎨 **Customizable**: Flexible configuration and styling options
- 🔄 **Side-by-Side Comparison**: Compare multiple documents simultaneously
- 🛡️ **TypeScript**: Full TypeScript support with comprehensive type definitions

## 🚀 Quick Start

### Installation

```bash
npm install @online-pdf-compare/react-document-viewer
```

### Basic Usage

```tsx
import React, { useState } from 'react';
import { DocumentViewer, DocumentCompare } from '@online-pdf-compare/react-document-viewer';

// Single document viewer
function SingleViewer() {
  const [url, setUrl] = useState('');
  const [scale, setScale] = useState(1.5);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <DocumentViewer
      url={url}
      scale={scale}
      currentPage={currentPage}
      onPageChange={(viewerId, newPage, newUrl) => {
        setCurrentPage(newPage);
        if (newUrl) setUrl(newUrl);
      }}
      onZoomChange={(viewerId, delta, isReset) => {
        setScale(isReset ? delta : scale + delta);
      }}
      viewerId={1}
    />
  );
}

// Document comparison tool
function ComparisonTool() {
  return (
    <DocumentCompare
      initialUrls={[
        'https://example.com/document1.pdf',
        'https://example.com/document2.pdf'
      ]}
      config={{
        maxZoom: 3.0,
        minZoom: 0.1,
        defaultZoom: 1.5,
        maxViewers: 4,
        enableDownload: true,
        enableMultipleViewers: true,
      }}
      onDocumentLoad={(viewerId, document) => {
        console.log(`Document loaded in viewer ${viewerId}`, document);
      }}
      onError={(viewerId, error) => {
        console.error(`Error in viewer ${viewerId}:`, error);
      }}
    />
  );
}
```

## 📖 API Reference

### DocumentViewer Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `url` | `string` | ✅ | - | Document URL (PDF or image) |
| `scale` | `number` | ✅ | - | Zoom scale (0.25 - 2.0) |
| `currentPage` | `number` | ✅ | - | Current page number (PDF only) |
| `onPageChange` | `function` | ✅ | - | Page/URL change handler |
| `onZoomChange` | `function` | ✅ | - | Zoom change handler |
| `viewerId` | `number` | ✅ | - | Unique viewer identifier |
| `className` | `string` | ❌ | `''` | Additional CSS classes |
| `showControls` | `boolean` | ❌ | `true` | Show/hide control bar |
| `showDownload` | `boolean` | ❌ | `true` | Show/hide download button |

### DocumentCompare Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `initialUrls` | `string[]` | ❌ | `['', '']` | Initial document URLs |
| `config` | `DocumentViewerConfig` | ❌ | See below | Viewer configuration |
| `className` | `string` | ❌ | `''` | Additional CSS classes |
| `onDocumentLoad` | `function` | ❌ | - | Document load callback |
| `onError` | `function` | ❌ | - | Error callback |

### DocumentViewerConfig

```typescript
interface DocumentViewerConfig {
  maxZoom?: number;          // Maximum zoom level (default: 2.0)
  minZoom?: number;          // Minimum zoom level (default: 0.25)
  defaultZoom?: number;      // Default zoom level (default: 1.5)
  maxViewers?: number;       // Maximum number of viewers (default: 6)
  corsProxy?: string;        // CORS proxy URL
  enableDownload?: boolean;  // Enable download functionality (default: true)
  enableMultipleViewers?: boolean; // Enable multiple viewers (default: true)
}
```

## 🎨 Styling

The component uses Tailwind CSS classes. You can customize the appearance by:

1. **Overriding CSS classes**: Pass custom `className` props
2. **CSS-in-JS**: Use styled-components or emotion
3. **CSS Modules**: Import custom stylesheets
4. **Tailwind customization**: Extend Tailwind configuration

```tsx
<DocumentCompare 
  className="custom-document-compare border-4 border-blue-500"
  config={{ enableMultipleViewers: false }}
/>
```

## 🔧 Advanced Usage

### Custom Hooks

```tsx
import { useDocumentLoader, useDocumentRenderer } from '@online-pdf-compare/react-document-viewer';

function CustomViewer({ url }: { url: string }) {
  const { document, loading, error } = useDocumentLoader(url);
  const canvasRef = useDocumentRenderer(document, 1.5, 1);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <canvas ref={canvasRef} />;
}
```

### Service Functions

```tsx
import { downloadDocument, detectFileType } from '@online-pdf-compare/react-document-viewer';

// Download a document
await downloadDocument('https://example.com/doc.pdf', document);

// Detect file type
const fileInfo = detectFileType('https://example.com/image.jpg');
console.log(fileInfo); // { type: 'image', extension: 'jpg' }
```

## 🧪 Testing

The library includes comprehensive tests using Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

### Test Coverage

The project maintains high test coverage across:
- ✅ Component rendering and interactions
- ✅ Hook functionality and state management
- ✅ Service functions and error handling
- ✅ Utility functions and edge cases
- ✅ TypeScript type safety

### Example Test

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentViewer } from '@online-pdf-compare/react-document-viewer';

test('should handle URL input changes', () => {
  const onPageChange = jest.fn();
  
  render(<DocumentViewer {...props} onPageChange={onPageChange} />);
  
  const input = screen.getByPlaceholderText('Enter document URL (PDF or image)');
  fireEvent.change(input, { target: { value: 'https://example.com/new.pdf' } });
  
  expect(onPageChange).toHaveBeenCalledWith(1, 1, 'https://example.com/new.pdf');
});
```

## 🌐 Browser Support

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ Internet Explorer: Not supported

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm 8+

### Local Development

```bash
# Clone the repository
git clone https://github.com/swapnachalla/react-document-viewer.git

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Type checking
npm run type-check
```

### Project Structure

```
src/
├── components/          # React components
│   ├── DocumentViewer.tsx
│   ├── DocumentCompare.tsx
│   └── __tests__/
├── hooks/              # Custom React hooks
│   ├── useDocumentLoader.ts
│   └── useDocumentRenderer.ts
├── services/           # Business logic services
│   ├── pdfService.ts
│   ├── imageService.ts
│   └── downloadService.ts
├── utils/              # Utility functions
│   └── fileUtils.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── index.ts           # Main library exports
```

## 🐛 Known Issues

1. **CORS Limitations**: Some external PDFs may not load due to CORS restrictions
2. **Large File Performance**: Very large PDFs (>50MB) may cause performance issues
3. **Mobile Zoom**: Touch zoom gestures not yet implemented
4. **IE Support**: Internet Explorer is not supported

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make changes and add tests
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add my feature'`
6. Push to branch: `git push origin feature/my-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF rendering engine
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📞 Support

- 📧 Email: contact@onlinepdfcompare.com
- 🐛 Issues: [GitHub Issues](https://github.com/swapnachalla/document-viewer/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/swapnachalla/document-viewer/discussions)
- 📖 Documentation: [Full Documentation](https://swapnachalla.github.io/document-viewer)

---

Made with ❤️ by the Online PDF Compare Team
