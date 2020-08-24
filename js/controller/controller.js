class NoteController {
    constructor() {
        this.noteList = Bind.create(new NoteList(), new NoteView());
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
    }

    loadNotes() {
        ConnectionFactory
            .getConnection()
            .then(connection => new NoteDao(connection))
            .then(dao => dao.getNotes())
            .then(list => {
                this.noteList._reset();
                list.forEach(note => {
                    this.noteList.add(note);
                })                
            })
    }

    deleteNote(index) {
        let key = this.noteList._data[index]["_title"];
        
        ConnectionFactory
            .getConnection()
            .then(connection => new NoteDao(connection))
            .then(dao => dao.deleteNote(key))
            .then(message => {
                
                console.log(message)
            })
            .catch(message => {
                console.error(message)
            })
        
        this.loadNotes();
    }

    viewNoteList() {
        return [].concat(this.noteList._data);
    }

}

