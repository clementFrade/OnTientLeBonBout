import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
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
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    adresse: [],
    type: [],
    nom: []
  });

  constructor(protected mediaService: MediaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ media }) => {
      this.updateForm(media);
    });
  }

  updateForm(media: IMedia) {
    this.editForm.patchValue({
      id: media.id,
      adresse: media.adresse,
      type: media.type,
      nom: media.nom
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      adresse: this.editForm.get(['adresse']).value,
      type: this.editForm.get(['type']).value,
      nom: this.editForm.get(['nom']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedia>>) {
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
