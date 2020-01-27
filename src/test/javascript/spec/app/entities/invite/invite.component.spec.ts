import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { InviteComponent } from 'app/entities/invite/invite.component';
import { InviteService } from 'app/entities/invite/invite.service';
import { Invite } from 'app/shared/model/invite.model';

describe('Component Tests', () => {
  describe('Invite Management Component', () => {
    let comp: InviteComponent;
    let fixture: ComponentFixture<InviteComponent>;
    let service: InviteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [InviteComponent],
        providers: []
      })
        .overrideTemplate(InviteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InviteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InviteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Invite(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.invites && comp.invites[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
