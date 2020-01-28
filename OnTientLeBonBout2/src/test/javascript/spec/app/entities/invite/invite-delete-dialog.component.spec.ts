/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { InviteDeleteDialogComponent } from 'app/entities/invite/invite-delete-dialog.component';
import { InviteService } from 'app/entities/invite/invite.service';

describe('Component Tests', () => {
  describe('Invite Management Delete Component', () => {
    let comp: InviteDeleteDialogComponent;
    let fixture: ComponentFixture<InviteDeleteDialogComponent>;
    let service: InviteService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [InviteDeleteDialogComponent]
      })
        .overrideTemplate(InviteDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InviteDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InviteService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
