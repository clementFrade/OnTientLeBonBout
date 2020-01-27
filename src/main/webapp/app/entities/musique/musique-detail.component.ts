import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMusique } from 'app/shared/model/musique.model';

@Component({
  selector: 'jhi-musique-detail',
  templateUrl: './musique-detail.component.html'
})
export class MusiqueDetailComponent implements OnInit {
  musique: IMusique | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ musique }) => {
      this.musique = musique;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
