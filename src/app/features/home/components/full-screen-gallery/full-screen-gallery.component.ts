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
    this.subs.add(this.aRoute.params.subscribe(params => {
      this.image$ = this.galleryService.getImage(params['id']);
    }))

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

  public onNext(direction: boolean, id: number){
    let index: number = this.galleryService.images$.value.findIndex(image => image.id === id);
    if(index < 0){
      return;
    }
    if(direction){
      index++;
      if(index >= this.galleryService.images$.value.length){
        index = 0;
      }
    } else {
      index--;
      if(index < 0){
        index = this.galleryService.images$.value.length - 1;
      }
    }
    const nextId: number = this.galleryService.images$.value[index].id;
    this.router.navigate(['/full-screen', nextId]);
  }

  public onExit(){
    this.router.navigate(['/']);
  }
}
