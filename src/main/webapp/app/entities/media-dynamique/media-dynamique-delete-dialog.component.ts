import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMediaDynamique } from 'app/shared/model/media-dynamique.model';
import { MediaDynamiqueService } from './media-dynamique.service';

@Component({
  templateUrl: './media-dynamique-delete-dialog.component.html'
})
export class MediaDynamiqueDeleteDialogComponent {
  mediaDynamique?: IMediaDynamique;

  constructor(
    protected mediaDynamiqueService: MediaDynamiqueService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mediaDynamiqueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('mediaDynamiqueListModification');
      this.activeModal.close();
    });
  }
}
