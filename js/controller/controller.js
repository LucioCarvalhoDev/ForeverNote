class NoteController {
    constructor() {
        this.noteList = new NoteList();
        this.noteView = new NoteView();

    }

    addNote(note) {
        this.noteList.add(note);

        ConnectionFactory
            .getConnection()
            .then(connection => new NoteDao(connection))
            .then(dao => dao.addNote())
            .then(response => response)
        
        this.noteView.update(this.noteList._data);
    }

    removeNote(note) {
        
        this.noteList.exclude(note);

        this.noteView.update(this.noteList._data);
    }

    loadNotes() {

        ConnectionFactory
            .getConnection()
            .then(connection => new NoteDao(connection))
            .then(dao => console.log(dao))
    }

}

