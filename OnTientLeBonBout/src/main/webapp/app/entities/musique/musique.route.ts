import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Musique } from 'app/shared/model/musique.model';
import { MusiqueService } from './musique.service';
import { MusiqueComponent } from './musique.component';
import { MusiqueDetailComponent } from './musique-detail.component';
import { MusiqueUpdateComponent } from './musique-update.component';
import { MusiqueDeletePopupComponent } from './musique-delete-dialog.component';
import { IMusique } from 'app/shared/model/musique.model';

@Injectable({ providedIn: 'root' })
export class MusiqueResolve implements Resolve<IMusique> {
  constructor(private service: MusiqueService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMusique> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Musique>) => response.ok),
        map((musique: HttpResponse<Musique>) => musique.body)
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

export const musiquePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MusiqueDeletePopupComponent,
    resolve: {
      musique: MusiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.musique.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
