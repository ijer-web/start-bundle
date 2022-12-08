import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private http: HttpClient
  ) {
  }

  testRequest() {
    let testUrl = 'https://catfact.ninja/fact';
    return this.http.get(testUrl)
  }
}
