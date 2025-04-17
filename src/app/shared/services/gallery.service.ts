import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface IImageType{
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface IImage{
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: IImageType;
  liked: boolean;
  alt: string;
}

export interface IImagesPage{
  page: number;
  per_page: number,
  photos: IImage[],
  next_page: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  public images$: BehaviorSubject<IImage[]> = new BehaviorSubject<IImage[]>([]);
  public image$: BehaviorSubject<IImage> = new BehaviorSubject<IImage>({} as IImage);

  public constructor(public http: HttpClient) {
  }

  public getImages(amount: number = 80): Observable<IImage[]> {
    return this.http.get<IImagesPage>(`https://api.pexels.com/v1/curated?per_page=${amount}`, {
      headers: {
        Authorization: '563492ad6f917000010000018550af4ae3b941f1b5605270941a403b'
      }
    }).pipe(
      map(page => {
        return page.photos
      })
    );
  }

  public getImage(id: number = 0): Observable<IImage> {
    return this.http.get<IImage>(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: '563492ad6f917000010000018550af4ae3b941f1b5605270941a403b'
      }
    });
  }
}
