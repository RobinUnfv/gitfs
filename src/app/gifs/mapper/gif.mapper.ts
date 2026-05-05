import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from '../interfaces/giphy.interface';
export class GifMapper {

    static mapGiphyItemToGif(giphyData: GiphyItem): Gif {
        return {
            id: giphyData.id,
            title: giphyData.title,
            url: giphyData.images.original.url,
        };
    }

    static mapGiphyResponseToGifs(giphyResponse: GiphyItem[]): Gif[] {
        return giphyResponse.map( (item) => this.mapGiphyItemToGif(item) );
    }

  }
