import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <--- aggiungi questa importazione

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
  selector: 'app-catalogo',
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule] // <--- aggiungi FormsModule qui
})
export class Catalogo {
  prodotti: Prodotto[] = [];
  categorie: string[] = [];
  brand: string[] = [];
  ricerca: string = '';

  constructor(private http: HttpClient) {
    this.caricaProdotti();
  }

  caricaProdotti() {
    this.http.get<Prodotto[]>('/products').subscribe(data => {
      this.prodotti = data;
      this.categorie = [...new Set(data.map(p => p.category))];
      this.brand = [...new Set(data.map(p => p.brand))];
    });
  }

  filtraCategoria(categoria: string) {
    this.http.get<Prodotto[]>(`/products/category/${categoria}`).subscribe(data => {
      this.prodotti = data;
    });
  }

  filtraBrand(brand: string) {
    this.http.get<Prodotto[]>(`/products/brand/${brand}`).subscribe(data => {
      this.prodotti = data;
    });
  }

  cercaProdotti() {
    this.http.get<Prodotto[]>(`/products/search?q=${this.ricerca}`).subscribe(data => {
      this.prodotti = data;
    });
  }
  // esempio per dettaglio prodotto
  caricaDettaglio(id: number) {
    this.http.get<Prodotto>(`/products/${id}`).subscribe(data => {
      // mostra i dettagli
    });
  }
}