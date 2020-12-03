class NoteController {
  constructor() {
    this.noteList = Bind.create(new NoteList(), new NoteView());
    this.loadNotes()
      .then(res => {
        if (res.length === 0) {
          this.addNote(
            "Bem vindo!",
            "Você pode adicionar uma anotação clicando no botão \"+\", apagar clicando nela com o lado direito do mouse e para editar é apenas clicar com o esquerdo. Espero que goste :)");
        }
      });
  }

  init() {
    this.loadNotes();
  }

  addNote(title, content) {

    const note = new Note(title, content);
    console.log(note)

    this.noteList.add(note);

    ConnectionFactory
      .getConnection()
      .then(connection => new NoteDao(connection))
      .then(dao => dao.addNote(note))
      .then(message => console.log(message))
      .catch(message => console.log(message));
  }

  loadNotes() {
    return new Promise((resolve, reject) => {
      ConnectionFactory
        .getConnection()
        .then(connection => new NoteDao(connection))
        .then(dao => dao.getNotes())
        .then(list => {
          this.noteList._reset();
          list.forEach(note => {
            this.noteList.add(note);
          })
          resolve(list);
        })
    })
  }

  deleteNote(index) {
    let key = this.noteList._data[index]["_date"];
    //console.log(key)
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

  editNote(newTitle, newContent, id) {

    let key = this.noteList._data[id]['_date'];

    ConnectionFactory
      .getConnection()
      .then(connection => new NoteDao(connection))
      .then(dao => dao.editNote(newTitle, newContent, key))
      .then(res => {
        console.log(res);
      })

    this.loadNotes();
  }

}

