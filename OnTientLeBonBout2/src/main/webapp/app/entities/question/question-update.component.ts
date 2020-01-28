import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IQuestion, Question } from 'app/shared/model/question.model';
import { QuestionService } from './question.service';
import { IMedia } from 'app/shared/model/media.model';
import { MediaService } from 'app/entities/media';
import { ITheme } from 'app/shared/model/theme.model';
import { ThemeService } from 'app/entities/theme';
import { IQuestionnaire } from 'app/shared/model/questionnaire.model';
import { QuestionnaireService } from 'app/entities/questionnaire';

@Component({
  selector: 'jhi-question-update',
  templateUrl: './question-update.component.html'
})
export class QuestionUpdateComponent implements OnInit {
  isSaving: boolean;

  media: IMedia[];

  themes: ITheme[];

  questionnaires: IQuestionnaire[];

  editForm = this.fb.group({
    id: [],
    intitule: [],
    media: [],
    theme: [],
    questionnaire: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected questionService: QuestionService,
    protected mediaService: MediaService,
    protected themeService: ThemeService,
    protected questionnaireService: QuestionnaireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ question }) => {
      this.updateForm(question);
    });
    this.mediaService
      .query({ filter: 'question-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IMedia[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMedia[]>) => response.body)
      )
      .subscribe(
        (res: IMedia[]) => {
          if (!this.editForm.get('media').value || !this.editForm.get('media').value.id) {
            this.media = res;
          } else {
            this.mediaService
              .find(this.editForm.get('media').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IMedia>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IMedia>) => subResponse.body)
              )
              .subscribe(
                (subRes: IMedia) => (this.media = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.themeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITheme[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITheme[]>) => response.body)
      )
      .subscribe((res: ITheme[]) => (this.themes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.questionnaireService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IQuestionnaire[]>) => mayBeOk.ok),
        map((response: HttpResponse<IQuestionnaire[]>) => response.body)
      )
      .subscribe((res: IQuestionnaire[]) => (this.questionnaires = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(question: IQuestion) {
    this.editForm.patchValue({
      id: question.id,
      intitule: question.intitule,
      media: question.media,
      theme: question.theme,
      questionnaire: question.questionnaire
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      intitule: this.editForm.get(['intitule']).value,
      media: this.editForm.get(['media']).value,
      theme: this.editForm.get(['theme']).value,
      questionnaire: this.editForm.get(['questionnaire']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestion>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackMediaById(index: number, item: IMedia) {
    return item.id;
  }

  trackThemeById(index: number, item: ITheme) {
    return item.id;
  }

  trackQuestionnaireById(index: number, item: IQuestionnaire) {
    return item.id;
  }
}
