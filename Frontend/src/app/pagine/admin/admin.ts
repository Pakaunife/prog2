import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {
  utenti: any[] = [];
  loading = true;
  errore = '';
  ordiniPerUtente: { [userId: number]: any[] } = {};
  utenteMostraOrdini: number | null = null;
  ordineDettaglio: any = null;
  nuovoStatoOrdine: string = '';
  dettagliSpedizione: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.caricaUtenti();
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  caricaUtenti() {
    this.loading = true;
    this.http.get<any[]>('/admin/users', { headers: this.getAuthHeaders() }).subscribe({
      next: utenti => {
        this.utenti = utenti;
        this.loading = false;
        // Precarica il numero di ordini per ogni utente (solo la prima volta)
        utenti.forEach(u => this.caricaOrdiniUtente(u.id, false));
      },
      error: err => {
        this.errore = 'Errore nel caricamento utenti';
        this.loading = false;
      }
    });
  }

  bloccaUtente(userId: number) {
    if (confirm('Sei sicuro di voler bloccare questo utente?')) {
      this.http.put(`/admin/block/${userId}`, {}, { headers: this.getAuthHeaders() }).subscribe({
        next: () => this.caricaUtenti()
      });
    }
  }
  sbloccaUtente(userId: number) {
  if (confirm('Sei sicuro di voler sbloccare questo utente?')) {
    this.http.put(`/admin/unblock/${userId}`, {}, { headers: this.getAuthHeaders() }).subscribe({
      next: () => this.caricaUtenti()
    });
  }
}

  gestisciAdmin(userId: number, makeAdmin: boolean) {
    this.http.put(`/admin/set-admin/${userId}`, { admin: makeAdmin }, { headers: this.getAuthHeaders() }).subscribe({
      next: () => this.caricaUtenti()
    });
  }

  toggleOrdini(userId: number) {
    if (this.utenteMostraOrdini === userId) {
      this.utenteMostraOrdini = null;
    } else {
      this.utenteMostraOrdini = userId;
      this.caricaOrdiniUtente(userId, true);
    }
  }

  caricaOrdiniUtente(userId: number, force: boolean) {
    // Se già caricati e non forzato, non ricaricare
    if (this.ordiniPerUtente[userId] && !force) return;
    this.http.get<any[]>(`/admin/orders/${userId}`, { headers: this.getAuthHeaders() }).subscribe({
      next: ordini => this.ordiniPerUtente[userId] = ordini,
      error: () => this.ordiniPerUtente[userId] = []
    });
  }
  apriDettaglioOrdine(ordine: any) {
  this.ordineDettaglio = { ...ordine };
  this.nuovoStatoOrdine = ordine.stato;
   this.dettagliSpedizione = ordine.dettagli_spedizione || '';
}

aggiornaStatoOrdine() {
  if (!this.ordineDettaglio) return;
  this.http.put(`/admin/orders/${this.ordineDettaglio.id}/stato`, 
    { stato: this.nuovoStatoOrdine, dettagli_spedizione: this.dettagliSpedizione }, 
    { headers: this.getAuthHeaders() }
  ).subscribe({
    next: () => {
      this.ordineDettaglio.stato = this.nuovoStatoOrdine;
      this.ordineDettaglio.dettagli_spedizione = this.dettagliSpedizione;
      // Aggiorna anche la lista ordini
      const ordini = this.ordiniPerUtente[this.ordineDettaglio.user_id];
      if (ordini) {
        const idx = ordini.findIndex(o => o.id === this.ordineDettaglio.id);
        if (idx > -1) {
          ordini[idx].stato = this.nuovoStatoOrdine;
          ordini[idx].dettagli_spedizione = this.dettagliSpedizione;
        }
      }
      this.ordineDettaglio = null;
    }
  });
}

rimuoviUtente(userId: number) {
  if (confirm('Sei sicuro di voler eliminare definitivamente questo utente?')) {
    this.http.delete(`/admin/users/${userId}`, { headers: this.getAuthHeaders() }).subscribe({
      next: () => this.caricaUtenti()
    });
  }
}

}