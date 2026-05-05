import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { GiphyResponse } from '../gifs/interfaces/giphy.interface';
import { GifMapper } from '../gifs/mapper/gif.mapper';
import { Gif } from '../gifs/interfaces/gif.interface';
import tr from '@angular/common/locales/tr';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.trendingGifsLoading.set(true);
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: 20,

      },
    }).subscribe( (rest) => {
       const gifs = GifMapper.mapGiphyResponseToGifs(rest.data);
       this.trendingGifs.set(gifs);
       this.trendingGifsLoading.set(false);
       console.log({gifs});
    } );
  }



}
