import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public headers = new HttpHeaders();
  protected API_URL: string = environment.hosts.api_host;

  constructor(public http: HttpClient) {
  }

  public get(path: string, remote: boolean = false): Observable<any> {
    if (!remote) {
      const endpoint = this.API_URL + path;

      return this.http.get(endpoint);
    } else {
      return this.http.get(path);
    }
  }

  public post(path: string, body: any = {}, remote: boolean = false): Observable<any> {
    if (!remote) {
      const endpoint = this.API_URL + path;

      return this.http.post(endpoint, body);
    } else {
      return this.http.post(path, body);
    }
  }

  public delete(path: string): Observable<any> {
    const endpoint = this.API_URL + path;

    return this.http.delete(endpoint);
  }

  public update(path: string, body: any): Observable<any> {
    const endpoint = this.API_URL + path;

    return this.http.put(endpoint, body);
  }

}
