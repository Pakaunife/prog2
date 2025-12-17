import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IndirizziService {

  constructor(private http: HttpClient) {}

  getIndirizziUtente(): Observable<any[]> {
    return this.http.get<any[]>('/indirizzi');
  }

  aggiungiIndirizzo(indirizzo: any): Observable<any> {
    return this.http.post<any>('/indirizzi', indirizzo);
  }
}