import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PayStubResponse {
  employerName: string;
  income: number;
  ytd?: number;
  payPeriodStart?: string;
  payPeriodEnd?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenaiExtractionService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  extractPayStubData(text: string): Observable<PayStubResponse> {
    return this.http.post<PayStubResponse>(
      `${this.apiUrl}/extract`,
      text,
      { headers: { 'Content-Type': 'text/plain' } }
    );
  }
}