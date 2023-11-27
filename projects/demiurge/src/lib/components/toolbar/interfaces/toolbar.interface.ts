export interface DemiToggleMenuItemConfig {
  label: string;
  url: string;
  disabled?: string;
  icon?: string;
}

export interface DemiToolbarConfig {
  title?: string;
  toggleable?: boolean;
  toggleTitle?: string;
  defaultPath?: string;
  items?: DemiToggleMenuItemConfig[];
}
