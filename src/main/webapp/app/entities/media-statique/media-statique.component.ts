import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMediaStatique } from 'app/shared/model/media-statique.model';
import { MediaStatiqueService } from './media-statique.service';
import { MediaStatiqueDeleteDialogComponent } from './media-statique-delete-dialog.component';

@Component({
  selector: 'jhi-media-statique',
  templateUrl: './media-statique.component.html'
})
export class MediaStatiqueComponent implements OnInit, OnDestroy {
  mediaStatiques?: IMediaStatique[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected mediaStatiqueService: MediaStatiqueService,
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
      this.mediaStatiqueService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IMediaStatique[]>) => (this.mediaStatiques = res.body ? res.body : []));
      return;
    }
    this.mediaStatiqueService.query().subscribe((res: HttpResponse<IMediaStatique[]>) => {
      this.mediaStatiques = res.body ? res.body : [];
      this.currentSearch = '';
    });
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMediaStatiques();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMediaStatique): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMediaStatiques(): void {
    this.eventSubscriber = this.eventManager.subscribe('mediaStatiqueListModification', () => this.loadAll());
  }

  delete(mediaStatique: IMediaStatique): void {
    const modalRef = this.modalService.open(MediaStatiqueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mediaStatique = mediaStatique;
  }
}
