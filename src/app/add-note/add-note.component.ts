import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { Note } from './../shared/note.model';
import { NoteService } from './../shared/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  showErrorMessage: boolean = false;
  constructor(private noteService: NoteService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return this.showErrorMessage = true;
    const note = new Note(form.value.title, form.value.content);
    this.noteService.addNote(note);
    this.router.navigateByUrl('/notes');
    this.notificationService.show('Created Note!');
  }

}
