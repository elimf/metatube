import { Video } from "@/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getVideos = async (): Promise<Video[]> => {
  try {
    const response = await fetch(`${API_URL}/video`, {
      method: "GET",
    });

    if (response.ok) {
      const videos: Video[] = await response.json();
      return videos;
    }

    const errorResponse = await response.json();
    console.error(
      "Erreur lors de la récupération des vidéos:",
      errorResponse.message
    );
    throw new Error("Erreur lors de la récupération des vidéos");
  } catch (error) {
    console.error("Erreur lors de la requête au serveur:", error);
    throw new Error("Erreur lors de la requête au serveur");
  }
};
