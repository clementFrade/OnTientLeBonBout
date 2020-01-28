import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedia } from 'app/shared/model/media.model';
import { AccountService } from 'app/core';
import { MediaService } from './media.service';

@Component({
  selector: 'jhi-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit, OnDestroy {
  media: IMedia[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected mediaService: MediaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.mediaService
      .query()
      .pipe(
        filter((res: HttpResponse<IMedia[]>) => res.ok),
        map((res: HttpResponse<IMedia[]>) => res.body)
      )
      .subscribe(
        (res: IMedia[]) => {
          this.media = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMedia();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMedia) {
    return item.id;
  }

  registerChangeInMedia() {
    this.eventSubscriber = this.eventManager.subscribe('mediaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
