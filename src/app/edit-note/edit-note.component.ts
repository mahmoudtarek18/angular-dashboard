import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NoteService } from './../shared/note.service';
import { Note } from './../shared/note.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  note: Note;
  constructor(private route: ActivatedRoute,
    private noteServerice: NoteService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.note = this.noteServerice.getNote(id);
    })
  }

  onFormSubmit(form: NgForm) {
    this.noteServerice.updateNote(this.note.id, form.value)
    this.router.navigateByUrl('/notes');
    this.notificationService.show('Note Updated!');
  }

  DeleteNote() {
    this.noteServerice.deleteNote(this.note.id);
    this.router.navigateByUrl('/notes');
    this.notificationService.show('Note Deleted!');
  }

}
