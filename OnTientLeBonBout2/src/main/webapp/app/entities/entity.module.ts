import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: './client/client.module#OnTientLeBonBoutClientModule'
      },
      {
        path: 'question',
        loadChildren: './question/question.module#OnTientLeBonBoutQuestionModule'
      },
      {
        path: 'questionnaire',
        loadChildren: './questionnaire/questionnaire.module#OnTientLeBonBoutQuestionnaireModule'
      },
      {
        path: 'theme',
        loadChildren: './theme/theme.module#OnTientLeBonBoutThemeModule'
      },
      {
        path: 'reponse',
        loadChildren: './reponse/reponse.module#OnTientLeBonBoutReponseModule'
      },
      {
        path: 'invite',
        loadChildren: './invite/invite.module#OnTientLeBonBoutInviteModule'
      },
      {
        path: 'media',
        loadChildren: './media/media.module#OnTientLeBonBoutMediaModule'
      },
      {
        path: 'media-statique',
        loadChildren: './media-statique/media-statique.module#OnTientLeBonBoutMediaStatiqueModule'
      },
      {
        path: 'image',
        loadChildren: './image/image.module#OnTientLeBonBoutImageModule'
      },
      {
        path: 'media-dynamique',
        loadChildren: './media-dynamique/media-dynamique.module#OnTientLeBonBoutMediaDynamiqueModule'
      },
      {
        path: 'video',
        loadChildren: './video/video.module#OnTientLeBonBoutVideoModule'
      },
      {
        path: 'musique',
        loadChildren: './musique/musique.module#OnTientLeBonBoutMusiqueModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnTientLeBonBoutEntityModule {}
