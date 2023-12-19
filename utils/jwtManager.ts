import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const JWT_SECRET = process.env.AUTH_SECRET ? process.env.AUTH_SECRET : "";

export class JwtTokenManager {
  private accessTokenCookieName = "accessToken";
  private refreshTokenCookieName = "refreshToken";

  // Stocke le token dans les cookies
  public setToken(token: string): void {
    Cookies.set(this.accessTokenCookieName, token, {
      expires: 7,
      path: "/",
    });
  }
  public setRefreshToken(tokenRefresh: string): void {
    Cookies.set(this.refreshTokenCookieName, tokenRefresh, {
      expires: 7,
      path: "/",
    });
  }

  // Récupère le token depuis les cookies
  public getToken(): string | undefined {
    return Cookies.get(this.accessTokenCookieName );
  }
  public getTokenRefresh(): string | undefined {
    return Cookies.get(this.refreshTokenCookieName);
  }

  // Supprime le token des cookies
  public removeToken(): void {
    Cookies.remove(this.accessTokenCookieName);
  }
  public removeTokenRefresh(): void {
    Cookies.remove(this.refreshTokenCookieName);
  }
  public cleaner(): void {
    Cookies.remove(this.accessTokenCookieName);
    Cookies.remove(this.refreshTokenCookieName);
  }

  public isTokenValid(token: string): boolean {
    if (!token) return false;
    try {
      const decodedToken = jwt.decode(token);
      return true;
    } catch (error) {
      console.error("Erreur lors de la vérification du token :", error);
      return false;
    }
  }

  public async refreshToken(): Promise<string | null> {
    const token = this.getTokenRefresh();
    if (!token) {
      return null;
    }

    const response = await fetch(`${API_URL}/auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    if (response.ok) {
      const responseData = await response.json();
      const newToken = responseData.newToken;
      this.setToken(newToken);
      return newToken;
    } else {
      return null;
    }
  }
}
