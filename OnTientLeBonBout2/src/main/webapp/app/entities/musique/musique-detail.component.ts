import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMusique } from 'app/shared/model/musique.model';

@Component({
  selector: 'jhi-musique-detail',
  templateUrl: './musique-detail.component.html'
})
export class MusiqueDetailComponent implements OnInit {
  musique: IMusique;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ musique }) => {
      this.musique = musique;
    });
  }

  previousState() {
    window.history.back();
  }
}
