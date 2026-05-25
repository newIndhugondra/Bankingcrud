import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BankingService {

  private baseUrl = 'http://localhost:8080/account';

  constructor(private http: HttpClient) {}

  private headers() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  deposit(amount: number) {
    return this.http
      .post(`${this.baseUrl}/deposit`, { amount }, this.headers())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Deposit API error:', error);
          return throwError(() => error);
        })
      );
  }

  withdraw(amount: number) {
    return this.http
      .post(`${this.baseUrl}/withdraw`, { amount }, this.headers())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Withdraw API error:', error);
          return throwError(() => error);
        })
      );
  }

  transfer(toAccount: string, amount: number) {
    return this.http
      .post(`${this.baseUrl}/transfer`, { toAccount, amount }, this.headers())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Transfer API error:', error);
          return throwError(() => error);
        })
      );
  }
}
