import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class JwtTokenManager {
  private accessTokenCookieName = "accessToken";
  private refreshTokenCookieName = "refreshToken";

  // Stocke le token dans les cookies
  public setToken(token: string): void {
    Cookies.set(this.accessTokenCookieName , token, { expires: 7 }); // Expire dans 7 jours, ajustez selon vos besoins
  }
  public setRefreshToken(tokenRefresh: string): void {
    Cookies.set(this.refreshTokenCookieName , tokenRefresh, { expires: 7 });
  }

  // Récupère le token depuis les cookies
  public getToken(): string | undefined {
    return Cookies.get(this.accessTokenCookieName );
  }
  public getTokenRefresh(): string | undefined {
    return Cookies.get(this.refreshTokenCookieName );
  }

  // Supprime le token des cookies
  public removeToken(): void {
    Cookies.remove(this.accessTokenCookieName );
  }
  public removeTokenRefresh(): void {
    Cookies.remove(this.refreshTokenCookieName );
  }
  public cleaner(): void {
    Cookies.remove(this.accessTokenCookieName );
    Cookies.remove(this.refreshTokenCookieName );
  }

  public isTokenValid(token: string): boolean {
    if (!token) return false;
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.exp * 1000 > Date.now();
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
