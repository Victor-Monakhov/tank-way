import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {createClient} from "pexels";

export interface ImageType{
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface Image{
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: ImageType;
  liked: boolean;
  alt: string;
}

export interface ImagesPage{
  page: number;
  per_page: number,
  photos: Image[],
  next_page: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  public images$: BehaviorSubject<Image[]> = new BehaviorSubject<Image[]>([]);
  public image$: BehaviorSubject<Image> = new BehaviorSubject<Image>({} as Image);

  constructor(public http: HttpClient) {
  }

  public getImages(): Observable<Image[]>{
    return this.http.get<ImagesPage>("https://api.pexels.com/v1/curated?per_page=80", {
      headers: {
        Authorization: '563492ad6f917000010000018550af4ae3b941f1b5605270941a403b'
      }
    }).pipe(
      map(page => {
        return page.photos
      })
    );
  }

  public getImage(id: number = 0): Observable<Image>{
    return this.http.get<Image>(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: '563492ad6f917000010000018550af4ae3b941f1b5605270941a403b'
      }
    });
  }
}
