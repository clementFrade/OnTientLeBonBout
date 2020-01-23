import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMusique } from 'app/shared/model/musique.model';
import { MusiqueService } from './musique.service';
import { MusiqueDeleteDialogComponent } from './musique-delete-dialog.component';

@Component({
  selector: 'jhi-musique',
  templateUrl: './musique.component.html'
})
export class MusiqueComponent implements OnInit, OnDestroy {
  musiques?: IMusique[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected musiqueService: MusiqueService,
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
      this.musiqueService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IMusique[]>) => (this.musiques = res.body ? res.body : []));
      return;
    }
    this.musiqueService.query().subscribe((res: HttpResponse<IMusique[]>) => {
      this.musiques = res.body ? res.body : [];
      this.currentSearch = '';
    });
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMusiques();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMusique): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMusiques(): void {
    this.eventSubscriber = this.eventManager.subscribe('musiqueListModification', () => this.loadAll());
  }

  delete(musique: IMusique): void {
    const modalRef = this.modalService.open(MusiqueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.musique = musique;
  }
}
