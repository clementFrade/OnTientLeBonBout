/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnTientLeBonBoutTestModule } from '../../../test.module';
import { InviteDetailComponent } from 'app/entities/invite/invite-detail.component';
import { Invite } from 'app/shared/model/invite.model';

describe('Component Tests', () => {
  describe('Invite Management Detail Component', () => {
    let comp: InviteDetailComponent;
    let fixture: ComponentFixture<InviteDetailComponent>;
    const route = ({ data: of({ invite: new Invite(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnTientLeBonBoutTestModule],
        declarations: [InviteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(InviteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InviteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.invite).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
