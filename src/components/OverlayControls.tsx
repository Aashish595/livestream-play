import { useState } from 'react';
import { Plus, Eye, EyeOff } from 'lucide-react';
import { Overlay, OverlayFormData } from '../types/overlay';

interface OverlayControlsProps {
  overlays: Overlay[];
  onAdd: (data: OverlayFormData) => void;
  onToggleVisibility: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function OverlayControls({ overlays, onAdd, onToggleVisibility, onDelete }: OverlayControlsProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<OverlayFormData>({
    type: 'text',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.content.trim()) {
      onAdd(formData);
      setFormData({ type: 'text', content: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Overlay Controls</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Overlay
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overlay Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="text">Text</option>
              <option value="logo">Logo</option>
              <option value="image">Image</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.type === 'text' ? 'Text Content' : 'Image URL'}
            </label>
            <input
              type="text"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder={formData.type === 'text' ? 'Enter text...' : 'https://example.com/logo.png'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Overlay
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Active Overlays ({overlays.length})
        </h3>
        {overlays.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No overlays added yet</p>
        ) : (
          <div className="space-y-2">
            {overlays.map((overlay) => (
              <div
                key={overlay.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500 uppercase">
                      {overlay.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 truncate mt-1">
                    {overlay.type === 'text'
                      ? overlay.content
                      : overlay.content.substring(0, 40) + '...'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleVisibility(overlay.id)}
                    className={`p-2 rounded transition-colors ${
                      overlay.isVisible
                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                    }`}
                    aria-label={overlay.isVisible ? 'Hide overlay' : 'Show overlay'}
                  >
                    {overlay.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => onDelete(overlay.id)}
                    className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                    aria-label="Delete overlay"
                  >
                    <Plus size={18} className="rotate-45" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
