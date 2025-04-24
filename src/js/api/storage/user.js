import { ACCESS_TOKEN_KEY } from "./constans";



/**
 * Retrieves the logged-in user's data from local storage.
 * @returns {Object} - The user object containing user info and access token.
 */
export function getUserData() {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const accessToken = localStorage.getItem("accessToken");
    return { user, accessToken };
  }
  
  /**
   * Retrieves the current user's info from the JWT stored in local storage.
   * @returns {Object|null} - The decoded user info or null if not logged in.
   */
  export function currentUser() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    }
    return null;
  }
  
  /**
   * Default user name or fallback.
   */
  export function getUserName() {
    return getUserData().user.name || "defaultName";
  }

  
  
  export function isLoggedIn() {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  