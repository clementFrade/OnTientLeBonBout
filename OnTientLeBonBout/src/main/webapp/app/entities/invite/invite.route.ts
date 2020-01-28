import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Invite } from 'app/shared/model/invite.model';
import { InviteService } from './invite.service';
import { InviteComponent } from './invite.component';
import { InviteDetailComponent } from './invite-detail.component';
import { InviteUpdateComponent } from './invite-update.component';
import { InviteDeletePopupComponent } from './invite-delete-dialog.component';
import { IInvite } from 'app/shared/model/invite.model';

@Injectable({ providedIn: 'root' })
export class InviteResolve implements Resolve<IInvite> {
  constructor(private service: InviteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInvite> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Invite>) => response.ok),
        map((invite: HttpResponse<Invite>) => invite.body)
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

export const invitePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: InviteDeletePopupComponent,
    resolve: {
      invite: InviteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.invite.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
