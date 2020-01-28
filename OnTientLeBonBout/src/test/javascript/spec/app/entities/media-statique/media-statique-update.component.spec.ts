/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { MediaStatiqueUpdateComponent } from 'app/entities/media-statique/media-statique-update.component';
import { MediaStatiqueService } from 'app/entities/media-statique/media-statique.service';
import { MediaStatique } from 'app/shared/model/media-statique.model';

describe('Component Tests', () => {
  describe('MediaStatique Management Update Component', () => {
    let comp: MediaStatiqueUpdateComponent;
    let fixture: ComponentFixture<MediaStatiqueUpdateComponent>;
    let service: MediaStatiqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [MediaStatiqueUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MediaStatiqueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MediaStatiqueUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MediaStatiqueService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MediaStatique(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MediaStatique();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
