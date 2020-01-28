import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvite } from 'app/shared/model/invite.model';
import { InviteService } from './invite.service';

@Component({
  selector: 'jhi-invite-delete-dialog',
  templateUrl: './invite-delete-dialog.component.html'
})
export class InviteDeleteDialogComponent {
  invite: IInvite;

  constructor(protected inviteService: InviteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.inviteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'inviteListModification',
        content: 'Deleted an invite'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-invite-delete-popup',
  template: ''
})
export class InviteDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ invite }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(InviteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.invite = invite;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/invite', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/invite', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
