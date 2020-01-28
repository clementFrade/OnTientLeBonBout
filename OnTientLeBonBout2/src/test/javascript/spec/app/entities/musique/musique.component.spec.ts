/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { MusiqueComponent } from 'app/entities/musique/musique.component';
import { MusiqueService } from 'app/entities/musique/musique.service';
import { Musique } from 'app/shared/model/musique.model';

describe('Component Tests', () => {
  describe('Musique Management Component', () => {
    let comp: MusiqueComponent;
    let fixture: ComponentFixture<MusiqueComponent>;
    let service: MusiqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [MusiqueComponent],
        providers: []
      })
        .overrideTemplate(MusiqueComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MusiqueComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MusiqueService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Musique(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.musiques[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
