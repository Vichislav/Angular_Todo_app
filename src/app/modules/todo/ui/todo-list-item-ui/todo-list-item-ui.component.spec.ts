import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemUiComponent } from './todo-list-item-ui.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Todo} from '../../model/todo';
import { By } from '@angular/platform-browser';

describe('TodoListItemUiComponent', () => {
  let component: TodoListItemUiComponent;
  let fixture: ComponentFixture<TodoListItemUiComponent>;
  const todoExample: Todo = {
    id: 7,
    name: 'example',
    completed: false
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListItemUiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListItemUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  xit('пробуем прослушать вызывается ли метод удаления', () => {
    const exampleEvent = spyOn(component.delete, 'emit');
    component.todo = todoExample;
    component.onDelete();
    expect(exampleEvent).toHaveBeenCalled();
  });
  xit('компонент должен отправлять событие по кликун на кнопку в шаблоне', () => {
    const btnEvent = spyOn(component.delete, 'emit');
    const btn = fixture.debugElement.query(By.css('.ui__wrap__btn_item-2'));
    btnEvent.calls.reset();
    btn.nativeElement.click();
    expect(btnEvent).toHaveBeenCalled();
  });
});

