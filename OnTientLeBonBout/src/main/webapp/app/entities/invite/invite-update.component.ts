import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IInvite, Invite } from 'app/shared/model/invite.model';
import { InviteService } from './invite.service';
import { IQuestionnaire } from 'app/shared/model/questionnaire.model';
import { QuestionnaireService } from 'app/entities/questionnaire';

@Component({
  selector: 'jhi-invite-update',
  templateUrl: './invite-update.component.html'
})
export class InviteUpdateComponent implements OnInit {
  isSaving: boolean;

  questionnaires: IQuestionnaire[];

  editForm = this.fb.group({
    id: [],
    nom: [],
    prenom: [],
    mail: [],
    mdp: [],
    login: [],
    points: [],
    questionnaire: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected inviteService: InviteService,
    protected questionnaireService: QuestionnaireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ invite }) => {
      this.updateForm(invite);
    });
    this.questionnaireService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IQuestionnaire[]>) => mayBeOk.ok),
        map((response: HttpResponse<IQuestionnaire[]>) => response.body)
      )
      .subscribe((res: IQuestionnaire[]) => (this.questionnaires = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(invite: IInvite) {
    this.editForm.patchValue({
      id: invite.id,
      nom: invite.nom,
      prenom: invite.prenom,
      mail: invite.mail,
      mdp: invite.mdp,
      login: invite.login,
      points: invite.points,
      questionnaire: invite.questionnaire
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const invite = this.createFromForm();
    if (invite.id !== undefined) {
      this.subscribeToSaveResponse(this.inviteService.update(invite));
    } else {
      this.subscribeToSaveResponse(this.inviteService.create(invite));
    }
  }

  private createFromForm(): IInvite {
    return {
      ...new Invite(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      prenom: this.editForm.get(['prenom']).value,
      mail: this.editForm.get(['mail']).value,
      mdp: this.editForm.get(['mdp']).value,
      login: this.editForm.get(['login']).value,
      points: this.editForm.get(['points']).value,
      questionnaire: this.editForm.get(['questionnaire']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvite>>) {
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

  trackQuestionnaireById(index: number, item: IQuestionnaire) {
    return item.id;
  }
}
