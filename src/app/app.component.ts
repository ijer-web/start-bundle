import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestService} from './core/services/testService/test.service';
import {ReplaySubject} from 'rxjs';
import {LoaderService} from './core/services/loaderService/loader.service';
import {delay, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'start-bundle';
  result: object | undefined;

  public pageLoading = false;
  private destroy$: ReplaySubject<any> = new ReplaySubject();

  constructor(private testService: TestService, private loaderService: LoaderService) {
  }


  ngOnInit() {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loaderService.show$
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.pageLoading = loading;
      });
  }


  onMakeRequest() {
    this.testService.testRequest()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.result = res.fact || 'Empty response';
      }, error => {
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
