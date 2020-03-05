import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment} from '../environments/environment';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class DatastroeService {
  Url: string = environment.serverUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getData(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.Url}/getUnion`);
  }
}

