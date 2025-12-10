import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule]
})
export class RegisterComponent {
  nome = '';
  cognome = '';
  email = '';
  confermaEmail = '';
  password = '';
  confermaPassword = '';
  telefono = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    // Validazione base lato client
    if (this.email !== this.confermaEmail) {
      alert('Le email non coincidono');
      return;
    }
    if (this.password !== this.confermaPassword) {
      alert('Le password non coincidono');
      return;
    }
    // Puoi aggiungere altre validazioni qui

    this.http.post('http://localhost:3000/auth/register', {
      nome: this.nome,
      cognome: this.cognome,
      email: this.email,
      password: this.password,
      telefono: this.telefono
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => alert('Registrazione fallita')
    });
  }
}