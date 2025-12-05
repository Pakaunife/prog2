import { Routes } from '@angular/router';
import { Home } from './pagine/home/home';
import { Catalogo } from './pagine/catalogo/catalogo';
import { Wishlist } from './pagine/wishlist/wishlist';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'wishlist', component: Wishlist }
];
