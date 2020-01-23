import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMusique } from 'app/shared/model/musique.model';
import { MusiqueService } from './musique.service';

@Component({
  templateUrl: './musique-delete-dialog.component.html'
})
export class MusiqueDeleteDialogComponent {
  musique?: IMusique;

  constructor(protected musiqueService: MusiqueService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.musiqueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('musiqueListModification');
      this.activeModal.close();
    });
  }
}
