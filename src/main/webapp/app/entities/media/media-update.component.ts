import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMedia, Media } from 'app/shared/model/media.model';
import { MediaService } from './media.service';

@Component({
  selector: 'jhi-media-update',
  templateUrl: './media-update.component.html'
})
export class MediaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    adresse: [],
    type: [],
    nom: []
  });

  constructor(protected mediaService: MediaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ media }) => {
      this.updateForm(media);
    });
  }

  updateForm(media: IMedia): void {
    this.editForm.patchValue({
      id: media.id,
      adresse: media.adresse,
      type: media.type,
      nom: media.nom
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const media = this.createFromForm();
    if (media.id !== undefined) {
      this.subscribeToSaveResponse(this.mediaService.update(media));
    } else {
      this.subscribeToSaveResponse(this.mediaService.create(media));
    }
  }

  private createFromForm(): IMedia {
    return {
      ...new Media(),
      id: this.editForm.get(['id'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      type: this.editForm.get(['type'])!.value,
      nom: this.editForm.get(['nom'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedia>>): void {
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
