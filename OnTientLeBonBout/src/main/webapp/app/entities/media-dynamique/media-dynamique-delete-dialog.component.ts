import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMediaDynamique } from 'app/shared/model/media-dynamique.model';
import { MediaDynamiqueService } from './media-dynamique.service';

@Component({
  selector: 'jhi-media-dynamique-delete-dialog',
  templateUrl: './media-dynamique-delete-dialog.component.html'
})
export class MediaDynamiqueDeleteDialogComponent {
  mediaDynamique: IMediaDynamique;

  constructor(
    protected mediaDynamiqueService: MediaDynamiqueService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mediaDynamiqueService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mediaDynamiqueListModification',
        content: 'Deleted an mediaDynamique'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-media-dynamique-delete-popup',
  template: ''
})
export class MediaDynamiqueDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mediaDynamique }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MediaDynamiqueDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mediaDynamique = mediaDynamique;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/media-dynamique', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/media-dynamique', { outlets: { popup: null } }]);
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
