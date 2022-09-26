import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from '../../model/todo';

@Component({
  selector: 'app-todo-list-ui',
  templateUrl: './todo-list-ui.component.html',
  styleUrls: ['./todo-list-ui.component.css']
})
export class TodoListUiComponent implements OnInit {
  /*если id нашего todo в массиве editIds значит мы будем*/
  /* отрисовывать его в состоянии редактирования которое */
  /* не улетает в хранилище а хранится только в этом компоненте*/
  editIds: number[] = [];

  @Input()
  todoList: Todo[] = [];

  @Output()
  delete = new EventEmitter<number>();

  @Output()
  toggle = new EventEmitter<number>();

  @Output()
  edit = new EventEmitter<{ id: number, name: string }>();

  constructor() { }

  ngOnInit() {
  }

  onEditMode(id: number) {
    /*закидываем в массив editIds id нашего объекта*/
    this.editIds.push(id);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onToggle(id: number) {
    this.toggle.emit(id);
  }
  /*если сработал onEdit значит редактирование случилось значит нам*/
  /*нужно убрать этот компонент из списка (массива editIds) тех кто отрисовывается*/
  /*как нуждающиеся в редактировании*/
  onEdit(name: string, id: number) {
    /*массив равен себе отфильрованному, условия фильтрования:*/
    /*все item (элементы массива) не равные текущему id остаются в массиве */
    this.editIds = this.editIds.filter(item => item !== id);
    this.edit.emit({ id, name });
  }

}
