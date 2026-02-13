interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, any>;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}

export const apiFetch = async <T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const {
    method = "GET",
    body,
    headers = {},
    credentials = "include",
  } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials,
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, config);

  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch (err) {
      console.log("Error: ", err);
    }

    throw new Error(errorData?.message ?? `HTTP error! status: ${res.status}`);
  }

  return res.json();
};
