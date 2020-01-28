/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { MusiqueDeleteDialogComponent } from 'app/entities/musique/musique-delete-dialog.component';
import { MusiqueService } from 'app/entities/musique/musique.service';

describe('Component Tests', () => {
  describe('Musique Management Delete Component', () => {
    let comp: MusiqueDeleteDialogComponent;
    let fixture: ComponentFixture<MusiqueDeleteDialogComponent>;
    let service: MusiqueService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [MusiqueDeleteDialogComponent]
      })
        .overrideTemplate(MusiqueDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MusiqueDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MusiqueService);
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
