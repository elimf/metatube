import { Channel } from "@/types/channel";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiChannelGetById = async (
  channelId: string
): Promise<Channel| null> => {
  const response = await fetch(`${API_URL}/channel/${channelId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  }

  // Si la réponse est 404, renvoyer null ou une valeur par défaut selon vos besoins
  if (response.status === 404) {
    return null;
  }

  // Gérer les autres erreurs ici si nécessaire
  throw new Error(`Failed to fetch channel with ID ${channelId}`);
};
