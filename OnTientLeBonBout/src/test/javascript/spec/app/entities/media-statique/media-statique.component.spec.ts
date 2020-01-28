/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { MediaStatiqueComponent } from 'app/entities/media-statique/media-statique.component';
import { MediaStatiqueService } from 'app/entities/media-statique/media-statique.service';
import { MediaStatique } from 'app/shared/model/media-statique.model';

describe('Component Tests', () => {
  describe('MediaStatique Management Component', () => {
    let comp: MediaStatiqueComponent;
    let fixture: ComponentFixture<MediaStatiqueComponent>;
    let service: MediaStatiqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [MediaStatiqueComponent],
        providers: []
      })
        .overrideTemplate(MediaStatiqueComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MediaStatiqueComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MediaStatiqueService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MediaStatique(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mediaStatiques[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
