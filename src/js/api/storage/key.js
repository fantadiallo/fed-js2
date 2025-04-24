/**
 * Saves a value to localStorage under the specified key.
 *
 * @param {string} key - The key to store the value under.
 * @param {*} value - The value to store (will be JSON-stringified).
 */
export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  /**
   * Loads and parses a value from localStorage by its key.
   *
   * @param {string} key - The key of the value to retrieve.
   * @returns {*} The parsed value, or null if not found or invalid JSON.
   */
  export function load(key) {
    try {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  
  /**
   * Removes a value from localStorage by its key.
   *
   * @param {string} key - The key of the value to remove.
   */
  export function remove(key) {
    localStorage.removeItem(key);
  }
  