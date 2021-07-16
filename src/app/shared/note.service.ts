import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {
  notes: Note[] = [];
  storageSub: Subscription;

  constructor() {
    this.loadSatate();
    this.storageSub = fromEvent(window, 'storage').subscribe(
      (event: StorageEvent) => {
        if (event.key === 'notes') this.loadSatate();
      }
    )
  }

  ngOnDestroy() {
    this.storageSub.unsubscribe();
  }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find(note => note.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    Object.assign(note, updatedFields);
    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex === -1) return;
    this.notes.splice(noteIndex, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadSatate() {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes'))
      if (!notesInStorage) return;

      this.notes.length = 0;
      this.notes.push(...notesInStorage);
    } catch (e) {
      console.log('there is an error');
      console.log(e)
    }
  }

}
