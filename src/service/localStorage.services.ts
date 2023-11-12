"use client";
class LocalStorageServices {
  set<T>(key: string, value: T): void {
    if (typeof window !== "undefined")
      localStorage?.setItem(key, JSON.stringify(value));
  }
  get<T>(key: string): T | null {
    if (typeof window !== "undefined") {
      const stringifiedValue: string | null = localStorage?.getItem(key);
      if (stringifiedValue === null) return null;

      return JSON.parse(stringifiedValue) as T;
    }
    return null;
  }
  remove(key: string): void {
    if (typeof window !== "undefined") localStorage?.removeItem(key);
  }
}

export const localStorageServices = new LocalStorageServices();
