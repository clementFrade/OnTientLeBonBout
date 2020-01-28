import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IReponse, Reponse } from 'app/shared/model/reponse.model';
import { ReponseService } from './reponse.service';
import { IQuestion } from 'app/shared/model/question.model';
import { QuestionService } from 'app/entities/question';
import { IMedia } from 'app/shared/model/media.model';
import { MediaService } from 'app/entities/media';
import { IInvite } from 'app/shared/model/invite.model';
import { InviteService } from 'app/entities/invite';

@Component({
  selector: 'jhi-reponse-update',
  templateUrl: './reponse-update.component.html'
})
export class ReponseUpdateComponent implements OnInit {
  isSaving: boolean;

  questions: IQuestion[];

  media: IMedia[];

  invites: IInvite[];

  editForm = this.fb.group({
    id: [],
    intitule: [],
    valide: [],
    question: [],
    media: [],
    invite: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected reponseService: ReponseService,
    protected questionService: QuestionService,
    protected mediaService: MediaService,
    protected inviteService: InviteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reponse }) => {
      this.updateForm(reponse);
    });
    this.questionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IQuestion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IQuestion[]>) => response.body)
      )
      .subscribe((res: IQuestion[]) => (this.questions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.mediaService
      .query({ filter: 'reponse-is-null' })
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
    this.inviteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IInvite[]>) => mayBeOk.ok),
        map((response: HttpResponse<IInvite[]>) => response.body)
      )
      .subscribe((res: IInvite[]) => (this.invites = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(reponse: IReponse) {
    this.editForm.patchValue({
      id: reponse.id,
      intitule: reponse.intitule,
      valide: reponse.valide,
      question: reponse.question,
      media: reponse.media,
      invite: reponse.invite
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reponse = this.createFromForm();
    if (reponse.id !== undefined) {
      this.subscribeToSaveResponse(this.reponseService.update(reponse));
    } else {
      this.subscribeToSaveResponse(this.reponseService.create(reponse));
    }
  }

  private createFromForm(): IReponse {
    return {
      ...new Reponse(),
      id: this.editForm.get(['id']).value,
      intitule: this.editForm.get(['intitule']).value,
      valide: this.editForm.get(['valide']).value,
      question: this.editForm.get(['question']).value,
      media: this.editForm.get(['media']).value,
      invite: this.editForm.get(['invite']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReponse>>) {
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

  trackQuestionById(index: number, item: IQuestion) {
    return item.id;
  }

  trackMediaById(index: number, item: IMedia) {
    return item.id;
  }

  trackInviteById(index: number, item: IInvite) {
    return item.id;
  }
}
