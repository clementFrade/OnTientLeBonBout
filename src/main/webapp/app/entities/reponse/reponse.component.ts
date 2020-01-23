import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReponse } from 'app/shared/model/reponse.model';
import { ReponseService } from './reponse.service';
import { ReponseDeleteDialogComponent } from './reponse-delete-dialog.component';

@Component({
  selector: 'jhi-reponse',
  templateUrl: './reponse.component.html'
})
export class ReponseComponent implements OnInit, OnDestroy {
  reponses?: IReponse[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected reponseService: ReponseService,
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
      this.reponseService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IReponse[]>) => (this.reponses = res.body ? res.body : []));
      return;
    }
    this.reponseService.query().subscribe((res: HttpResponse<IReponse[]>) => {
      this.reponses = res.body ? res.body : [];
      this.currentSearch = '';
    });
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInReponses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReponse): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReponses(): void {
    this.eventSubscriber = this.eventManager.subscribe('reponseListModification', () => this.loadAll());
  }

  delete(reponse: IReponse): void {
    const modalRef = this.modalService.open(ReponseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reponse = reponse;
  }
}
