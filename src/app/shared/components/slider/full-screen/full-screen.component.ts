import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GalleryService, IImage} from '../../../services/gallery.service';
import {switchMap} from "rxjs/operators";
import {Observable} from 'rxjs';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-full-screen-gallery',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent implements OnInit, OnDestroy {

  private subs: SubSink = new SubSink();
  public image$?: Observable<IImage>;
  @Output() public eventFullScreen: EventEmitter<string> = new EventEmitter<string>();
  @Input() public initialId: string;

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.initImages();
    this.image$ = this.galleryService.getImage(+this.initialId);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private initImages(){
    const checkImages = !this.galleryService.images$.value.length;
    if (checkImages) {
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
    this.image$ = this.galleryService.getImage(nextId);
  }

  public onExit(){
    this.eventFullScreen.emit('');
  }
}
