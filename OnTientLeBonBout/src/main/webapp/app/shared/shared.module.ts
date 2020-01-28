import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OnTientLeBonBoutSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [OnTientLeBonBoutSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [OnTientLeBonBoutSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnTientLeBonBoutSharedModule {
  static forRoot() {
    return {
      ngModule: OnTientLeBonBoutSharedModule
    };
  }
}
