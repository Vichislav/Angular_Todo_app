import {Todo} from '../../model/todo';
import {TodoActions, todoActionsType} from './todo.actions';

export const TODO_REDUCER_NODE = 'todo';

export interface TodoState {
  idIncrement: number;
  todoList: Todo[];
}

/*создаем изначальное состояние и отправляем в const todoReducer = ( state ...*/
const initialState: TodoState = {
  idIncrement: 1,
  todoList: []
};

export const todoReducer = (state = initialState, action: TodoActions) => {
  /*делаем проверку type*/
  switch (action.type) {
    /*в случае если type 'равен' create*/
    case todoActionsType.create:
      return {
        /*мы должны вернуть новый state скопированный из оригинального*/
        ...state,
        idIncrement: state.idIncrement + 1,
        /*создаем объект тодо*/
        todoList: [
          ...state.todoList, /*копируем старый массив, кладем его в новый и добавалем туда новый элемент*/
          {
            id: state.idIncrement, /*поля нового элемента*/
            name: action.payload.name,
            completed: false
          }
        ]
      };
    case todoActionsType.toggle:
      return {
        /*копируем старый массив*/
        ...state,
        /*модифицируем имеющийся стейт(массив)*/
        /*говорим что todoList теперь равен тому что пришло из стейта state.todoList */
        /*изменяем то что пришло при помощи map(принемаем todo => если todo.id равно id из экшна то)*/
        todoList: state.todoList.map(todo => todo.id === action.payload.id ? {
          /*возваращем копию todo*/
          ...todo,
          /*но его поле completed теперь равно !todo.completed, т.е. переключаем*/
          completed: !todo.completed
          /*иначе (id не совпали) оставляем todo без изменений*/
        } : todo)
      };
    case todoActionsType.edit:
      return {
        ...state,
        /*изменяем то что пришло при помощи map(принемаем todo => если todo.id равно id из экшна то)*/
        todoList: state.todoList.map(todo => todo.id === action.payload.id ? {
          /*возваращем копию todo*/
          ...todo,
          /*но его поле name теперь ранвно значению name пришедшего из экшена*/
          name: action.payload.name
          /*иначе (id не совпали) оставляем todo без изменений*/
        } : todo)
      };
    case todoActionsType.delete:
      return {
        /*копируем старый массив*/
        ...state,
        /*фильтруем массив, удаляя лишнее*/
        /*передаем todo => если todo.id не равно тому id которое пришло в экшнен то мы его оставляем*/
        todoList: state.todoList.filter(todo => todo.id !== action.payload.id),
      };
    case todoActionsType.load:
      return {
        /*копия объекта state из payload*/
        /*мы закешировали весь state  и его извлекаем*/
        ...action.payload.state
      };
    default:
      return state;
  }
};
