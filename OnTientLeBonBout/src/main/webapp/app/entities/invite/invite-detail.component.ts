import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvite } from 'app/shared/model/invite.model';

@Component({
  selector: 'jhi-invite-detail',
  templateUrl: './invite-detail.component.html'
})
export class InviteDetailComponent implements OnInit {
  invite: IInvite;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ invite }) => {
      this.invite = invite;
    });
  }

  previousState() {
    window.history.back();
  }
}
