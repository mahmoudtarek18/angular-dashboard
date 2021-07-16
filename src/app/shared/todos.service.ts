import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService implements OnDestroy {
  todos: Todo[] = [];
  storageSub: Subscription;

  constructor() {
    this.loadSatate();
    this.storageSub = fromEvent(window, 'storage').subscribe(
      (event: StorageEvent) => {
        if (event.key === 'todos') this.loadSatate();
      }
    )

  }

  ngOnDestroy() {
    this.storageSub.unsubscribe();
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find(todo => todo.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveState();
  }

  updateTodo(id: string, updateTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id);
    Object.assign(todo, updateTodoFields);
    this.saveState();
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index == -1) return;

    this.todos.splice(index, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadSatate() {
    try {
      const todosInStorage = JSON.parse(localStorage.getItem('todos'))
      if (!todosInStorage) return;

      this.todos.length = 0;
      this.todos.push(...todosInStorage);
    } catch (e) {
      console.log('there is an error');
      console.log(e)
    }
  }
}
