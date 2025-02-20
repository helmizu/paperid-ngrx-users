import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Observable, tap } from "rxjs";
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from "@angular/router";
import { LoadingService } from "./loading.service";

/*
To turn off loading for certain http requests, set the context as in this example
this.http.get("/api/courses", {
  context: new HttpContext().set(SkipLoading, true),
});

To show loading during router route transitions
add the attribute to the loading element as in this example
<loading [detectRouteTransitions]="true"></loading>

 To use the http interceptor add this to the app module providers
     {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        MatProgressSpinner,
        NgTemplateOutlet,
    ],
    selector: 'loading',
    standalone: true,
    styleUrl: './loading.component.scss',
    templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnInit {
    @ContentChild("loading") customLoadingIndicator: TemplateRef<any> | null = null;
    @Input() detectRouteTransitions = false;
    loading$: Observable<boolean>;

    constructor(
        private loadingService: LoadingService,
        private router: Router) {
        this.loading$ = this.loadingService.loading$;
    }

    ngOnInit() {
        if (this.detectRouteTransitions) {
            this.router.events
                .pipe(
                    tap((event) => {
                        if (event instanceof RouteConfigLoadStart) {
                            this.loadingService.loadingOn();
                        } else if (event instanceof RouteConfigLoadEnd) {
                            this.loadingService.loadingOff();
                        }
                    })
                )
                .subscribe();
        }
    }
}
