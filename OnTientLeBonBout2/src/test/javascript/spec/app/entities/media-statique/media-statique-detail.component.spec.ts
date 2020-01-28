/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { MediaStatiqueDetailComponent } from 'app/entities/media-statique/media-statique-detail.component';
import { MediaStatique } from 'app/shared/model/media-statique.model';

describe('Component Tests', () => {
  describe('MediaStatique Management Detail Component', () => {
    let comp: MediaStatiqueDetailComponent;
    let fixture: ComponentFixture<MediaStatiqueDetailComponent>;
    const route = ({ data: of({ mediaStatique: new MediaStatique(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [MediaStatiqueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MediaStatiqueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MediaStatiqueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mediaStatique).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
