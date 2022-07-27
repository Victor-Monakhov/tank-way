import {Component, OnDestroy, OnInit} from '@angular/core';
import {GalleryService, IImage} from '../../../../shared/services/gallery.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-home-gallery',
  templateUrl: './home-gallery.component.html',
  styleUrls: ['./home-gallery.component.scss']
})
export class HomeGalleryComponent implements OnInit, OnDestroy {
  private subs: SubSink = new SubSink();
  public images: IImage[] = [];

  public constructor(private galleryService: GalleryService) {
  }

  public ngOnInit(): void {
    this.subs.add(
      this.galleryService.getImages(8).subscribe((images) => {
        this.galleryService.images$.next(images);
        this.images = this.galleryService.images$.value;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
