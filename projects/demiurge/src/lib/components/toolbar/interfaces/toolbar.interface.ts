export interface DemiToolbarMenuItemConfig {
  label: string;
  url: string;

  toggleable?: boolean;
  disabled?: boolean;
  hidden?: boolean;

  icon?: string;

  activeButtons?: DemiToolbarButtonType[];
}

export interface DemiToolbarConfig {
  title?: string;
  toggleTitle?: string;
  defaultPath?: string;
  items: DemiToolbarMenuItemConfig[];

  canLogout?: boolean;

  defaultProfileImgPath?: string;
  defaultTitle?: string;
}

export type DemiToolbarButtonType = 'back' | 'toggle' | 'search';
