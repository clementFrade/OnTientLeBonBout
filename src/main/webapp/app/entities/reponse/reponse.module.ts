import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnTientLeBonBoutSharedModule } from 'app/shared/shared.module';
import { ReponseComponent } from './reponse.component';
import { ReponseDetailComponent } from './reponse-detail.component';
import { ReponseUpdateComponent } from './reponse-update.component';
import { ReponseDeleteDialogComponent } from './reponse-delete-dialog.component';
import { reponseRoute } from './reponse.route';

@NgModule({
  imports: [OnTientLeBonBoutSharedModule, RouterModule.forChild(reponseRoute)],
  declarations: [ReponseComponent, ReponseDetailComponent, ReponseUpdateComponent, ReponseDeleteDialogComponent],
  entryComponents: [ReponseDeleteDialogComponent]
})
export class OnTientLeBonBoutReponseModule {}
