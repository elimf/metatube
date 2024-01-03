import { Video } from "@/types/video/video"; // Assure-toi d'avoir la définition correcte pour le type Video
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getVideos = async (): Promise<Video[]> => {
  try {
    const response = await fetch(`${API_URL}/video`, {
      method: "GET",
      // Aucun header d'autorisation nécessaire si le point d'API est public
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
