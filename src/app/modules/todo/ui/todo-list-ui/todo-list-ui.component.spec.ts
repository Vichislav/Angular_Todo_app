import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListUiComponent } from './todo-list-ui.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('TodoListUiComponent', () => {
  let component: TodoListUiComponent;
  let fixture: ComponentFixture<TodoListUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListUiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('проверка метода onToggle на вызов', () => {
    const event = spyOn(component, 'onToggle');
    component.onToggle(2);
    expect(event).toHaveBeenCalled();
  });
  it('проверка метода onEditMode на вызов', () => {
    const event =  spyOn(component, 'onEditMode');
    component.onEditMode(2);
    expect(event).toHaveBeenCalled();
  });
  it('проверка метода onDelete на вызов', () => {
    const event =  spyOn(component, 'onDelete');
    component.onDelete(2);
    expect(event).toHaveBeenCalled();
  });
  it('метод onEdit убирать поступившее к нему id из массива', () => {
    component.editIds = [1, 2, 3];
    component.onEdit('пробуем', 3);
    expect(component.editIds).toEqual([1, 2]);
  });
  xit('метод onEdit должен вызывать отрисовку тега app-todo-list-item-ui', () => {
    const element = fixture.debugElement.nativeElement('app-todo-list-item-ui');
    component.editIds = [1, 2, 3];
    component.onEdit('пробуем', 3);
    expect(element).toBeTruthy();
  });
});

