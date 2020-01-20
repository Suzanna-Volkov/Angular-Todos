import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl = 'api/todos';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // GET: retrieve todos from the server
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(catchError(err => of([])));
  }

  // POST: add a new todo to the server
  addTodo(todo: Todo): Observable<Todo> {
    todo.status = 'Todo';
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions)
      .pipe(catchError(err => of(todo)));
  }

  // DELETE: remove a todo from the server
  deleteTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.todosUrl}/${id}`;

    return this.http.delete<Todo>(url, this.httpOptions);
  }
}
