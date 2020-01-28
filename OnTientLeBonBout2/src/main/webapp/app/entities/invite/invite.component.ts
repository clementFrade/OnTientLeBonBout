import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInvite } from 'app/shared/model/invite.model';
import { AccountService } from 'app/core';
import { InviteService } from './invite.service';

@Component({
  selector: 'jhi-invite',
  templateUrl: './invite.component.html'
})
export class InviteComponent implements OnInit, OnDestroy {
  invites: IInvite[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected inviteService: InviteService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.inviteService
      .query()
      .pipe(
        filter((res: HttpResponse<IInvite[]>) => res.ok),
        map((res: HttpResponse<IInvite[]>) => res.body)
      )
      .subscribe(
        (res: IInvite[]) => {
          this.invites = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInInvites();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IInvite) {
    return item.id;
  }

  registerChangeInInvites() {
    this.eventSubscriber = this.eventManager.subscribe('inviteListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
