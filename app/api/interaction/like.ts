import { CreateLikeDto } from "@/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiLikeManager = async (
  token: string,
  createLikeDto: CreateLikeDto
): Promise<any> => {
  const response = await fetch(`${API_URL}/like`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createLikeDto),
  });
  if (response.ok) {
    const responseBody = await response.json();
    return {
      statusCode: responseBody.statusCode,
      message: responseBody.message,
    };
  }
  return await response.json();
};
