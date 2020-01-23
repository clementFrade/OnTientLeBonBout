import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvite } from 'app/shared/model/invite.model';

@Component({
  selector: 'jhi-invite-detail',
  templateUrl: './invite-detail.component.html'
})
export class InviteDetailComponent implements OnInit {
  invite: IInvite | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invite }) => {
      this.invite = invite;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
