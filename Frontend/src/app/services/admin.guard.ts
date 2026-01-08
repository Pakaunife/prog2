import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AdminGuard: CanActivateFn = (route, state) => {
  const ruolo = localStorage.getItem('ruolo');
  const router = inject(Router);
  if (ruolo?.toLowerCase() === 'admin') {
    return true;
  } 
  else if (ruolo?.toLowerCase() === 'user') {
    alert('Accesso riservato solo agli amministratori!');
    router.navigate(['/']);
    return false;
  }
  else {
    
    router.navigate(['/login']);
    return false;
  }
};