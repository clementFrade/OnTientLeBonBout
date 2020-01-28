/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { MediaDynamiqueDetailComponent } from 'app/entities/media-dynamique/media-dynamique-detail.component';
import { MediaDynamique } from 'app/shared/model/media-dynamique.model';

describe('Component Tests', () => {
  describe('MediaDynamique Management Detail Component', () => {
    let comp: MediaDynamiqueDetailComponent;
    let fixture: ComponentFixture<MediaDynamiqueDetailComponent>;
    const route = ({ data: of({ mediaDynamique: new MediaDynamique(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [MediaDynamiqueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MediaDynamiqueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MediaDynamiqueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mediaDynamique).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
