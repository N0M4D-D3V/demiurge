export interface DemiToggleMenuItemConfig {
  label: string;
  url: string;
  disabled?: string;
}

export interface DemiToolbarConfig {
  title: string;
  toggleTitle: string;
  defaultPath: string;
  items: DemiToggleMenuItemConfig[];
}
