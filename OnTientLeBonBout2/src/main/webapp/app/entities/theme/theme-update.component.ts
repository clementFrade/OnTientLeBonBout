import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITheme, Theme } from 'app/shared/model/theme.model';
import { ThemeService } from './theme.service';

@Component({
  selector: 'jhi-theme-update',
  templateUrl: './theme-update.component.html'
})
export class ThemeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    intitule: []
  });

  constructor(protected themeService: ThemeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ theme }) => {
      this.updateForm(theme);
    });
  }

  updateForm(theme: ITheme) {
    this.editForm.patchValue({
      id: theme.id,
      intitule: theme.intitule
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const theme = this.createFromForm();
    if (theme.id !== undefined) {
      this.subscribeToSaveResponse(this.themeService.update(theme));
    } else {
      this.subscribeToSaveResponse(this.themeService.create(theme));
    }
  }

  private createFromForm(): ITheme {
    return {
      ...new Theme(),
      id: this.editForm.get(['id']).value,
      intitule: this.editForm.get(['intitule']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITheme>>) {
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
