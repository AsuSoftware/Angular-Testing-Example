
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class TodoService {
  constructor(private http: HttpClient) {
  }

  add(todo) {
    return this.http.post('...', todo);
  }

  getTodos() {
    return this.http.get('...');
  }

  delete(id) {
    return this.http.delete('...');
  }
}
