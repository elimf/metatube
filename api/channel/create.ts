import { ChannelCreate } from "@/types/channel";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiChannelPost = async (
  channelCreate: ChannelCreate,
  token: string
): Promise<any> => {
  const response = await fetch(`${API_URL}/channel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(channelCreate),
  });
  if (response.ok) {
    const responseBody = await response.json();
    return {
      statusCode: responseBody.status,
      message: responseBody.message,
    };
  }
  return await response.json();
};
