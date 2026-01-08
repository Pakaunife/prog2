import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarrelloService } from './carrello.service';
import { tap } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private carrelloService: CarrelloService) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string, user: { ruolo: string } }>('/auth/login', { email, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('ruolo', res.user.ruolo);
        this.spostaCarrelloGuestNelDB();
      })
    );
  }

  spostaCarrelloGuestNelDB() {
  const carrelloGuest = JSON.parse(localStorage.getItem('carrello') || '[]');
  if (carrelloGuest.length > 0) {
    carrelloGuest.forEach((item: any) => {
      // Normalizza l'oggetto
      const prodotto = {
        id:  item.prodottoId,
        name:  item.nome,
        price:  item.prezzo,
        disponibilita: item.disponibilita,
        image_url: item.image_url
      };
      // Controlla la quantità
      if (item.quantita > 0 && item.quantita <= prodotto.disponibilita) {
        this.carrelloService.addToCart(prodotto, item.quantita)?.subscribe();
      }
      // Altrimenti puoi mostrare un messaggio o ignorare
    });
    localStorage.removeItem('carrello');
  }
}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('ruolo');
    }
}