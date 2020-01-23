import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMediaDynamique, MediaDynamique } from 'app/shared/model/media-dynamique.model';
import { MediaDynamiqueService } from './media-dynamique.service';
import { MediaDynamiqueComponent } from './media-dynamique.component';
import { MediaDynamiqueDetailComponent } from './media-dynamique-detail.component';
import { MediaDynamiqueUpdateComponent } from './media-dynamique-update.component';

@Injectable({ providedIn: 'root' })
export class MediaDynamiqueResolve implements Resolve<IMediaDynamique> {
  constructor(private service: MediaDynamiqueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMediaDynamique> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((mediaDynamique: HttpResponse<MediaDynamique>) => {
          if (mediaDynamique.body) {
            return of(mediaDynamique.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
