import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DemiLocalStorageService {
  constructor() {}

  public save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string): T {
    const plainItem: string | null = localStorage.getItem(key);

    if (plainItem) return JSON.parse(plainItem) as T;
    else throw new Error(`Item with key '${key}' has no value`);
  }

  public delete(key: string): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
