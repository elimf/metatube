import { Login } from "@/types/auth";
import { JwtTokenManager } from "@/utils/jwtManager";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiRefresh = async (): Promise<any> => {
  const tokenManager = new JwtTokenManager();

  const refreshToken = tokenManager.getTokenRefresh();

  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (response.ok) {
    const responseBody = await response.json();
    tokenManager.cleaner();
    tokenManager.setToken(responseBody.access_token);
    tokenManager.setRefreshToken(responseBody.refresh_token);

    return {
      statusCode: response.status,
      message: "Token refreshed successfully",
    };
  } else {
    throw new Error(`Failed to refresh token: ${response.statusText}`);
  }
};
