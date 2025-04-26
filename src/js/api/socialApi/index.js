
import { API_SOCIAL } from "../storage/constans.js";
import { headers } from "../storage/headers.js";

export default class SocialApi {
  constructor() {
    this.apiEndpoint = API_SOCIAL;
  }

  async fetchData(endpoint, method = "GET", body = null) {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: headers(),
        body: body ? JSON.stringify(body) : undefined,
      });

      if (response.ok) {
        return response.status === 204 ? null : await response.json();
      } else {
        throw new Error(`Failed to ${method}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Social API error:", error);
      throw error;
    }
  }

  async getAllPosts(query = "") {
    const res = await this.fetchData(`${this.apiEndpoint}${query}`);
    return res.data;
  }

  async getPostById(id, include = "") {
    const params = include ? `?${include}` : "";
    const res = await this.fetchData(`${this.apiEndpoint}/${id}${params}`);
    return res.data;
  }

  async createPost(data) {
    const res = await this.fetchData(this.apiEndpoint, "POST", data);
    return res.data;
  }

  async updatePost(id, data) {
    const res = await this.fetchData(`${this.apiEndpoint}/${id}`, "PUT", data);
    return res.data;
  }

  async deletePost(id) {
    return await this.fetchData(`${this.apiEndpoint}/${id}`, "DELETE");
  }

  async reactToPost(id, symbol) {
    const res = await this.fetchData(`${this.apiEndpoint}/${id}/react/${symbol}`, "PUT");
    return res.data;
  }

  async commentOnPost(id, commentData) {
    const res = await this.fetchData(`${this.apiEndpoint}/${id}/comment`, "POST", commentData);
    return res.data;
  }

  async deleteComment(postId, commentId) {
    return await this.fetchData(`${this.apiEndpoint}/${postId}/comment/${commentId}`, "DELETE");
  }
}
