import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMediaStatique, MediaStatique } from 'app/shared/model/media-statique.model';
import { MediaStatiqueService } from './media-statique.service';

@Component({
  selector: 'jhi-media-statique-update',
  templateUrl: './media-statique-update.component.html'
})
export class MediaStatiqueUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected mediaStatiqueService: MediaStatiqueService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mediaStatique }) => {
      this.updateForm(mediaStatique);
    });
  }

  updateForm(mediaStatique: IMediaStatique): void {
    this.editForm.patchValue({
      id: mediaStatique.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mediaStatique = this.createFromForm();
    if (mediaStatique.id !== undefined) {
      this.subscribeToSaveResponse(this.mediaStatiqueService.update(mediaStatique));
    } else {
      this.subscribeToSaveResponse(this.mediaStatiqueService.create(mediaStatique));
    }
  }

  private createFromForm(): IMediaStatique {
    return {
      ...new MediaStatique(),
      id: this.editForm.get(['id'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMediaStatique>>): void {
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
