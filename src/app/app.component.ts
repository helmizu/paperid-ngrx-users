import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet,
        LoadingComponent,
        MatToolbarModule,
    ],
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'Paper.id';
}
