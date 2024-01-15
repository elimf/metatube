"use client";
import jwt from "jsonwebtoken";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export class JwtTokenManager {
  private accessTokenStorageKey = "accessToken";
  private refreshTokenStorageKey = "refreshToken";

  public setToken(token: string): void {
    localStorage.setItem(this.accessTokenStorageKey, token);
  }
  public setRefreshToken(tokenRefresh: string): void {
    localStorage.setItem(this.refreshTokenStorageKey, tokenRefresh);
  }

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

  public removeToken(): void {
    localStorage.removeItem(this.accessTokenStorageKey);
  }
  public removeTokenRefresh(): void {
    localStorage.removeItem(this.refreshTokenStorageKey);
  }
  public cleaner(): void {
    localStorage.removeItem(this.accessTokenStorageKey);
    localStorage.removeItem(this.refreshTokenStorageKey);
  }
  public logout(): void {
    this.cleaner();
    window.location.pathname = "/";
  }

  public async isTokenValid(token: string): Promise<boolean> {
    if (!token) return false;

    try {
      await jwt.verify(token, NEXTAUTH_SECRET!);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async refreshToken(): Promise<any | null> {
    const token = this.getTokenRefresh();
    if (!token) {
      return null;
    }

    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      const newToken = responseData.newToken;
      this.cleaner();
      this.setToken(responseData.access_token);
      this.setRefreshToken(responseData.refresh_token);
      return {
        statusCode: response.status,
        message: "Token refreshed successfully",
      };
    } else {
      return null;
    }
  }
}
