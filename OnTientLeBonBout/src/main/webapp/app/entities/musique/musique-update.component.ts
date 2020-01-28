import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMusique, Musique } from 'app/shared/model/musique.model';
import { MusiqueService } from './musique.service';

@Component({
  selector: 'jhi-musique-update',
  templateUrl: './musique-update.component.html'
})
export class MusiqueUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    artiste: []
  });

  constructor(protected musiqueService: MusiqueService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ musique }) => {
      this.updateForm(musique);
    });
  }

  updateForm(musique: IMusique) {
    this.editForm.patchValue({
      id: musique.id,
      artiste: musique.artiste
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const musique = this.createFromForm();
    if (musique.id !== undefined) {
      this.subscribeToSaveResponse(this.musiqueService.update(musique));
    } else {
      this.subscribeToSaveResponse(this.musiqueService.create(musique));
    }
  }

  private createFromForm(): IMusique {
    return {
      ...new Musique(),
      id: this.editForm.get(['id']).value,
      artiste: this.editForm.get(['artiste']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMusique>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
