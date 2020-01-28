import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMusique } from 'app/shared/model/musique.model';
import { AccountService } from 'app/core';
import { MusiqueService } from './musique.service';

@Component({
  selector: 'jhi-musique',
  templateUrl: './musique.component.html'
})
export class MusiqueComponent implements OnInit, OnDestroy {
  musiques: IMusique[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected musiqueService: MusiqueService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.musiqueService
      .query()
      .pipe(
        filter((res: HttpResponse<IMusique[]>) => res.ok),
        map((res: HttpResponse<IMusique[]>) => res.body)
      )
      .subscribe(
        (res: IMusique[]) => {
          this.musiques = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMusiques();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMusique) {
    return item.id;
  }

  registerChangeInMusiques() {
    this.eventSubscriber = this.eventManager.subscribe('musiqueListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
