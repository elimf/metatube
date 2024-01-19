import { CreateCommentDto, CommentTypes } from "@/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse {
  statusCode: number;
  message: CommentTypes | string;
}
export const apiCommentCreate = async (
  token: string,
  createCommentDto: CreateCommentDto
): Promise<ApiResponse > => {
  const response = await fetch(`${API_URL}/comment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createCommentDto),
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
