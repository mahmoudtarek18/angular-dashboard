import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TodosService } from './../shared/todos.service';
import { Todo } from './../shared/todo.model';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {
  todo: Todo;
  showErrorMessage: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todosService: TodosService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const todoId = paramMap.get('id');
      this.todo = this.todosService.getTodo(todoId);
    })


  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return;
    this.todosService.updateTodo(this.todo.id, form.value);
    this.router.navigateByUrl('/todos');
    this.notificationService.show('Todo Updated!');
  }

}
