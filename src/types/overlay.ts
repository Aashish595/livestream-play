export interface Overlay {
  id: string;
  type: 'text' | 'logo' | 'image';
  content: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  zIndex: number;
  isVisible: boolean;
}

export interface OverlayFormData {
  type: 'text' | 'logo' | 'image';
  content: string;
}
