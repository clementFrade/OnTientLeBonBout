import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMediaDynamique } from 'app/shared/model/media-dynamique.model';
import { AccountService } from 'app/core';
import { MediaDynamiqueService } from './media-dynamique.service';

@Component({
  selector: 'jhi-media-dynamique',
  templateUrl: './media-dynamique.component.html'
})
export class MediaDynamiqueComponent implements OnInit, OnDestroy {
  mediaDynamiques: IMediaDynamique[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected mediaDynamiqueService: MediaDynamiqueService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.mediaDynamiqueService
      .query()
      .pipe(
        filter((res: HttpResponse<IMediaDynamique[]>) => res.ok),
        map((res: HttpResponse<IMediaDynamique[]>) => res.body)
      )
      .subscribe(
        (res: IMediaDynamique[]) => {
          this.mediaDynamiques = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMediaDynamiques();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMediaDynamique) {
    return item.id;
  }

  registerChangeInMediaDynamiques() {
    this.eventSubscriber = this.eventManager.subscribe('mediaDynamiqueListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
