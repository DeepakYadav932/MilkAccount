import logger from "../../../services/logger/logger";

export const dateHelpers = {
  /**
   * Returns an array of objects for each day in the given month.
   * Each object contains { label: dayNumber, value: dayNumber }
   */
  getMonthDates: (
    monthNumber: number,
    year?: number
  ): { label: number; value: number }[] => {
    try {
      const currentYear = year ?? new Date().getFullYear();
      const jsMonthIndex = monthNumber - 1;

      const daysInMonth = new Date(currentYear, jsMonthIndex + 1, 0).getDate();

      const dateArray = Array.from({ length: daysInMonth }, (_, i) => ({
        label: i + 1,
        value: i + 1,
      }));

      // Prepend empty item
      return [{ label: "Select Date", value: "" }, ...dateArray];
    } catch (err) {
      logger.logError(
        `Unable to get month dates => dateHelpers.ts > getMonthDates()`,
        err
      );
      return [];
    }
  },

  /**
   * Returns the current month number (1–12)
   */
  getCurrentMonthNumber: (): number => {
    try {
      return new Date().getMonth() + 1; // JS months are 0–11
    } catch (err) {
      logger.logError(
        `Unable to get current month => dateHelpers.ts > getCurrentMonthNumber()`,
        err
      );
      return -1; // fallback value
    }
  },
};
