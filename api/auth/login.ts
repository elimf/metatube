import { Login } from "@/types/auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { JwtTokenManager } from "@/utils/jwtManager";

export const apiLogin = async (credentialLogin: Login): Promise<any> => {
  const tokenManager = new JwtTokenManager();
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentialLogin),
  });
  if (response.ok) {
    const responseBody = await response.json();
    
    tokenManager.cleaner();
    tokenManager.setToken(responseBody.access_token);
    tokenManager.setRefreshToken(responseBody.refresh_token);
    return {
      statusCode: response.status,
      message: "Login success",
    };
  }

  return await response.json();
};
