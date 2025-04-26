import { ACCESS_TOKEN_KEY, API_KEY } from "./constans";
import * as storage from "./key";

/**
 * Constructs the headers for authenticated API requests.
 * Includes `Content-Type`, `X-Noroff-API-Key`, and optionally the `Authorization` header.
 *
 * @returns {Headers} A Headers object containing necessary request headers.
 */
export function headers() {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
  
    const token = storage.load(ACCESS_TOKEN_KEY);
  
    if (API_KEY) {
      headers.append('X-Noroff-API-Key', API_KEY);
    }
  
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
  
    return headers;
  }
  