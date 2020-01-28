import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OnTientLeBonBoutSharedModule } from 'app/shared';
import {
  MediaDynamiqueComponent,
  MediaDynamiqueDetailComponent,
  MediaDynamiqueUpdateComponent,
  MediaDynamiqueDeletePopupComponent,
  MediaDynamiqueDeleteDialogComponent,
  mediaDynamiqueRoute,
  mediaDynamiquePopupRoute
} from './';

const ENTITY_STATES = [...mediaDynamiqueRoute, ...mediaDynamiquePopupRoute];

@NgModule({
  imports: [OnTientLeBonBoutSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MediaDynamiqueComponent,
    MediaDynamiqueDetailComponent,
    MediaDynamiqueUpdateComponent,
    MediaDynamiqueDeleteDialogComponent,
    MediaDynamiqueDeletePopupComponent
  ],
  entryComponents: [
    MediaDynamiqueComponent,
    MediaDynamiqueUpdateComponent,
    MediaDynamiqueDeleteDialogComponent,
    MediaDynamiqueDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnTientLeBonBoutMediaDynamiqueModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
