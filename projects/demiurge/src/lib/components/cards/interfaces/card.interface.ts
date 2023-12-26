export interface DemiCardConfig {
  isClickable?: boolean;
  canSearch?: boolean;
  displayImg?: boolean;

  cssClass?: string;

  size?: DemiCardSize;
}

export interface DemiCardItem {
  title: string;

  subtitle?: string;
  imgUrl?: string;
}

export enum DemiCardSize {
  S = 'small',
  M = 'medium',
  L = 'large',
  XL = 'x-large',
  Res = 'responsive',
}
