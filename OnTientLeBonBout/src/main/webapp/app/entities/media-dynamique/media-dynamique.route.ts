import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MediaDynamique } from 'app/shared/model/media-dynamique.model';
import { MediaDynamiqueService } from './media-dynamique.service';
import { MediaDynamiqueComponent } from './media-dynamique.component';
import { MediaDynamiqueDetailComponent } from './media-dynamique-detail.component';
import { MediaDynamiqueUpdateComponent } from './media-dynamique-update.component';
import { MediaDynamiqueDeletePopupComponent } from './media-dynamique-delete-dialog.component';
import { IMediaDynamique } from 'app/shared/model/media-dynamique.model';

@Injectable({ providedIn: 'root' })
export class MediaDynamiqueResolve implements Resolve<IMediaDynamique> {
  constructor(private service: MediaDynamiqueService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMediaDynamique> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MediaDynamique>) => response.ok),
        map((mediaDynamique: HttpResponse<MediaDynamique>) => mediaDynamique.body)
      );
    }
    return of(new MediaDynamique());
  }
}

export const mediaDynamiqueRoute: Routes = [
  {
    path: '',
    component: MediaDynamiqueComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.mediaDynamique.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MediaDynamiqueDetailComponent,
    resolve: {
      mediaDynamique: MediaDynamiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.mediaDynamique.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MediaDynamiqueUpdateComponent,
    resolve: {
      mediaDynamique: MediaDynamiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.mediaDynamique.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MediaDynamiqueUpdateComponent,
    resolve: {
      mediaDynamique: MediaDynamiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.mediaDynamique.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mediaDynamiquePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MediaDynamiqueDeletePopupComponent,
    resolve: {
      mediaDynamique: MediaDynamiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.mediaDynamique.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
