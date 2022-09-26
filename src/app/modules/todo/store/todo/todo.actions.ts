import {Action} from '@ngrx/store';
import {TodoState} from './todo.reducer';

/*для того что бы хранить все типы изолировано*/
export enum todoActionsType {
  create = '[TODO] create todo item',
  toggle = '[TODO] toggle todo item',
  edit = '[TODO] edit todo item',
  delete = '[TODO] delete todo item',
  load = '[TODO] load todo state',
}

export class TodoCreateAction implements Action {
  readonly type = todoActionsType.create;
  /*что бы создать тодо объект нам нужно его имя
   генерация id отдана на откуп в reducer*/
  constructor(public payload: { name: string }) {
  }
}

export class TodoDeleteAction implements Action {
  readonly type = todoActionsType.delete;
  constructor(public payload: { id: number }) {
  }
}

export class TodoToggleAction implements Action {
  readonly type = todoActionsType.toggle;
  constructor(public payload: { id: number }) {
  }
}

export class TodoEditAction implements Action {
  readonly type = todoActionsType.edit;
  constructor(public payload: { id: number, name: string }) {
  }
}

export class TodoLoadStateAction implements Action {
  readonly type = todoActionsType.load;
  constructor(public payload: { state: TodoState }) {
  }
}

/*экспортируем затем добавляем в export const todoReducer =( ... action...)
в файле todo.reducer.ts*/
export type TodoActions = TodoCreateAction | TodoDeleteAction | TodoToggleAction | TodoEditAction | TodoLoadStateAction;
