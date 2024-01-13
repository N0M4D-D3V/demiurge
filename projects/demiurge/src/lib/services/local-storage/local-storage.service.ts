import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DemiLocalStorageService {
  constructor() {}

  public save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string): T | undefined {
    const plainItem: string | null = localStorage.getItem(key);

    if (plainItem) return JSON.parse(plainItem) as T;

    console.log(`Item with key '${key}' has no value`);
    return;
  }

  public delete(key: string): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
