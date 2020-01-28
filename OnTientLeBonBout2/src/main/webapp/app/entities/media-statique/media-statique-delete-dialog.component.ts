import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMediaStatique } from 'app/shared/model/media-statique.model';
import { MediaStatiqueService } from './media-statique.service';

@Component({
  selector: 'jhi-media-statique-delete-dialog',
  templateUrl: './media-statique-delete-dialog.component.html'
})
export class MediaStatiqueDeleteDialogComponent {
  mediaStatique: IMediaStatique;

  constructor(
    protected mediaStatiqueService: MediaStatiqueService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mediaStatiqueService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'mediaStatiqueListModification',
        content: 'Deleted an mediaStatique'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-media-statique-delete-popup',
  template: ''
})
export class MediaStatiqueDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mediaStatique }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MediaStatiqueDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mediaStatique = mediaStatique;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/media-statique', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/media-statique', { outlets: { popup: null } }]);
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
