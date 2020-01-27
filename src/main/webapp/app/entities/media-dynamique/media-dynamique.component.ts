import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMediaDynamique } from 'app/shared/model/media-dynamique.model';
import { MediaDynamiqueService } from './media-dynamique.service';
import { MediaDynamiqueDeleteDialogComponent } from './media-dynamique-delete-dialog.component';

@Component({
  selector: 'jhi-media-dynamique',
  templateUrl: './media-dynamique.component.html'
})
export class MediaDynamiqueComponent implements OnInit, OnDestroy {
  mediaDynamiques?: IMediaDynamique[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected mediaDynamiqueService: MediaDynamiqueService,
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
      this.mediaDynamiqueService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IMediaDynamique[]>) => (this.mediaDynamiques = res.body ? res.body : []));
      return;
    }
    this.mediaDynamiqueService.query().subscribe((res: HttpResponse<IMediaDynamique[]>) => {
      this.mediaDynamiques = res.body ? res.body : [];
      this.currentSearch = '';
    });
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMediaDynamiques();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMediaDynamique): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMediaDynamiques(): void {
    this.eventSubscriber = this.eventManager.subscribe('mediaDynamiqueListModification', () => this.loadAll());
  }

  delete(mediaDynamique: IMediaDynamique): void {
    const modalRef = this.modalService.open(MediaDynamiqueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mediaDynamique = mediaDynamique;
  }
}
