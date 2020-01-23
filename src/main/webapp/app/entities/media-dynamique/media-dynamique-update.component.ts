import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMediaDynamique, MediaDynamique } from 'app/shared/model/media-dynamique.model';
import { MediaDynamiqueService } from './media-dynamique.service';

@Component({
  selector: 'jhi-media-dynamique-update',
  templateUrl: './media-dynamique-update.component.html'
})
export class MediaDynamiqueUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    dureeSeconde: []
  });

  constructor(protected mediaDynamiqueService: MediaDynamiqueService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mediaDynamique }) => {
      this.updateForm(mediaDynamique);
    });
  }

  updateForm(mediaDynamique: IMediaDynamique): void {
    this.editForm.patchValue({
      id: mediaDynamique.id,
      dureeSeconde: mediaDynamique.dureeSeconde
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mediaDynamique = this.createFromForm();
    if (mediaDynamique.id !== undefined) {
      this.subscribeToSaveResponse(this.mediaDynamiqueService.update(mediaDynamique));
    } else {
      this.subscribeToSaveResponse(this.mediaDynamiqueService.create(mediaDynamique));
    }
  }

  private createFromForm(): IMediaDynamique {
    return {
      ...new MediaDynamique(),
      id: this.editForm.get(['id'])!.value,
      dureeSeconde: this.editForm.get(['dureeSeconde'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMediaDynamique>>): void {
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
