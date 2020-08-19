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
        //console.warn("noteController.loadNotes chamado")

        ConnectionFactory
            .getConnection()
            .then(connection => new NoteDao(connection))
            .then(dao => dao.getNotes())
            .then(list => {
                this.noteList._data = [];
                list.forEach(note => {
                    this.noteList.add(note);
                })
                this.noteView.update(this.noteList._data);
            })
    }

    deleteNote(index) {
        //console.log("noteController.deleteNote chamado")
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

