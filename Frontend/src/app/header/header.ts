import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class Header {
  showSignInMenu: boolean = false;

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('ruolo');
    this.router.navigate(['/home']);
  }

  toggleSignInMenu(event: Event) {
    event.stopPropagation();
    this.showSignInMenu = !this.showSignInMenu;
  }

  ngOnInit() {
    document.addEventListener('click', () => {
      this.showSignInMenu = false;
    });
  }
 }