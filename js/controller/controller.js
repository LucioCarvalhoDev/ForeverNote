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
        let key = this.noteList._data[index]["_date"];
        console.log(key)
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

    editNote(id) {

      let key = this.noteList._data[id]['_date'];

      ConnectionFactory
        .getConnection()
        .then(connection => new NoteDao(connection))
        .then(dao => dao.editNote(0,0,key))
        .then(res => {
          console.log(res);
        })

        this.loadNotes();
    }

}

