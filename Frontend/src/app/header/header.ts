import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
  imports: [RouterModule]
})
export class Header {
  showSignInMenu: boolean = false;

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