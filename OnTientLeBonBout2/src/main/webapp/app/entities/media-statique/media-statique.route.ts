import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MediaStatique } from 'app/shared/model/media-statique.model';
import { MediaStatiqueService } from './media-statique.service';
import { MediaStatiqueComponent } from './media-statique.component';
import { MediaStatiqueDetailComponent } from './media-statique-detail.component';
import { MediaStatiqueUpdateComponent } from './media-statique-update.component';
import { MediaStatiqueDeletePopupComponent } from './media-statique-delete-dialog.component';
import { IMediaStatique } from 'app/shared/model/media-statique.model';

@Injectable({ providedIn: 'root' })
export class MediaStatiqueResolve implements Resolve<IMediaStatique> {
  constructor(private service: MediaStatiqueService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMediaStatique> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MediaStatique>) => response.ok),
        map((mediaStatique: HttpResponse<MediaStatique>) => mediaStatique.body)
      );
    }
    return of(new MediaStatique());
  }
}

export const mediaStatiqueRoute: Routes = [
  {
    path: '',
    component: MediaStatiqueComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.mediaStatique.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MediaStatiqueDetailComponent,
    resolve: {
      mediaStatique: MediaStatiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.mediaStatique.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MediaStatiqueUpdateComponent,
    resolve: {
      mediaStatique: MediaStatiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.mediaStatique.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MediaStatiqueUpdateComponent,
    resolve: {
      mediaStatique: MediaStatiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.mediaStatique.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mediaStatiquePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MediaStatiqueDeletePopupComponent,
    resolve: {
      mediaStatique: MediaStatiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.mediaStatique.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
