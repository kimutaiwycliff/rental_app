import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * cleanParams
 *
 * This function takes an object of parameters and filters out any
 * values that are null, undefined, empty string, or an array with
 * no non-null values.
 *
 * The purpose of this is to make sure that when we pass parameters
 * to a server API, we don't send any unnecessary or invalid data.
 *
 * For example, if we have a search form with a price range, and
 * the user doesn't enter a max price, we don't want to send a
 * parameter like "maxPrice=null" to the server.
 *
 * @param params - An object of parameters to filter
 * @returns A new object with the same keys as `params`, but with
 *          any invalid values removed.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cleanParams(params: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(params).filter(
      (
        [_, value] // eslint-disable-line @typescript-eslint/no-unused-vars
      ) =>
        value !== undefined &&
        value !== "any" &&
        value !== "" &&
        (Array.isArray(value) ? value.some((v) => v !== null) : value !== null)
    )
  );
}

/**
 * Format a price value for display in a UI component.
 *
 * @param value The number value to format.
 * @param isMin Whether the value is a minimum price or a maximum price.
 * @returns A string representing the price value.
 */
export function formatPriceValue(value: number | null, isMin: boolean) {
  if (value === null || value === 0)
    return isMin ? "Any Min Price" : "Any Max Price";
  if (value >= 1000) {
    const kValue = value / 1000;
    return isMin ? `$${kValue}k+` : `<$${kValue}k`;
  }
  return isMin ? `$${value}+` : `<$${value}`;
}

/**
 * Format an enum string to make it more human-readable.
 *
 * @param str The enum string to format.
 * @returns A string with the enum string formatted for human-readability.
 */
export function formatEnumString(str: string) {
  return str.replace(/([A-Z])/g, " $1").trim();
}

/**
 * Format a timestamp for display in a UI component.
 *
 * @param timestamp The timestamp to format, as a string, number, or Date
 *                  object.
 * @returns A string representing the formatted timestamp.
 */
export const formatDate = (timestamp: string | number | Date): string => {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get a color based on the magnitude of an earthquake.
 *
 * @param mag The magnitude of the earthquake, or null/undefined if unknown.
 * @returns A color string representing the magnitude, ranging from green
 *          (low magnitude) to red (high magnitude).
 */
export const getMagnitudeColor = (mag: number | null | undefined): string => {
  if (!mag) return '#52c41a';
  if (mag > 5) return '#ff4d4f';
  if (mag > 3) return '#faad14';
  return '#52c41a';
};

