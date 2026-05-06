import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { GiphyResponse } from '../gifs/interfaces/giphy.interface';
import { GifMapper } from '../gifs/mapper/gif.mapper';
import { Gif } from '../gifs/interfaces/gif.interface';
import tr from '@angular/common/locales/tr';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);

  searchHistory = signal< Record<string, Gif[]> >({});
  searchHistoryKeys = computed( () => Object.keys(this.searchHistory()) );

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

  buscarGifs(nombre: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.apiKey,
        limit: 20,
        q: nombre,

      },
    }).pipe(
      map( ({data}) => data ),
      map( (items) => GifMapper.mapGiphyResponseToGifs(items) ),
      //historial
      tap( (items) => {
        this.searchHistory.update( (hist) => ({
          ...hist,
          [nombre.toLocaleLowerCase()]: items
        }) )
      } )
    );
  /*  .subscribe( (rest) => {
       const gifs = GifMapper.mapGiphyResponseToGifs(rest.data);

       console.log({search: gifs});
    } ); */
  }



}
