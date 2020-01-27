import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvite } from 'app/shared/model/invite.model';
import { InviteService } from './invite.service';

@Component({
  templateUrl: './invite-delete-dialog.component.html'
})
export class InviteDeleteDialogComponent {
  invite?: IInvite;

  constructor(protected inviteService: InviteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inviteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('inviteListModification');
      this.activeModal.close();
    });
  }
}
