import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMediaStatique } from 'app/shared/model/media-statique.model';
import { MediaStatiqueService } from './media-statique.service';

@Component({
  templateUrl: './media-statique-delete-dialog.component.html'
})
export class MediaStatiqueDeleteDialogComponent {
  mediaStatique?: IMediaStatique;

  constructor(
    protected mediaStatiqueService: MediaStatiqueService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mediaStatiqueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('mediaStatiqueListModification');
      this.activeModal.close();
    });
  }
}
