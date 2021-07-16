import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodosService } from './../shared/todos.service';
import { Todo } from './../shared/todo.model';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  showErrorMessage: boolean;
  constructor(private todoService: TodosService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return this.showErrorMessage = true;
    }
    const todo = new Todo(form.value.text)
    this.todoService.addTodo(todo);
    this.router.navigateByUrl('/todos');
    this.notificationService.show('Todo Created!');
  }

}
