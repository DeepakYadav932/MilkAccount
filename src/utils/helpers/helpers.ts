import { v4 } from "uuid";
import logger from "../../services/logger/logger";
import { Sales } from "../models/sales";

export const helpers = {
  // Sales Page related functions
  isSalesFormValid: (salesFields: Sales) => {
    try {
      const formEntries = [
        salesFields.date,
        salesFields.month,
        salesFields.year,
        salesFields.pricePerKg,
        salesFields.quantity,
      ];

      return formEntries.every(
        (formEntry) => formEntry && Number.parseInt(formEntry)
      );
    } catch (err) {
      return false
      logger.logError(
        `Unable to determine sales form value => helper.ts > isSalesFormValid`,
        err
      );
    }
  },
  /** -------sales page related functions end --------------- */

  // uuid 
  generateUUID: () => {
    try {
      return v4()
    } catch (err) {
      logger.logError(`Unable to generate uuid => helpers.ts > generateUUID()`, err)
    }
  },

  /** --------uuid functions end ------------------- */
  isObjectEmpty: (obj: object) => {
    return Object.entries(obj).length === 0;
  },
  isOArrayEmpty: (arr: unknown[]) => {
    return arr.length === 0;
  },
};
