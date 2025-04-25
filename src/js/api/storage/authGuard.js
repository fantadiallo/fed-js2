import { ACCESS_TOKEN_KEY } from "./constans";
import * as storage from "./key";

/**
 * Checks if the user is authenticated and the session is still valid.
 * If valid, executes a callback; otherwise, redirects to login.
 *
 * @param {Function} callback - Function to run if the user is authenticated and session is valid.
 */
export function authGuard(callback) {
    const token = storage.load(ACCESS_TOKEN_KEY);
    const expiresAt = storage.load("sessionExpiresAt");
  
    const now = Date.now();
  
    if (!token || !expiresAt || now > expiresAt) {
      storage.remove(ACCESS_TOKEN_KEY);
      storage.remove("user");
      storage.remove("sessionExpiresAt");
      window.location.href = ROUTES.LOGIN;
    } else if (typeof callback === "function") {
      callback();
    }
  }