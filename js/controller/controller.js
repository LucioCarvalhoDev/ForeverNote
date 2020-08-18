class NoteController {
    constructor() {
        this.noteList = new NoteList();
        this.noteView = new NoteView();

        this.noteDao = new NoteDao();
    }

    addNote(note) {
        this.noteList.add(note);

        this.noteDao.addNote(note);
        
        this.noteView.update(this.noteList._data);
    }

    removeNote(note) {
        
        this.noteList.exclude(note);

        this.noteView.update(this.noteList._data);
    }

    loadNotes() {
        var list = this.noteDao.getNotes();
        return list;
    }

}

