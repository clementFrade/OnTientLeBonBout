import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVideo } from 'app/shared/model/video.model';
import { VideoService } from './video.service';
import { VideoDeleteDialogComponent } from './video-delete-dialog.component';

@Component({
  selector: 'jhi-video',
  templateUrl: './video.component.html'
})
export class VideoComponent implements OnInit, OnDestroy {
  videos?: IVideo[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected videoService: VideoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.videoService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IVideo[]>) => (this.videos = res.body ? res.body : []));
      return;
    }
    this.videoService.query().subscribe((res: HttpResponse<IVideo[]>) => {
      this.videos = res.body ? res.body : [];
      this.currentSearch = '';
    });
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVideos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVideo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVideos(): void {
    this.eventSubscriber = this.eventManager.subscribe('videoListModification', () => this.loadAll());
  }

  delete(video: IVideo): void {
    const modalRef = this.modalService.open(VideoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.video = video;
  }
}
