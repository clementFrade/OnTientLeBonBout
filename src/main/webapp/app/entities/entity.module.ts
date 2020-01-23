import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.OnTientLeBonBoutClientModule)
      },
      {
        path: 'question',
        loadChildren: () => import('./question/question.module').then(m => m.OnTientLeBonBoutQuestionModule)
      },
      {
        path: 'questionnaire',
        loadChildren: () => import('./questionnaire/questionnaire.module').then(m => m.OnTientLeBonBoutQuestionnaireModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./theme/theme.module').then(m => m.OnTientLeBonBoutThemeModule)
      },
      {
        path: 'reponse',
        loadChildren: () => import('./reponse/reponse.module').then(m => m.OnTientLeBonBoutReponseModule)
      },
      {
        path: 'invite',
        loadChildren: () => import('./invite/invite.module').then(m => m.OnTientLeBonBoutInviteModule)
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.OnTientLeBonBoutMediaModule)
      },
      {
        path: 'media-statique',
        loadChildren: () => import('./media-statique/media-statique.module').then(m => m.OnTientLeBonBoutMediaStatiqueModule)
      },
      {
        path: 'image',
        loadChildren: () => import('./image/image.module').then(m => m.OnTientLeBonBoutImageModule)
      },
      {
        path: 'media-dynamique',
        loadChildren: () => import('./media-dynamique/media-dynamique.module').then(m => m.OnTientLeBonBoutMediaDynamiqueModule)
      },
      {
        path: 'video',
        loadChildren: () => import('./video/video.module').then(m => m.OnTientLeBonBoutVideoModule)
      },
      {
        path: 'musique',
        loadChildren: () => import('./musique/musique.module').then(m => m.OnTientLeBonBoutMusiqueModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class OnTientLeBonBoutEntityModule {}
