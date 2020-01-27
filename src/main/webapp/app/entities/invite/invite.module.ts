import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnTientLeBonBoutSharedModule } from 'app/shared/shared.module';
import { InviteComponent } from './invite.component';
import { InviteDetailComponent } from './invite-detail.component';
import { InviteUpdateComponent } from './invite-update.component';
import { InviteDeleteDialogComponent } from './invite-delete-dialog.component';
import { inviteRoute } from './invite.route';

@NgModule({
  imports: [OnTientLeBonBoutSharedModule, RouterModule.forChild(inviteRoute)],
  declarations: [InviteComponent, InviteDetailComponent, InviteUpdateComponent, InviteDeleteDialogComponent],
  entryComponents: [InviteDeleteDialogComponent]
})
export class OnTientLeBonBoutInviteModule {}
