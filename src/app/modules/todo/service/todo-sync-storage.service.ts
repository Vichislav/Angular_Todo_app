import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {TodoState} from '../store/todo/todo.reducer';
import {todoFeatureSelector} from '../store/todo/todo.selectors';
import {filter} from 'rxjs/operators';
import {TodoLoadStateAction} from '../store/todo/todo.actions';

/*ключ для LOCALSTORAGE что бы могли воспользоваться*/
/*методом localStorage.setItem(...)*/
export const TODO_LOCALSTORAGE_KEY = 'todo';

@Injectable({
  providedIn: 'root'
})
export class TodoSyncStorageService {
  /*переменная добавлена что бы init() сработал 1 раз*/
  /*приватная, что бы никто не смог ее поменять*/
  private isInit = false;

  constructor(private store$: Store<TodoState>) { }

  init() {
    /*проверка */
    if (this.isInit) {
      return;
    }

    this.isInit = true;
    this.loadFromStorage();

    /*подписываемся на состояние которое приходит в todoFeatureSelector*/
    this.store$.pipe(
      select(todoFeatureSelector),
      /*по идее фильтр осуществляет проверку, что state не undefined*/
      /*условие фильра: если state есть идем дальше*/
      filter(state => !!state)
    ).subscribe(state => {
      /*stringify - переводит в JSON строку*/
      /*все что нам приходит в state мы оборачиваем в JSON и помещаем в localStorage*/
      localStorage.setItem(TODO_LOCALSTORAGE_KEY, JSON.stringify(state));
    });

    /*всякий раз когда, происходит событие storage мы будем вызывать loadFromStorage() */
    window.addEventListener('storage', () => this.loadFromStorage());
  }

  private loadFromStorage() {
    /*присваиваем storageState данные из localStorage по ключу TODO_LOCALSTORAGE_KEY*/
    const storageState = localStorage.getItem(TODO_LOCALSTORAGE_KEY);
    /*проверка что storageState существует, что оно не пустое*/
    if (storageState) {
      /*если оно существует то мы передаем в Action узел state в котором будет */
      /*проперти state, которое будет целиком извлечено из storage*/
      this.store$.dispatch(new TodoLoadStateAction({
        state: JSON.parse(storageState)
      }));
    }
  }
}
