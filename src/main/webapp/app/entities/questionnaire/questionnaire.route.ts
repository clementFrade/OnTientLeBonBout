import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IQuestionnaire, Questionnaire } from 'app/shared/model/questionnaire.model';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireComponent } from './questionnaire.component';
import { QuestionnaireDetailComponent } from './questionnaire-detail.component';
import { QuestionnaireUpdateComponent } from './questionnaire-update.component';

@Injectable({ providedIn: 'root' })
export class QuestionnaireResolve implements Resolve<IQuestionnaire> {
  constructor(private service: QuestionnaireService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuestionnaire> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((questionnaire: HttpResponse<Questionnaire>) => {
          if (questionnaire.body) {
            return of(questionnaire.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Questionnaire());
  }
}

export const questionnaireRoute: Routes = [
  {
    path: '',
    component: QuestionnaireComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.questionnaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: QuestionnaireDetailComponent,
    resolve: {
      questionnaire: QuestionnaireResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.questionnaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: QuestionnaireUpdateComponent,
    resolve: {
      questionnaire: QuestionnaireResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.questionnaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: QuestionnaireUpdateComponent,
    resolve: {
      questionnaire: QuestionnaireResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'onTientLeBonBoutApp.questionnaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
