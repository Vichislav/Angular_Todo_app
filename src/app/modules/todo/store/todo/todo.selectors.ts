import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TODO_REDUCER_NODE, TodoState} from './todo.reducer';

/*createFeatureSelector - селектор который извлекает первый элемент объекта из хранилища
хранилище в данном случае это TODO_REDUCER_NODE*/
export const todoFeatureSelector = createFeatureSelector<TodoState>(TODO_REDUCER_NODE);

/*todoListSelector - будем использовать чтобы получить список объектов todo*/
export const todoListSelector = createSelector(
  todoFeatureSelector,
  state => state.todoList
);
