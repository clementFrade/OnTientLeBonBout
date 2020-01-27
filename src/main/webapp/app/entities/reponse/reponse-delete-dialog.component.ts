import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReponse } from 'app/shared/model/reponse.model';
import { ReponseService } from './reponse.service';

@Component({
  templateUrl: './reponse-delete-dialog.component.html'
})
export class ReponseDeleteDialogComponent {
  reponse?: IReponse;

  constructor(protected reponseService: ReponseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reponseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('reponseListModification');
      this.activeModal.close();
    });
  }
}
