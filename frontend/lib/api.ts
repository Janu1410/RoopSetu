const DEFAULT_API_BASE_URL = "http://localhost:5000";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  DEFAULT_API_BASE_URL;

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, unknown>;
  token?: string;
};

export const apiRequest = async <TResponse>(
  path: string,
  { method = "GET", body, token }: ApiRequestOptions = {},
): Promise<TResponse> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    cache: "no-store",
  });

  const json = (await response.json().catch(() => null)) as {
    message?: string;
  } | null;

  if (!response.ok) {
    throw new Error(json?.message || "Request failed.");
  }

  return json as TResponse;
};
