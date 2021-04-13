import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo.service';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { from, Observable } from 'rxjs';

import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ TodosComponent ],
      providers: [ TodoService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    // Lo commentiamo perchè non fa in tempo a gestire le modifiche che facciamo
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos from the server', fakeAsync(() => {
    // otteniamo la dipendenza
    let service = TestBed.get(TodoService); // in questo modo otteniamo la dipanedenza a livello di modulo e non si componente
    // Per ottenere la dipendenza a livello del componente scriviamo:
    // fixture.debugElement.injector.get(TodoService);
    spyOn(service, 'getTodoPromise').and.returnValue(Promise.resolve([1, 2, 3]));
    fixture.detectChanges();
    tick(); // simula il passagio del tempo
    expect(component.todos.length).toBe(3);
  }));
});
