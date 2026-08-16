const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "VITE_API_URL is not configured",
  );
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export async function apiGet<T>(
  endpoint: string,
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
  );

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`,
    );
  }

  const result =
    (await response.json()) as ApiResponse<T>;

  return result.data;
}