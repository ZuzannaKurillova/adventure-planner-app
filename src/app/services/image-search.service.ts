import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ImageSearchService {
  private _http = inject(HttpClient);

  async getImage(term : string) : Promise<string>  {
    const url = 'https://pixabay.com/api/?key=' + environment.pixabayApiKey +'&q=' + term;

    const images = await firstValueFrom(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._http.get<any>(url),
    );

    return images.hits.length > 0 ? images.hits[0].webformatURL : null;
  }
}
