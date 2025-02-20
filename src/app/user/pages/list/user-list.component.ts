import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Observable } from "rxjs";
import { UserListFacadeService } from "./user-list-facade.service";
import { User } from "../../services/user.types";
import { Router } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, CommonModule, MatTableModule, MatPaginatorModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule],
    selector: 'user',
    standalone: true,
    templateUrl: './user-list.component.html',
})
export class UserListComponent implements AfterViewInit {
    isUsersEmpty$: Observable<boolean> = this.userListFacade.isUsersEmpty$;
    isUsersLoaded$: Observable<boolean> = this.userListFacade.isUsersLoaded$;
    isUsersLoading$: Observable<boolean> = this.userListFacade.isUsersLoading$;
    users$: Observable<User[]> = this.userListFacade.users$;
    value = this.router.parseUrl(this.router.url).queryParams['search'] || '';

    displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'website', 'company', 'actions'];
    dataSource = new MatTableDataSource<User>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private userListFacade: UserListFacadeService,
        private router: Router
    ) {
    }

    ngAfterViewInit(): void {
        this.userListFacade.loadUsers();
        this.users$.subscribe(users => {
            this.dataSource.data = users;
            if (this.value) {
                this.dataSource.filter = this.value.trim().toLowerCase();
            }
        });
    }

    removeSearchQuery(): void {
        this.router.navigate([]);
        this.dataSource.filter = '';
        this.value = '';
    }

    setSearchQuery(): void {
        if (this.value) {
            this.router.navigate([], { queryParams: { search: this.value } });
            this.dataSource.filter = this.value.trim().toLowerCase();
        }
        else {
            this.removeSearchQuery();
        }
    }
}
