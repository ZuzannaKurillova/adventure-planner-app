import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageSearchService {
  private _http = inject(HttpClient);

  async getImage(term : string) : Promise<string>  {
    const key = '29488159-1880c8e57abac8402e021f526';
    const url = 'https://pixabay.com/api/?key=' + key +'&q=' + term;

    const images = await firstValueFrom(
      this._http.get<any>(url),
    );

    return images.hits.length > 0 ? images.hits[0].webformatURL : null;
  }
}
