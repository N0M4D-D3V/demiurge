export interface DemiCardConfig {
  isClickable?: boolean;
  canSearch?: boolean;
  displayImg?: boolean;

  cssClass?: string;

  size?: DemiCardSize;
  icon?: BsIcon;
}

export interface DemiCardItem {
  title?: string;

  subtitle?: string;

  /**
   * This text will appears at the bottom if demi-card-img.
   * In others cards it won't appears.
   */
  bottomText?: string;

  imgUrl?: string;
}

export enum DemiCardSize {
  S = 'small',
  M = 'medium',
  L = 'large',
  XL = 'x-large',
  Res = 'responsive',
}

export enum BsIcon {
  Download = 'bi-download',
  Glasses = 'bi-eyeglasses',
  Play = 'bi-play-fill',
}
