import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInvite, Invite } from 'app/shared/model/invite.model';
import { InviteService } from './invite.service';
import { InviteComponent } from './invite.component';
import { InviteDetailComponent } from './invite-detail.component';
import { InviteUpdateComponent } from './invite-update.component';

@Injectable({ providedIn: 'root' })
export class InviteResolve implements Resolve<IInvite> {
  constructor(private service: InviteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInvite> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((invite: HttpResponse<Invite>) => {
          if (invite.body) {
            return of(invite.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Invite());
  }
}

export const inviteRoute: Routes = [
  {
    path: '',
    component: InviteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.invite.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InviteDetailComponent,
    resolve: {
      invite: InviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.invite.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InviteUpdateComponent,
    resolve: {
      invite: InviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.invite.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InviteUpdateComponent,
    resolve: {
      invite: InviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.invite.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
