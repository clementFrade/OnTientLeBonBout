import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnTientLeBonBoutSharedModule } from 'app/shared/shared.module';
import { MediaDynamiqueComponent } from './media-dynamique.component';
import { MediaDynamiqueDetailComponent } from './media-dynamique-detail.component';
import { MediaDynamiqueUpdateComponent } from './media-dynamique-update.component';
import { MediaDynamiqueDeleteDialogComponent } from './media-dynamique-delete-dialog.component';
import { mediaDynamiqueRoute } from './media-dynamique.route';

@NgModule({
  imports: [OnTientLeBonBoutSharedModule, RouterModule.forChild(mediaDynamiqueRoute)],
  declarations: [
    MediaDynamiqueComponent,
    MediaDynamiqueDetailComponent,
    MediaDynamiqueUpdateComponent,
    MediaDynamiqueDeleteDialogComponent
  ],
  entryComponents: [MediaDynamiqueDeleteDialogComponent]
})
export class OnTientLeBonBoutMediaDynamiqueModule {}
