import { Login } from "@/types/auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (credentialLogin: Login): Promise<any> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentialLogin),
  });
  return await response.json();
};
