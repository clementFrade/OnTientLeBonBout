import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuestionnaire } from 'app/shared/model/questionnaire.model';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireDeleteDialogComponent } from './questionnaire-delete-dialog.component';

@Component({
  selector: 'jhi-questionnaire',
  templateUrl: './questionnaire.component.html'
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  questionnaires?: IQuestionnaire[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected questionnaireService: QuestionnaireService,
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
      this.questionnaireService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IQuestionnaire[]>) => (this.questionnaires = res.body ? res.body : []));
      return;
    }
    this.questionnaireService.query().subscribe((res: HttpResponse<IQuestionnaire[]>) => {
      this.questionnaires = res.body ? res.body : [];
      this.currentSearch = '';
    });
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInQuestionnaires();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IQuestionnaire): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInQuestionnaires(): void {
    this.eventSubscriber = this.eventManager.subscribe('questionnaireListModification', () => this.loadAll());
  }

  delete(questionnaire: IQuestionnaire): void {
    const modalRef = this.modalService.open(QuestionnaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.questionnaire = questionnaire;
  }
}
