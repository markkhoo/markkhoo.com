import type { HTMLImgAttributes } from 'svelte/elements';

export type KeyType = 'My Computer' | 'Internet Explorer' | 'Recycling Bin';
export type WindowType = {
  key: KeyType;
  active: boolean;
  initPosLeft?: number;
  initPosTop?: number;
  src: HTMLImgAttributes['src'];
  state: 'maximized' | 'minimized' | 'normal' | 'closed';
  onMinimizeClick?: () => void;
  onMaximizeClick?: () => void;
  onCloseClick?: () => void;
  onTaskbarClick?: () => void;
};
