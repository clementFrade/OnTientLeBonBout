import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnTientLeBonBoutSharedModule } from 'app/shared/shared.module';
import { MusiqueComponent } from './musique.component';
import { MusiqueDetailComponent } from './musique-detail.component';
import { MusiqueUpdateComponent } from './musique-update.component';
import { MusiqueDeleteDialogComponent } from './musique-delete-dialog.component';
import { musiqueRoute } from './musique.route';

@NgModule({
  imports: [OnTientLeBonBoutSharedModule, RouterModule.forChild(musiqueRoute)],
  declarations: [MusiqueComponent, MusiqueDetailComponent, MusiqueUpdateComponent, MusiqueDeleteDialogComponent],
  entryComponents: [MusiqueDeleteDialogComponent]
})
export class OnTientLeBonBoutMusiqueModule {}
