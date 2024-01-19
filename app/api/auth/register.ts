import { Register } from "@/types/auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiRegister = async (
  credentialRegister: Register
): Promise<any> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentialRegister),
    });
    return await response.json();
  
};

