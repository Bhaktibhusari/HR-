import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  static baseurl = "localhost:3000"

  constructor(
    public http: HttpClient
  ) { }


  collection(entityname) {
    return this.http.get(ApiServiceService.baseurl + `/${entityname}`)
  }



}

