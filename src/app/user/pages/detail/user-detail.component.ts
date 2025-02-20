import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserDetailFacadeService } from './user-detail-facade.service';
import { User } from '../../services/user.types';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'user-detail',
  imports: [AsyncPipe, CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './user-detail.component.html',
  standalone: true,
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  private routeSub: Subscription | undefined;
  user$: Observable<User | undefined> = this.userDetailFacade.user$;
  isUserLoading$: Observable<boolean> = this.userDetailFacade.isUserLoading$;

  constructor(
    private route: ActivatedRoute,
    private userDetailFacade: UserDetailFacadeService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.userDetailFacade.loadUser(+userId);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
