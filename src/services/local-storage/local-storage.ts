import { LocalStorageKeys } from "../../constants/local-storage-keys";
import { helpers } from "../../utils/helpers/helpers";
import logger from "../logger/logger";

interface MultiKeys {
  [key: string]: string;
}

class LocalStorageService {
  constructor() {
    // Optional: initialization logic here
  }

  isAuthenticated(): boolean {
    try {
      return !!this.getKey(LocalStorageKeys.AUTH_TOKEN)
    } catch (err) {
      return false
      console.error(err)
    }
  }

  stringifiedValue(value: unknown) {
    try {
      if (typeof value === "string") {
        // no need to stringify the value
        return value;
      }
      return JSON.stringify(value);
    } catch (err) {
      logger.logError(err);
    }
  }

  setKey(key: string, value: string): void {
    try {
      const stringValue = this.stringifiedValue(value);
      localStorage.setItem(key, stringValue);
    } catch (e) {
      logger.logError("Failed to set key", e);
    }
  }

  setMulti(dataObj: MultiKeys) {
    try {
      if (!helpers.isObjectEmpty(dataObj)) {
        Object.keys(dataObj).forEach((key) => {
          this.setKey(key, dataObj[key]);
        });
      }
    } catch (e) {
      logger.logError("Failed to set multi keys", e);
    }
  }

  getKey<T = unknown>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return this.parse(value)
    } catch (e) {
      logger.logError("Failed to read from localStorage:", e);
      return null;
    }
  }

  parse(value: unknown) {
    try {
      if (typeof value === "string") {
        // no need to parse the value
        return value;
      }
      return JSON.parse(value);
    } catch (err) {
      logger.logError(err);
    }
  }

  removeKey(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      logger.logError("Failed to remove from localStorage:", e);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      logger.logError("Failed to clear localStorage:", e);
    }
  }
}

const localStorageService = new LocalStorageService();
export default localStorageService;
