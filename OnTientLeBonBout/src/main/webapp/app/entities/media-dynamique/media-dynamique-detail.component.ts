import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMediaDynamique } from 'app/shared/model/media-dynamique.model';

@Component({
  selector: 'jhi-media-dynamique-detail',
  templateUrl: './media-dynamique-detail.component.html'
})
export class MediaDynamiqueDetailComponent implements OnInit {
  mediaDynamique: IMediaDynamique;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mediaDynamique }) => {
      this.mediaDynamique = mediaDynamique;
    });
  }

  previousState() {
    window.history.back();
  }
}
