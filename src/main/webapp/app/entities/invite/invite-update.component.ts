import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IInvite, Invite } from 'app/shared/model/invite.model';
import { InviteService } from './invite.service';
import { IQuestionnaire } from 'app/shared/model/questionnaire.model';
import { QuestionnaireService } from 'app/entities/questionnaire/questionnaire.service';

@Component({
  selector: 'jhi-invite-update',
  templateUrl: './invite-update.component.html'
})
export class InviteUpdateComponent implements OnInit {
  isSaving = false;

  questionnaires: IQuestionnaire[] = [];

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
    protected inviteService: InviteService,
    protected questionnaireService: QuestionnaireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invite }) => {
      this.updateForm(invite);

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

  updateForm(invite: IInvite): void {
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      mail: this.editForm.get(['mail'])!.value,
      mdp: this.editForm.get(['mdp'])!.value,
      login: this.editForm.get(['login'])!.value,
      points: this.editForm.get(['points'])!.value,
      questionnaire: this.editForm.get(['questionnaire'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvite>>): void {
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

  trackById(index: number, item: IQuestionnaire): any {
    return item.id;
  }
}
