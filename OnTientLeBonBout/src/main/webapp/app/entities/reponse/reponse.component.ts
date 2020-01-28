import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReponse } from 'app/shared/model/reponse.model';
import { AccountService } from 'app/core';
import { ReponseService } from './reponse.service';

@Component({
  selector: 'jhi-reponse',
  templateUrl: './reponse.component.html'
})
export class ReponseComponent implements OnInit, OnDestroy {
  reponses: IReponse[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected reponseService: ReponseService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.reponseService
      .query()
      .pipe(
        filter((res: HttpResponse<IReponse[]>) => res.ok),
        map((res: HttpResponse<IReponse[]>) => res.body)
      )
      .subscribe(
        (res: IReponse[]) => {
          this.reponses = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInReponses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IReponse) {
    return item.id;
  }

  registerChangeInReponses() {
    this.eventSubscriber = this.eventManager.subscribe('reponseListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
