import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMediaStatique } from 'app/shared/model/media-statique.model';
import { AccountService } from 'app/core';
import { MediaStatiqueService } from './media-statique.service';

@Component({
  selector: 'jhi-media-statique',
  templateUrl: './media-statique.component.html'
})
export class MediaStatiqueComponent implements OnInit, OnDestroy {
  mediaStatiques: IMediaStatique[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected mediaStatiqueService: MediaStatiqueService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.mediaStatiqueService
      .query()
      .pipe(
        filter((res: HttpResponse<IMediaStatique[]>) => res.ok),
        map((res: HttpResponse<IMediaStatique[]>) => res.body)
      )
      .subscribe(
        (res: IMediaStatique[]) => {
          this.mediaStatiques = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMediaStatiques();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMediaStatique) {
    return item.id;
  }

  registerChangeInMediaStatiques() {
    this.eventSubscriber = this.eventManager.subscribe('mediaStatiqueListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
