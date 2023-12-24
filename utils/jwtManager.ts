"use client";
import jwt from "jsonwebtoken";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const JWT_SECRET = process.env.AUTH_SECRET ? process.env.AUTH_SECRET : "";

export class JwtTokenManager {
  private accessTokenStorageKey = "accessToken";
  private refreshTokenStorageKey = "refreshToken";

  // Stocke le token dans le localStorage
  public setToken(token: string): void {
    localStorage.setItem(this.accessTokenStorageKey, token);
  }
  public setRefreshToken(tokenRefresh: string): void {
    localStorage.setItem(this.refreshTokenStorageKey, tokenRefresh);
  }

  // Récupère le token depuis le localStorage
  public getToken(): string | null {
    if (typeof window === "undefined") {
      // Check if window is defined (in a browser environment)
      return null;
    }
    return localStorage.getItem(this.accessTokenStorageKey);
  }

  public getTokenRefresh(): string | null {
    if (typeof window === "undefined") {
      // Check if window is defined (in a browser environment)
      return null;
    }
    return localStorage.getItem(this.refreshTokenStorageKey);
  }

  // Supprime le token du localStorage
  public removeToken(): void {
    localStorage.removeItem(this.accessTokenStorageKey);
  }
  public removeTokenRefresh(): void {
    localStorage.removeItem(this.refreshTokenStorageKey);
  }
  public cleaner(): void {
    localStorage.removeItem(this.accessTokenStorageKey);
    localStorage.removeItem(this.refreshTokenStorageKey);
    window.location.pathname = "/";
  }

  public isTokenValid(token: string): boolean {
    if (!token) return false;
    try {
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async refreshToken(): Promise<void | null> {
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
      this.setToken(responseData.access_token);
      this.setRefreshToken(responseData.refresh_token);
    } else {
      return null;
    }
  }
}
