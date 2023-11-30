export interface DemiCardConfig {
  id?: string;

  title: string;
  description?: string;

  isClickable?: boolean;
  cssClass?: string;

  size?: DemiCardSize;

  onCardTouched(): void;
}

export enum DemiCardSize {
  S = 'small',
  M = 'medium',
  L = 'large',
  XL = 'x-large',
}
