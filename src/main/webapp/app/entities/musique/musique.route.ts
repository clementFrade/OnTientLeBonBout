import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMusique, Musique } from 'app/shared/model/musique.model';
import { MusiqueService } from './musique.service';
import { MusiqueComponent } from './musique.component';
import { MusiqueDetailComponent } from './musique-detail.component';
import { MusiqueUpdateComponent } from './musique-update.component';

@Injectable({ providedIn: 'root' })
export class MusiqueResolve implements Resolve<IMusique> {
  constructor(private service: MusiqueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMusique> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((musique: HttpResponse<Musique>) => {
          if (musique.body) {
            return of(musique.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Musique());
  }
}

export const musiqueRoute: Routes = [
  {
    path: '',
    component: MusiqueComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.musique.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MusiqueDetailComponent,
    resolve: {
      musique: MusiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.musique.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MusiqueUpdateComponent,
    resolve: {
      musique: MusiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.musique.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MusiqueUpdateComponent,
    resolve: {
      musique: MusiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.musique.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
