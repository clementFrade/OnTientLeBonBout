import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnTientLeBonBoutSharedModule } from 'app/shared/shared.module';
import { MediaStatiqueComponent } from './media-statique.component';
import { MediaStatiqueDetailComponent } from './media-statique-detail.component';
import { MediaStatiqueUpdateComponent } from './media-statique-update.component';
import { MediaStatiqueDeleteDialogComponent } from './media-statique-delete-dialog.component';
import { mediaStatiqueRoute } from './media-statique.route';

@NgModule({
  imports: [OnTientLeBonBoutSharedModule, RouterModule.forChild(mediaStatiqueRoute)],
  declarations: [MediaStatiqueComponent, MediaStatiqueDetailComponent, MediaStatiqueUpdateComponent, MediaStatiqueDeleteDialogComponent],
  entryComponents: [MediaStatiqueDeleteDialogComponent]
})
export class OnTientLeBonBoutMediaStatiqueModule {}
