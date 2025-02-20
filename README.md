# paperid-ngrx

## How to run

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Angular Best Practices - Demo App

This app demonstrates coding techniques and best practices for large scale web apps.

### Versions used for this app

* Angular 19
* NgRx 19
* RxJS 7
* Tailwind CSS 3
* Angular Material 19

##### Get Users and Posts from JSONPlaceholder

Use the mock API here:

https://jsonplaceholder.typicode.com/

Users data source:

https://jsonplaceholder.typicode.com/users

##### Initial view - Users

Show a table of all users. User name is enough.

When the user clicks a row, navigate to the next view, where you will see the posts for the selected user.
