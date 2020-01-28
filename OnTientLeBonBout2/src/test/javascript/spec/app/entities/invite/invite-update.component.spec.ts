/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { InviteUpdateComponent } from 'app/entities/invite/invite-update.component';
import { InviteService } from 'app/entities/invite/invite.service';
import { Invite } from 'app/shared/model/invite.model';

describe('Component Tests', () => {
  describe('Invite Management Update Component', () => {
    let comp: InviteUpdateComponent;
    let fixture: ComponentFixture<InviteUpdateComponent>;
    let service: InviteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [InviteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(InviteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InviteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InviteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Invite(123);
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
        const entity = new Invite();
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
