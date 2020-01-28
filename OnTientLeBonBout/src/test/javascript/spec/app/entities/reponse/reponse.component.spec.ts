/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { ReponseComponent } from 'app/entities/reponse/reponse.component';
import { ReponseService } from 'app/entities/reponse/reponse.service';
import { Reponse } from 'app/shared/model/reponse.model';

describe('Component Tests', () => {
  describe('Reponse Management Component', () => {
    let comp: ReponseComponent;
    let fixture: ComponentFixture<ReponseComponent>;
    let service: ReponseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [ReponseComponent],
        providers: []
      })
        .overrideTemplate(ReponseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReponseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReponseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Reponse(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.reponses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
