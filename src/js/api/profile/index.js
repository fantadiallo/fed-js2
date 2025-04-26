
import { hideLoader, showLoader } from "../../utils/loader.js";
import { API_PROFILES } from "../storage/constans.js";
import { headers } from "../storage/headers.js";

export default class ProfileAPI {
  constructor() {
    this.apiProfile = API_PROFILES;
  }

  fetchData = async (endpoint, method = "GET", body = null) => {
    try {
      showLoader();
      const res = await fetch(endpoint, {
        method,
        headers: headers(),
        body: body ? JSON.stringify(body) : undefined,
      });
      if (res.ok) {
        return await res.json();
      } else {
        alert(`Failed to ${method === "GET" ? "fetch" : "update"}`);
        return null;
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    } finally {
      hideLoader();
    }
  };

  profile = {
    read: async (username, query = "") => {
      const endpoint = `${this.apiProfile}/${username}${query ? `?${query}` : ""}`;
      return await this.fetchData(endpoint);
    },

    update: async (username, data) => {
      const endpoint = `${this.apiProfile}/${username}`;
      return await this.fetchData(endpoint, "PUT", data);
    },

    search: async (query) => {
      const endpoint = `${this.apiProfile}/search?q=${query}`;
      return await this.fetchData(endpoint);
    },

    readPosts: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/posts?_reactions=true&_comments=true`;
      return await this.fetchData(endpoint);
    },
  };
}
