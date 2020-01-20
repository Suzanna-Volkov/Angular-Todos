import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from '../models/todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      { id: 11, title: 'Walk the Dog', status: 'Todo' },
      { id: 12, title: 'Do the Dishes', status: 'Todo' },
      { id: 13, title: 'Take Out the Trash', status: 'Todo' },
      { id: 14, title: 'Steal a Car', status: 'Todo' }
    ];
    return { todos };
  }

  // Overrides the genId method to ensure that a todo always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 11;
  }
}
