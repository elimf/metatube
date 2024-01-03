import { VideoDetail } from "@/types/video/videoDetail"; 
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getVideoById = async (videoId: string): Promise<VideoDetail | null> => {
  try {
    const response = await fetch(`${API_URL}/video/${videoId}`, {
      method: "GET",
    });

    if (response.ok) {
      const video: VideoDetail = await response.json();
      return video;
    }

    if (response.status === 404) {
      // Retourner null si la vidéo n'est pas trouvée (status code 404)
      return null;
    }

    const errorResponse = await response.json();
    console.error(
      "Erreur lors de la récupération de la vidéo:",
      errorResponse.message
    );
    throw new Error("Erreur lors de la récupération de la vidéo");
  } catch (error) {
    console.error("Erreur lors de la requête au serveur:", error);
    throw new Error("Erreur lors de la requête au serveur");
  }
};
