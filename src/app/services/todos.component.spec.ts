import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty'
import 'rxjs/add/observable/throw';
import { Observable, from, empty } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    let todos = [1, 2, 3];
    spyOn(service, 'getTodos').and.callFake(() => { // callFake cambia l'implementazione di quel metodo getTodos
      return from([todos]);
    });
    component.ngOnInit();
    expect(component.todos).toBe(todos);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake(t => {
      return empty();
    });
    component.add();
    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo retured from the server', () => {
    let todo = { id: 1 };
    // returnValue è un metodo più pulito rispetto a callFake()
    let spy = spyOn(service, 'add').and.returnValue(from([todo]));
    component.add();
    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property if server returns an error when adding new todo', () => {
    let error = 'error from the server';
    let spy = spyOn(service, 'add').and.returnValue(Observable.throw(error));
    component.add();
    expect(component.message).toBe(error);
  });

  it('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(empty());
    component.delete(1);
    expect(spy).toHaveBeenCalledWith(1); // vediamo se questo metodo è stato chiamato con il parametro 1
  });

  it('should NOT call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(empty());
    component.delete(1);
    expect(spy).not.toHaveBeenCalled(); // verifichiamo che questo metodo non sia stato chiamato
  });

});
