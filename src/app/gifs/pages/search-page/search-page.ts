import { Component, inject, signal } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from '../../../services/gifs-service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.html',
})
export default class SearchPage {

  searchSevice = inject(GifsService);
  gifs = signal<Gif[]>([]);

  onSearch(nombre: string) {
     this.searchSevice.buscarGifs(nombre).subscribe( (rest) => {
         this.gifs.set(rest)
     } );
  }

}
