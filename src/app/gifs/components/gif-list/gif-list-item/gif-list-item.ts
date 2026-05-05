import { Component, input } from '@angular/core';
import { Gif } from '../../../interfaces/gif.interface';

@Component({
  selector: 'app-gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.html'
})
export class GifListItem {
   imagenes = input.required<Gif[]>();
}
