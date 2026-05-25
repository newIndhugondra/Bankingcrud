import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

/**
 * Matches backend RegisterRequest DTO exactly
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  initialBalance: number;
  fullName: string;
  dateOfBirth: string; // yyyy-MM-dd
  residentialAddress: string;
  idType: "PAN" | "DRIVING_LICENCE" | "AADHAR" | "PASSPORT";
  idNo: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly BASE_URL = "http://localhost:9094/api/auth";

  constructor(private http: HttpClient) {}

  /**
   * Register API
   */
  register(data: RegisterRequest): Observable<string> {
    return this.http.post(`${this.BASE_URL}/register`, data, {
      responseType: "text",
    });
  }

  /**
   * Login API - stores JWT on success
   */
  login(credentials: LoginRequest): Observable<string> {
    return this.http
      .post(`${this.BASE_URL}/login`, credentials, { responseType: "text" })
      .pipe(
        tap((token) => {
          localStorage.setItem("token", token);
        })
      );
  }

  /**
   * Clear JWT
   */
  logout(): void {
    localStorage.removeItem("token");
  }

  /**
   * Check login state
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  /**
   * Get JWT (used later in interceptor)
   */
  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
