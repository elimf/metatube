
import { VideoUpload } from "@/types/video/create";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadVideo = async (
  videoUpload: VideoUpload,
  token: string
): Promise<any> => {
  const formData = new FormData();

  // Ajouter les données du formulaire
  formData.append("title", videoUpload.title);
  formData.append("description", videoUpload.description);

  // Ajouter les fichiers
  if (videoUpload.thumbnailFile) {
    formData.append("thumbnailFile", videoUpload.thumbnailFile[0]);
  }

  if (videoUpload.videoFile) {
    formData.append("videoFile", videoUpload.videoFile[0]);
  }

  try {
    const response = await fetch(`${API_URL}/video`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const responseBody = await response.json();
      return {
        statusCode: responseBody.status,
        message: responseBody.message,
      };
    }

    const errorResponse = await response.json();
    return {
      statusCode: response.status,
      message: errorResponse.message,
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi de la requête au serveur", error);
    throw new Error("Erreur lors de l'envoi de la requête au serveur");
  }
};
