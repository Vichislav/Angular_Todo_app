import {TodoPageComponent} from './page/todo-page/todo-page.component';
import {Route} from '@angular/router';

export const todoRoutes: Route[] = [
  {
    path: '',
    component: TodoPageComponent
  }
];
