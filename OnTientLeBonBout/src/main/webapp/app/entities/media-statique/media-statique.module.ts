import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OnTientLeBonBoutSharedModule } from 'app/shared';
import {
  MediaStatiqueComponent,
  MediaStatiqueDetailComponent,
  MediaStatiqueUpdateComponent,
  MediaStatiqueDeletePopupComponent,
  MediaStatiqueDeleteDialogComponent,
  mediaStatiqueRoute,
  mediaStatiquePopupRoute
} from './';

const ENTITY_STATES = [...mediaStatiqueRoute, ...mediaStatiquePopupRoute];

@NgModule({
  imports: [OnTientLeBonBoutSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MediaStatiqueComponent,
    MediaStatiqueDetailComponent,
    MediaStatiqueUpdateComponent,
    MediaStatiqueDeleteDialogComponent,
    MediaStatiqueDeletePopupComponent
  ],
  entryComponents: [
    MediaStatiqueComponent,
    MediaStatiqueUpdateComponent,
    MediaStatiqueDeleteDialogComponent,
    MediaStatiqueDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnTientLeBonBoutMediaStatiqueModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
