import { API_BASE, API_BASE } from "../storage/constans";
import { headers } from "../storage/headers";


export default class SocialApi {
    constructor(API_BASE = API_BASE){
        this.apiBase = this.apiBase;
        this.apiEndpoint = `${this.apiBase}/socials`;
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
      console.error("Pets API error:", error);
      throw error;
    }
  }

  async getAllSocials(){
    const res = await this.fetchData(this.apiEndpoint);
    return res.data;
  }

  
  
}

