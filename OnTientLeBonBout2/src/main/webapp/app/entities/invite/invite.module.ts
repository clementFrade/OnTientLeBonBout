import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { OnTientLeBonBoutSharedModule } from 'app/shared';
import {
  InviteComponent,
  InviteDetailComponent,
  InviteUpdateComponent,
  InviteDeletePopupComponent,
  InviteDeleteDialogComponent,
  inviteRoute,
  invitePopupRoute
} from './';

const ENTITY_STATES = [...inviteRoute, ...invitePopupRoute];

@NgModule({
  imports: [OnTientLeBonBoutSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [InviteComponent, InviteDetailComponent, InviteUpdateComponent, InviteDeleteDialogComponent, InviteDeletePopupComponent],
  entryComponents: [InviteComponent, InviteUpdateComponent, InviteDeleteDialogComponent, InviteDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnTientLeBonBoutInviteModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
