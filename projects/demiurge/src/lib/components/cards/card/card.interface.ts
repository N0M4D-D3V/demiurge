export interface DemiCardConfig<T = any> {
  id?: string;

  title: string;
  description?: string;
  imgUrl?: string;

  data?: T;

  isClickable?: boolean;
  cssClass?: string;

  size?: DemiCardSize;
}

export enum DemiCardSize {
  S = 'small',
  M = 'medium',
  L = 'large',
  XL = 'x-large',
}
