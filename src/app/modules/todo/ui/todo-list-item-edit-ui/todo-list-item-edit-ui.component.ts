import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../../model/todo';

@Component({
  selector: 'app-todo-list-item-edit-ui',
  templateUrl: './todo-list-item-edit-ui.component.html',
  styleUrls: ['./todo-list-item-edit-ui.component.css']
})
export class TodoListItemEditUiComponent implements OnInit {
  name = '';
  /*принемаем на вход в компонент и используем это в нем*/
  @Input()
  todo: Todo;
  /*что-то там по делали и на выход из компонента выдаем это*/
  /*возвращаемый тип данных string потому, что редактируем мы только поле name*/
  @Output()
  edit = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    /*момент когда все импуты уже доступны мы присваеваем нашему полю name*/
    /*значение из обьекта полученного на вход в компнент*/
    this.name = this.todo.name;
  }

  onEdit() {
    /*если this.name существует*/
    if (this.name) {
      /*передаем это name в edit - выкидываем наверх из компонента*/
      this.edit.emit(this.name);
    }
  }

  onCancel() {
    /*здесь мы не хотим каких то изменений поэтому приравниваем все обратно*/
    this.name = this.todo.name;
  }

}
