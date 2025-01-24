import { Logger } from "@nestjs/common";

export function LogEmptyOrNullProperty(obj, logger: Logger) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        
        // Check if the property is null, undefined, an empty string, empty array, or empty object
        if (value === null || value === "" || value === undefined ||
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === "object" && Object.keys(value).length === 0)) {
          logger.warn(`${key} IS NOT FOUND`);
        }
      }
    }
    return false; // No empty or null properties
}