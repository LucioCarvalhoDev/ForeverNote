class NoteController {
    constructor() {
        this.noteList = new NoteList();
        this.noteView = new NoteView();
        this.loadNotes();
    }

    addNote(note) {

        this.noteList.add(note);

        ConnectionFactory
            .getConnection()
            .then(connection => new NoteDao(connection))
            .then(dao => dao.addNote(note))
            .then(message => console.log(message))
            .catch(message => console.log(message));
        
        this.noteView.update(this.noteList._data);
    }

    loadNotes() {

        ConnectionFactory
            .getConnection()
            .then(connection => new NoteDao(connection))
            .then(dao => dao.getNotes())
            .then(list => {
                list.forEach(note => {
                    this.noteList.add(note);
                    this.noteView.update(this.noteList._data);
                })
            })        
    }

    viewNoteList() {
        return [].concat(this.noteList._data);
    }

}

