import { ApiResponse } from "@/types/api/ApiResponse";
import { UserInfo } from "@/types/user/UserInfo";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiUserInfo = async (
  token: string
): Promise<UserInfo | ApiResponse> => {
  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  }
const responseBody = await response.json();
  return {
    statusCode: responseBody.statusCode,
    message:responseBody.message,
    error: responseBody.error,
  };
};
