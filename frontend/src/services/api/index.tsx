import { storeGet, storeSet, storeRemove } from "@/services/store/utils";
import { API_URL, API_HEADERS, mokpEncode, mokpDecode } from "./utils";

const KEY_RAT = "mokp-rat";

class MokpApi {
  refreshPromise = null;

  get lang() {
    return window.document.documentElement.lang;
  }

  get rat() {
    return storeGet(KEY_RAT);
  }

  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;

    const headers = {
      ...API_HEADERS,
      ...options.headers,
      "Accept-Language": this.lang,
    };

    if (options.body instanceof FormData) {
      delete headers["Content-Type"];
    }

    if (this.rat) {
      headers.Authorization = `Mokp ${this.rat}`;
    }

    const fetchOptions = {
      ...options,
      headers,
    };

    if (options.withCredentials === true) {
      fetchOptions.credentials = "include";
    }

    let response = await fetch(url, fetchOptions);

    // RAT expired → refresh once, then retry the original request.
    if (response.status === 401 && this.rat) {
      const refreshed = await this.refresh();

      if (refreshed) {
        response = await fetch(url, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            Authorization: `Mokp ${this.rat}`,
          },
        });
      }
    }

    if (!response.ok) {
      // Logout is idempotent from the client's point of view.
      if (url.endsWith("logout/")) {
        return {
          ok: true,
        };
      }

      try {
        const errorData = await response.json();
        return errorData;
      } catch {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    if (response.status === 204) {
      return {
        ok: true,
      };
    }

    const data = await response.json();

    return {
      ok: true,
      ...data,
    };
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: "GET",
      ...options,
    });
  }

  post(endpoint, data, options = {}) {
    const body = data instanceof FormData ? data : JSON.stringify(data);

    return this.request(endpoint, {
      method: "POST",
      body,
      ...options,
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  }

  patch(endpoint, data, options = {}) {
    const body = data instanceof FormData ? data : JSON.stringify(data);

    return this.request(endpoint, {
      method: "PATCH",
      body,
      ...options,
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: "DELETE",
      ...options,
    });
  }

  async login(data) {
    const r = await this.post("/auth/login/", data, { withCredentials: true });

    if (r.ok && r.rat) {
      storeSet(KEY_RAT, r.rat);
    }

    return r;
  }

  async refresh() {
    if (!this.rat) {
      return false;
    }

    // A refresh is already in progress.
    // Reuse the same promise instead of sending another request.
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const r = await this.post("/auth/refresh/", {}, { withCredentials: true });

        if (!r.ok || !r.rat) {
          throw new Error("Refresh failed");
        }

        storeSet(KEY_RAT, r.rat);

        return true;
      } catch {
        await this.logout();
        return false;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  async logout() {
    try {
      await this.post("/auth/logout/", {}, { withCredentials: true });
    } finally {
      storeRemove(KEY_RAT);
    }
  }
}

export const api = new MokpApi();

export { mokpEncode, mokpDecode };
