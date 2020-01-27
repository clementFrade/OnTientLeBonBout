import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInvite } from 'app/shared/model/invite.model';
import { InviteService } from './invite.service';
import { InviteDeleteDialogComponent } from './invite-delete-dialog.component';

@Component({
  selector: 'jhi-invite',
  templateUrl: './invite.component.html'
})
export class InviteComponent implements OnInit, OnDestroy {
  invites?: IInvite[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected inviteService: InviteService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.inviteService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IInvite[]>) => (this.invites = res.body ? res.body : []));
      return;
    }
    this.inviteService.query().subscribe((res: HttpResponse<IInvite[]>) => {
      this.invites = res.body ? res.body : [];
      this.currentSearch = '';
    });
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInvites();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInvite): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInvites(): void {
    this.eventSubscriber = this.eventManager.subscribe('inviteListModification', () => this.loadAll());
  }

  delete(invite: IInvite): void {
    const modalRef = this.modalService.open(InviteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.invite = invite;
  }
}
