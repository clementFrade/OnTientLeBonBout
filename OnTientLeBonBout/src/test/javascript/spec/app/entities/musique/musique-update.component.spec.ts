/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { MusiqueUpdateComponent } from 'app/entities/musique/musique-update.component';
import { MusiqueService } from 'app/entities/musique/musique.service';
import { Musique } from 'app/shared/model/musique.model';

describe('Component Tests', () => {
  describe('Musique Management Update Component', () => {
    let comp: MusiqueUpdateComponent;
    let fixture: ComponentFixture<MusiqueUpdateComponent>;
    let service: MusiqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [MusiqueUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MusiqueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MusiqueUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MusiqueService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Musique(123);
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
        const entity = new Musique();
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
