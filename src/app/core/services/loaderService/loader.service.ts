import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public show$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private requestQueue = new Set(); // requests Q


  addRequest(requestUrl: string) {
    if (this.ifRequestNoLoader(requestUrl)) {
      return;
    }
    this.requestQueue.add(requestUrl);
    this.toggle();
  }

  removeRequest(requestUrl: string) {
    this.requestQueue.delete(requestUrl);
    this.toggle();
  }

  hasRequest(requestUrl: string) {
    return this.requestQueue.has(requestUrl);
  }

  toggle() {
    if (this.hasRequestQueue && !this.isShowingSpinner) {
      this.show$.next(true);
      return;
    }
    if (!this.hasRequestQueue && this.isShowingSpinner) {
      this.show$.next(false);
      return;
    }
  }

  ifRequestNoLoader(requestUrl: string) {
    return this.listOfNoLoaderUrls().some(url => requestUrl.includes(url));
  }

  get isShowingSpinner() {
    return this.show$.getValue();
  }

  get hasRequestQueue() {
    return this.getRequestQueue.size > 0;
  }

  get getRequestQueue() {
    return this.requestQueue;
  }

  listOfNoLoaderUrls() {
    return ['/notifications/filter', 'screeningprocesses/list', 'filterdefinitions/filter'];
  }

}
