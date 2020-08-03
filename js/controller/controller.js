class NoteController {
    constructor() {
        this.noteList = new NoteList();
        this.noteView = new NoteView();
    }

    addNote(note) {
        this.noteList.add(note);
        
        this.noteView.update(this.noteList._data);
    }
}
