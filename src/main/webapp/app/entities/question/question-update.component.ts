import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IQuestion, Question } from 'app/shared/model/question.model';
import { QuestionService } from './question.service';
import { IMedia } from 'app/shared/model/media.model';
import { MediaService } from 'app/entities/media/media.service';
import { ITheme } from 'app/shared/model/theme.model';
import { ThemeService } from 'app/entities/theme/theme.service';
import { IQuestionnaire } from 'app/shared/model/questionnaire.model';
import { QuestionnaireService } from 'app/entities/questionnaire/questionnaire.service';

type SelectableEntity = IMedia | ITheme | IQuestionnaire;

@Component({
  selector: 'jhi-question-update',
  templateUrl: './question-update.component.html'
})
export class QuestionUpdateComponent implements OnInit {
  isSaving = false;

  media: IMedia[] = [];

  themes: ITheme[] = [];

  questionnaires: IQuestionnaire[] = [];

  editForm = this.fb.group({
    id: [],
    intitule: [],
    media: [],
    theme: [],
    questionnaire: []
  });

  constructor(
    protected questionService: QuestionService,
    protected mediaService: MediaService,
    protected themeService: ThemeService,
    protected questionnaireService: QuestionnaireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ question }) => {
      this.updateForm(question);

      this.mediaService
        .query({ filter: 'question-is-null' })
        .pipe(
          map((res: HttpResponse<IMedia[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IMedia[]) => {
          if (!question.media || !question.media.id) {
            this.media = resBody;
          } else {
            this.mediaService
              .find(question.media.id)
              .pipe(
                map((subRes: HttpResponse<IMedia>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IMedia[]) => {
                this.media = concatRes;
              });
          }
        });

      this.themeService
        .query()
        .pipe(
          map((res: HttpResponse<ITheme[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITheme[]) => (this.themes = resBody));

      this.questionnaireService
        .query()
        .pipe(
          map((res: HttpResponse<IQuestionnaire[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IQuestionnaire[]) => (this.questionnaires = resBody));
    });
  }

  updateForm(question: IQuestion): void {
    this.editForm.patchValue({
      id: question.id,
      intitule: question.intitule,
      media: question.media,
      theme: question.theme,
      questionnaire: question.questionnaire
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const question = this.createFromForm();
    if (question.id !== undefined) {
      this.subscribeToSaveResponse(this.questionService.update(question));
    } else {
      this.subscribeToSaveResponse(this.questionService.create(question));
    }
  }

  private createFromForm(): IQuestion {
    return {
      ...new Question(),
      id: this.editForm.get(['id'])!.value,
      intitule: this.editForm.get(['intitule'])!.value,
      media: this.editForm.get(['media'])!.value,
      theme: this.editForm.get(['theme'])!.value,
      questionnaire: this.editForm.get(['questionnaire'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestion>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
