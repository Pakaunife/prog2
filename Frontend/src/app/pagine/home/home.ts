import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // <--- aggiungi questa importazione

interface Prodotto {
  id: number;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule] // <--- aggiungi RouterModule qui
})
export class Home {
  vetrina: Prodotto[] = [];

  constructor(private http: HttpClient) {
    this.caricaVetrina();
  }

  caricaVetrina() {
    this.http.get<Prodotto[]>('/products/vetrina').subscribe(data => {
      this.vetrina = data;
      console.log('Prodotti vetrina:', this.vetrina);
    });
  }
}