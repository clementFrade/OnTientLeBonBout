/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { MediaDynamiqueUpdateComponent } from 'app/entities/media-dynamique/media-dynamique-update.component';
import { MediaDynamiqueService } from 'app/entities/media-dynamique/media-dynamique.service';
import { MediaDynamique } from 'app/shared/model/media-dynamique.model';

describe('Component Tests', () => {
  describe('MediaDynamique Management Update Component', () => {
    let comp: MediaDynamiqueUpdateComponent;
    let fixture: ComponentFixture<MediaDynamiqueUpdateComponent>;
    let service: MediaDynamiqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [MediaDynamiqueUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MediaDynamiqueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MediaDynamiqueUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MediaDynamiqueService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MediaDynamique(123);
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
        const entity = new MediaDynamique();
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
