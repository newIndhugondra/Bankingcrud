import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private readonly BASE_URL = "http://localhost:9094/api/account";

  constructor(private http: HttpClient) {}

  getAccount(): Observable<any> {
    return this.http.get(this.BASE_URL);
  }

  deposit(amount: number): Observable<string> {
    return this.http.post(`${this.BASE_URL}/deposit`, null, {
      params: { amount },
      responseType: "text",
    });
  }

  withdraw(amount: number): Observable<string> {
    return this.http.post(`${this.BASE_URL}/withdraw`, null, {
      params: { amount },
      responseType: "text",
    });
  }

  transfer(targetAccountNumber: number, amount: number): Observable<string> {
    return this.http.post(`${this.BASE_URL}/transfer`, null, {
      params: {
        targetAccountNumber,
        amount,
      },
      responseType: "text",
    });
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/transactions`);
  }
}
