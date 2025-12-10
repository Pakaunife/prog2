import { Routes } from '@angular/router';
import { Home } from './pagine/home/home';
import { Catalogo } from './pagine/catalogo/catalogo';
import { Wishlist } from './pagine/wishlist/wishlist';
import { DettaglioProdottoComponent } from './pagine/dettaglio-prodotto/dettaglio-prodotto';
import { LoginComponent } from './pagine/login/login';
import { RegisterComponent } from './pagine/register/register';

// in queto file definiamo le rotte dell'applicazione per poter navigare tra le pagine
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'wishlist', component: Wishlist },
  { path: 'catalogo/:id', component: DettaglioProdottoComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
   
];
