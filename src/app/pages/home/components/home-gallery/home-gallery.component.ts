import {Component, OnDestroy, OnInit} from '@angular/core';
import {GalleryService, IImage} from '../../../../shared/services/gallery.service';
import {SubSink} from 'subsink';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Observable, timer} from 'rxjs';
import {WIN_SIZES} from '../../../../app.config';
import {debounce} from 'rxjs/operators';

@Component({
    selector: 'app-home-gallery',
    templateUrl: './home-gallery.component.html',
    styleUrls: ['./home-gallery.component.scss'],
    standalone: false
})
export class HomeGalleryComponent implements OnInit, OnDestroy {
  private subs: SubSink = new SubSink();
  public images$: Observable<IImage[]> = new Observable<IImage[]>();

  public constructor(private galleryService: GalleryService,
                     private bpObserver: BreakpointObserver) {
    this.subs.add(
      bpObserver
        .observe([
          `(min-width: ${WIN_SIZES.XS}px)`,
          `(min-width: ${WIN_SIZES.SM}px)`,
          `(min-width: ${WIN_SIZES.MD}px)`,
          `(min-width: ${WIN_SIZES.LG}px)`,
          `(min-width: ${WIN_SIZES.XL}px)`
        ]).pipe(
        debounce(() => timer(500))
      ).subscribe((result) => {
        if (result['breakpoints'][`(min-width: ${WIN_SIZES.XL}px)`]) {
          this.updateImages(12);
        } else if (result['breakpoints'][`(min-width: ${WIN_SIZES.LG}px)`]) {
          this.updateImages(10);
        } else if (result['breakpoints'][`(min-width: ${WIN_SIZES.MD}px)`]) {
          this.updateImages(8);
        } else if (result['breakpoints'][`(min-width: ${WIN_SIZES.SM}px)`]) {
          this.updateImages(6);
        } else {
          this.updateImages(4);
        }
      })
    );
  }

  public ngOnInit(): void {
    return;
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private updateImages(imagesAmount: number): void {
    this.images$ = this.galleryService.getImages(imagesAmount);
  }

}
