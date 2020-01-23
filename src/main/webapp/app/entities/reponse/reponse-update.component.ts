import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IReponse, Reponse } from 'app/shared/model/reponse.model';
import { ReponseService } from './reponse.service';
import { IMedia } from 'app/shared/model/media.model';
import { MediaService } from 'app/entities/media/media.service';
import { IInvite } from 'app/shared/model/invite.model';
import { InviteService } from 'app/entities/invite/invite.service';
import { IQuestion } from 'app/shared/model/question.model';
import { QuestionService } from 'app/entities/question/question.service';

type SelectableEntity = IMedia | IInvite | IQuestion;

@Component({
  selector: 'jhi-reponse-update',
  templateUrl: './reponse-update.component.html'
})
export class ReponseUpdateComponent implements OnInit {
  isSaving = false;

  media: IMedia[] = [];

  invites: IInvite[] = [];

  questions: IQuestion[] = [];

  editForm = this.fb.group({
    id: [],
    intitule: [],
    valide: [],
    media: [],
    invite: [],
    question: []
  });

  constructor(
    protected reponseService: ReponseService,
    protected mediaService: MediaService,
    protected inviteService: InviteService,
    protected questionService: QuestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reponse }) => {
      this.updateForm(reponse);

      this.mediaService
        .query({ filter: 'reponse-is-null' })
        .pipe(
          map((res: HttpResponse<IMedia[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IMedia[]) => {
          if (!reponse.media || !reponse.media.id) {
            this.media = resBody;
          } else {
            this.mediaService
              .find(reponse.media.id)
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

      this.inviteService
        .query()
        .pipe(
          map((res: HttpResponse<IInvite[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IInvite[]) => (this.invites = resBody));

      this.questionService
        .query()
        .pipe(
          map((res: HttpResponse<IQuestion[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IQuestion[]) => (this.questions = resBody));
    });
  }

  updateForm(reponse: IReponse): void {
    this.editForm.patchValue({
      id: reponse.id,
      intitule: reponse.intitule,
      valide: reponse.valide,
      media: reponse.media,
      invite: reponse.invite,
      question: reponse.question
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      intitule: this.editForm.get(['intitule'])!.value,
      valide: this.editForm.get(['valide'])!.value,
      media: this.editForm.get(['media'])!.value,
      invite: this.editForm.get(['invite'])!.value,
      question: this.editForm.get(['question'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReponse>>): void {
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
