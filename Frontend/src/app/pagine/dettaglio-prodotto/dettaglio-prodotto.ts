import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Prodotto {
  id: number;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  // aggiungi altri campi se servono
}

@Component({
  selector: 'app-dettaglio-prodotto',
  templateUrl: './dettaglio-prodotto.html',
  styleUrls: ['./dettaglio-prodotto.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class DettaglioProdottoComponent implements OnInit {
  prodotto?: Prodotto;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<Prodotto>(`/products/${id}`).subscribe(data => {
        this.prodotto = data;
      });
    }
  }
}