import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQuestionnaire } from 'app/shared/model/questionnaire.model';
import { QuestionnaireService } from './questionnaire.service';

@Component({
  templateUrl: './questionnaire-delete-dialog.component.html'
})
export class QuestionnaireDeleteDialogComponent {
  questionnaire?: IQuestionnaire;

  constructor(
    protected questionnaireService: QuestionnaireService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.questionnaireService.delete(id).subscribe(() => {
      this.eventManager.broadcast('questionnaireListModification');
      this.activeModal.close();
    });
  }
}
