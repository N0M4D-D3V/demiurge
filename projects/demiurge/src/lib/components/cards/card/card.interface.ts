export interface CardConfig {
  title: string;
  description?: string;

  isClickable?: boolean;
  cssClass?: string;

  onCardTouched(): void;
}
