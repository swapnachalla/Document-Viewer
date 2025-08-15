npm install -D typescript @types/react @types/react-dom @types/nodenpm install -D typescript @types/react @types/react-dom @types/node@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/* Document viewer specific styles */
.document-viewer {
  @apply h-full flex flex-col bg-gray-100;
}

.zoom-controls {
  @apply flex items-center space-x-1;
}

.page-navigation {
  @apply flex items-center space-x-1;
}

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
