
import { MultiDocumentViewer } from './components/MultiDocumentViewer/MultiDocumentViewer';
import './App.css';

function App() {
  return (
    <div className="App">
      <MultiDocumentViewer
        maxViewers={8}           // Maximum number of viewers allowed
        initialViewers={2}       // Number of viewers to start with
        allowDynamicAdd={true}   // Allow adding viewers dynamically
        showViewerCount={true}   // Show viewer count and limit
      />
    </div>
  );
}

export default App;
