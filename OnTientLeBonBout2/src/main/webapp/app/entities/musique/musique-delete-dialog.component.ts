import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMusique } from 'app/shared/model/musique.model';
import { MusiqueService } from './musique.service';

@Component({
  selector: 'jhi-musique-delete-dialog',
  templateUrl: './musique-delete-dialog.component.html'
})
export class MusiqueDeleteDialogComponent {
  musique: IMusique;

  constructor(protected musiqueService: MusiqueService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.musiqueService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'musiqueListModification',
        content: 'Deleted an musique'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-musique-delete-popup',
  template: ''
})
export class MusiqueDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ musique }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MusiqueDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.musique = musique;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/musique', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/musique', { outlets: { popup: null } }]);
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
