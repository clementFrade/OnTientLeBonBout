import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OnTientLeBonBoutSharedModule } from 'app/shared';
import {
  MusiqueComponent,
  MusiqueDetailComponent,
  MusiqueUpdateComponent,
  MusiqueDeletePopupComponent,
  MusiqueDeleteDialogComponent,
  musiqueRoute,
  musiquePopupRoute
} from './';

const ENTITY_STATES = [...musiqueRoute, ...musiquePopupRoute];

@NgModule({
  imports: [OnTientLeBonBoutSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MusiqueComponent,
    MusiqueDetailComponent,
    MusiqueUpdateComponent,
    MusiqueDeleteDialogComponent,
    MusiqueDeletePopupComponent
  ],
  entryComponents: [MusiqueComponent, MusiqueUpdateComponent, MusiqueDeleteDialogComponent, MusiqueDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnTientLeBonBoutMusiqueModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
