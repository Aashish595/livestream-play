import { useState, useRef, useEffect } from 'react';
import { Overlay } from '../types/overlay';
import { Move, Trash2 } from 'lucide-react';

interface OverlayItemProps {
  overlay: Overlay;
  onUpdate: (id: string, updates: Partial<Overlay>) => void;
  onDelete: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function OverlayItem({ overlay, onUpdate, onDelete, containerRef }: OverlayItemProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;

        const newX = Math.max(0, Math.min(initialPos.current.x + deltaX, containerRect.width - overlay.width));
        const newY = Math.max(0, Math.min(initialPos.current.y + deltaY, containerRect.height - overlay.height));

        onUpdate(overlay.id, { positionX: newX, positionY: newY });
      } else if (isResizing) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;

        const newWidth = Math.max(50, initialSize.current.width + deltaX);
        const newHeight = Math.max(30, initialSize.current.height + deltaY);

        onUpdate(overlay.id, { width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, overlay, onUpdate, containerRef]);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { x: overlay.positionX, y: overlay.positionY };
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialSize.current = { width: overlay.width, height: overlay.height };
  };

  if (!overlay.isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="absolute group cursor-move border-2 border-transparent hover:border-blue-500 transition-all"
      style={{
        left: overlay.positionX,
        top: overlay.positionY,
        width: overlay.width,
        height: overlay.height,
        zIndex: overlay.zIndex,
      }}
      onMouseDown={handleDragStart}
    >
      <div className="w-full h-full flex items-center justify-center">
        {overlay.type === 'text' ? (
          <div className="text-white font-bold text-xl bg-black/50 px-4 py-2 rounded backdrop-blur-sm">
            {overlay.content}
          </div>
        ) : overlay.type === 'logo' || overlay.type === 'image' ? (
          <img
            src={overlay.content}
            alt="Overlay"
            className="w-full h-full object-contain"
            draggable={false}
          />
        ) : null}
      </div>

      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(overlay.id);
          }}
          className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
          aria-label="Delete overlay"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Move size={14} className="text-white" />
      </div>

      <div
        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-nwse-resize opacity-0 group-hover:opacity-100"
        onMouseDown={handleResizeStart}
      />
    </div>
  );
}
