export interface DemiToolbarMenuItemConfig {
  label: string;
  url: string;
  activeButtons?: DemiToolbarButtonType[];
  toggleable?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  icon?: string;
}

export interface DemiToolbarConfig {
  title?: string;
  toggleTitle?: string;
  defaultPath?: string;
  items: DemiToolbarMenuItemConfig[];
}

export type DemiToolbarButtonType = 'back' | 'toggle';
