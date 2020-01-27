import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMediaStatique } from 'app/shared/model/media-statique.model';

@Component({
  selector: 'jhi-media-statique-detail',
  templateUrl: './media-statique-detail.component.html'
})
export class MediaStatiqueDetailComponent implements OnInit {
  mediaStatique: IMediaStatique | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mediaStatique }) => {
      this.mediaStatique = mediaStatique;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
