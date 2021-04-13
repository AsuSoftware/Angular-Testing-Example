import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { EMPTY } from 'rxjs';
import { TodosComponent } from '../todos/todos.component';
import { VoterComponent } from '../voter/voter.component';

import { UserDetailsComponent } from './user-details.component';

class RouterStub {
  navigate(params) { }
}

class ActivatedRouteStub {
  private subject = new Subject();
  push(value) {
    this.subject.next(value);
  }
  get params() {
    return this.subject.asObservable(); // lo esponiamo come un observable al di fuori
  }
}

const routes = [
  { path: 'home', component: TodosComponent },
  { path: 'voter', component: VoterComponent },
  { path: 'users', component: UserDetailsComponent }
];

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      providers: [
        {
          provide: Router, useClass: RouterStub
        },
        { // Abbiamo indicato ad Angular di cambiare ActivatedRoute con ActivatedRouteStub
          provide: ActivatedRoute, useClass: ActivatedRouteStub
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect the user to the users page after saving', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    component.save();
    expect(spy).toHaveBeenCalledWith(['users']);
  });

  it('should contain a route for /users', () => {
    expect(routes).toContain({ path: 'users', component: UserDetailsComponent });
  });

  it('should navigate the user to the not found page when an invalid user id is passed', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({ id: 0 });
    expect(spy).toHaveBeenCalledWith(['not-found']);
  });
});
