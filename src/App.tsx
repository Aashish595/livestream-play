import { useState, useRef } from 'react';
import { Video } from 'lucide-react';
import VideoPlayer from './components/VideoPlayer';
import OverlayControls from './components/OverlayControls';
import OverlayItem from './components/OverlayItem';
import { Overlay, OverlayFormData } from './types/overlay';

function App() {
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const streamUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const handleAddOverlay = (data: OverlayFormData) => {
    const newOverlay: Overlay = {
      id: crypto.randomUUID(),
      type: data.type,
      content: data.content,
      positionX: 50,
      positionY: 50,
      width: data.type === 'text' ? 250 : 150,
      height: data.type === 'text' ? 80 : 150,
      zIndex: overlays.length + 1,
      isVisible: true,
    };
    setOverlays([...overlays, newOverlay]);
  };

  const handleUpdateOverlay = (id: string, updates: Partial<Overlay>) => {
    setOverlays(overlays.map((overlay) =>
      overlay.id === id ? { ...overlay, ...updates } : overlay
    ));
  };

  const handleDeleteOverlay = (id: string) => {
    setOverlays(overlays.filter((overlay) => overlay.id !== id));
  };

  const handleToggleVisibility = (id: string) => {
    setOverlays(overlays.map((overlay) =>
      overlay.id === id ? { ...overlay, isVisible: !overlay.isVisible } : overlay
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Video className="text-blue-500" size={32} />
            <h1 className="text-2xl font-bold text-white">Livestream Overlay Studio</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative" ref={videoContainerRef}>
              <VideoPlayer streamUrl={streamUrl} />

              {overlays.map((overlay) => (
                <OverlayItem
                  key={overlay.id}
                  overlay={overlay}
                  onUpdate={handleUpdateOverlay}
                  onDelete={handleDeleteOverlay}
                  containerRef={videoContainerRef}
                />
              ))}
            </div>

            <div className="mt-6 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <h3 className="text-white font-semibold mb-2">Instructions</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Click and drag overlays to reposition them</li>
                <li>• Drag the bottom-right corner to resize</li>
                <li>• Use the controls panel to add, hide, or remove overlays</li>
                <li>• Video controls are at the bottom of the player</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <OverlayControls
              overlays={overlays}
              onAdd={handleAddOverlay}
              onToggleVisibility={handleToggleVisibility}
              onDelete={handleDeleteOverlay}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
