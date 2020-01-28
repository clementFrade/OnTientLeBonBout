/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { MusiqueDetailComponent } from 'app/entities/musique/musique-detail.component';
import { Musique } from 'app/shared/model/musique.model';

describe('Component Tests', () => {
  describe('Musique Management Detail Component', () => {
    let comp: MusiqueDetailComponent;
    let fixture: ComponentFixture<MusiqueDetailComponent>;
    const route = ({ data: of({ musique: new Musique(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [MusiqueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MusiqueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MusiqueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.musique).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
