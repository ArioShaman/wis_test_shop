import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(public http: HttpClient) {
    }

    API_URL : string = environment.hosts.api_host;

    public headers = new HttpHeaders();

    public get(path, remote = false) : Observable<any>{
        if(!remote){
            var endpoint = this.API_URL + path;
            return this.http.get(endpoint);
        }else{
            return this.http.get(path);
        }
    }
 
    public post(path:string, body:any = {}, remote = false) {
        if(!remote){
            var endpoint = this.API_URL + path;
            return this.http.post(endpoint, body);
        }else{
            return this.http.post(path, body);
        }
    }
    
    public delete(path:string){
        var endpoint = this.API_URL + path;
        return this.http.delete(endpoint);
    }  
  
    public update(path:string, body:any){
        var endpoint = this.API_URL + path;
        return this.http.put(endpoint, body);
    } 
}
