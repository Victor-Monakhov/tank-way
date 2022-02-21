import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GalleryService, Image} from "../../../../shared/slider/services/gallery.service";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {SubSink} from "subsink";

@Component({
  selector: 'app-full-screen-gallery',
  templateUrl: './full-screen-gallery.component.html',
  styleUrls: ['./full-screen-gallery.component.scss']
})
export class FullScreenGalleryComponent implements OnInit, OnDestroy {

  private subs: SubSink = new SubSink();
  public image$?: Observable<Image>;

  constructor(private router: Router, private galleryService: GalleryService, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initImages();
    this.image$ = this.galleryService.getImage(this.aRoute.snapshot.params['id']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private initImages(){
    const checkImages = !this.galleryService.images$.value.length;
    if (checkImages && this.aRoute.snapshot.params['id']) {
      this.subs.add(this.galleryService.getImages().subscribe(images => {
        this.galleryService.images$.next(images);
      }));
    }
  }

  public onExit(){
    this.router.navigate(['/']);
  }

}
