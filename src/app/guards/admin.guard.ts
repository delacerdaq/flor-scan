import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (_rota, estado) => {
  const auth = inject(AuthService);
  if (auth.ehAdmin) return true;
  return inject(Router).createUrlTree(['/login'], { queryParams: { retorno: estado.url } });
};
