import { API_BASE } from "../../utils/storage/Constans";
import headers from "../../utils/storage/Headers";

export default class ProfileAPI {
  apiBase = "";
  apiProfile = "";

  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiProfile = `${apiBase}/social/profiles`;
  }

  fetchData = async (endpoint, method = "GET", body = null) => {
    try {
      showLoader(); // Optional loader if you use one
      const res = await fetch(endpoint, {
        method,
        headers: headers(),
        body: body ? JSON.stringify(body) : undefined,
      });
      if (res.ok) {
        return await res.json();
      } else {
        alert(`Failed to ${method === "GET" ? "fetch" : "update"}, please try again.`);
        return null;
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    } finally {
      hideLoader(); // Optional loader
    }
  };

  profile = {
    /**
     * Fetches the current user's profile data.
     * Includes optional query flags: _following, _followers, _posts.
     * @param {string} username - The username of the profile.
     * @param {string} [query=""] - Optional query parameters.
     * @returns {Promise<Object>}
     */
    read: async (username, query = "") => {
      const endpoint = `${this.apiProfile}/${username}${query ? `?${query}` : ""}`;
      return await this.fetchData(endpoint);
    },

    /**
     * Updates a user's profile (e.g., avatar, banner, bio).
     * @param {string} username - The username to update.
     * @param {Object} data - Profile update data.
     * @returns {Promise<Object>}
     */
    update: async (username, data) => {
      const endpoint = `${this.apiProfile}/${username}`;
      return await this.fetchData(endpoint, "PUT", data);
    },

    /**
     * Searches for users.
     * @param {string} query - Search query.
     * @returns {Promise<Array>}
     */
    search: async (query) => {
      const endpoint = `${this.apiProfile}/search?q=${query}`;
      return await this.fetchData(endpoint);
    },

    /**
     * Fetches a user's posts.
     * @param {string} username - The username whose posts to fetch.
     * @returns {Promise<Array>}
     */
    readPosts: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/posts?_reactions=true&_comments=true`;
      return await this.fetchData(endpoint);
    },
  };
}
