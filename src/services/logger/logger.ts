// handles logging of the app
class LoggerService {
  constructor() {
    // Optional setup
  }

  log(...args: unknown[]): void {
    console.log(...args);
  }

  logError(...args: unknown[]): void {
    console.error(...args);
  }
}

const logger = new LoggerService();
export default logger;
