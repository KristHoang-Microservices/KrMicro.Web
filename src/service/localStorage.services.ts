class LocalStorageServices {
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const stringifiedValue: string | null = localStorage.getItem(key);
    if (stringifiedValue === null) return null;

    return JSON.parse(stringifiedValue) as T;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export const localStorageServices = new LocalStorageServices();
