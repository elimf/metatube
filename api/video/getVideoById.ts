import { VideoDetail } from "@/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getVideoById = async (
  videoId: string,
  token?: string
): Promise<VideoDetail | null> => {
  const headers = new Headers();
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  headers.append("Content-Type", "application/json");
  const response = await fetch(`${API_URL}/video/${videoId}`, {
    method: "GET",
    headers,
  });

  if (response.ok) {
    const video: VideoDetail = await response.json();
    return video;
  }

  if (response.status === 404) {
    // Retourner null si la vidéo n'est pas trouvée (status code 404)
    return null;
  }

  return await response.json();
};
