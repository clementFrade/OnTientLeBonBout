import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMediaDynamique } from 'app/shared/model/media-dynamique.model';

@Component({
  selector: 'jhi-media-dynamique-detail',
  templateUrl: './media-dynamique-detail.component.html'
})
export class MediaDynamiqueDetailComponent implements OnInit {
  mediaDynamique: IMediaDynamique | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mediaDynamique }) => {
      this.mediaDynamique = mediaDynamique;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
