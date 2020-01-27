import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    artiste: []
  });

  constructor(protected musiqueService: MusiqueService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ musique }) => {
      this.updateForm(musique);
    });
  }

  updateForm(musique: IMusique): void {
    this.editForm.patchValue({
      id: musique.id,
      artiste: musique.artiste
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      artiste: this.editForm.get(['artiste'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMusique>>): void {
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
}
