/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { MediaDynamiqueComponent } from 'app/entities/media-dynamique/media-dynamique.component';
import { MediaDynamiqueService } from 'app/entities/media-dynamique/media-dynamique.service';
import { MediaDynamique } from 'app/shared/model/media-dynamique.model';

describe('Component Tests', () => {
  describe('MediaDynamique Management Component', () => {
    let comp: MediaDynamiqueComponent;
    let fixture: ComponentFixture<MediaDynamiqueComponent>;
    let service: MediaDynamiqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [MediaDynamiqueComponent],
        providers: []
      })
        .overrideTemplate(MediaDynamiqueComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MediaDynamiqueComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MediaDynamiqueService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MediaDynamique(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mediaDynamiques[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
