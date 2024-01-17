import { CreateSubscribeDto } from "@/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiSubscribeManager = async (
  token: string,
  createSubscribeDto: CreateSubscribeDto
): Promise<any> => {
  const response = await fetch(`${API_URL}/subscribe`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createSubscribeDto),
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
