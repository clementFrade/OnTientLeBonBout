import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnTientLeBonBoutSharedModule } from 'app/shared/shared.module';
import { QuestionnaireComponent } from './questionnaire.component';
import { QuestionnaireDetailComponent } from './questionnaire-detail.component';
import { QuestionnaireUpdateComponent } from './questionnaire-update.component';
import { QuestionnaireDeleteDialogComponent } from './questionnaire-delete-dialog.component';
import { questionnaireRoute } from './questionnaire.route';

@NgModule({
  imports: [OnTientLeBonBoutSharedModule, RouterModule.forChild(questionnaireRoute)],
  declarations: [QuestionnaireComponent, QuestionnaireDetailComponent, QuestionnaireUpdateComponent, QuestionnaireDeleteDialogComponent],
  entryComponents: [QuestionnaireDeleteDialogComponent]
})
export class OnTientLeBonBoutQuestionnaireModule {}
