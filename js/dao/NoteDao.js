class NoteDao {
  constructor(connection) {
    this.connection = connection;
  }

  addNote(note) {

    return new Promise((resolve, reject) => {

      let transaction = this.connection.transaction(['notes'], 'readwrite');

      transaction.objectStore('notes').add(note);

      transaction.oncomplete = event => {

        resolve('nota adicionada ao banco de dados');
      }

      transaction.onerror = event => {

        reject('erro ao adicionar nota no banco de dados');
      }
    })
  }

  getNotes() {

    return new Promise((resolve, reject) => {

      let allNotes = [];

      this.connection
        .transaction(['notes'], 'readonly')
        .objectStore('notes')
        .openCursor()
        .onsuccess = event => {

          let cursor = event.target.result;

          if (cursor) {

            let actual = cursor.value;

            allNotes.push(
              new Note(actual['_title'], actual['_content'], actual['_date'])
            );

            cursor.continue();
          } else {

            resolve(allNotes)
          }
        }
    })
  }

  deleteNote(key) {

    //console.log("NoteDao.deleteNote chamado")

    return new Promise((resolve, reject) => {

      let request = this.connection
        .transaction(['notes'], 'readwrite')
        .objectStore('notes')
        .delete(key);

      request.onsuccess = event => {
        resolve("Sucesso ao remover nota em NoteDao")
      }

      request.onerror = event => {
        reject("Falha ao remover nota em NoteDao");
      }

    })
  }

  editNote(newTitle, newContent, key) {

    return new Promise((resolve, reject) => {

      let request = this.connection
        .transaction(['notes'], 'readwrite')
        .objectStore('notes')
        .openCursor();

      request.onsuccess = e => {

        let cursor = event.target.result;

        if (cursor) {

          if (cursor.key == key) {

            let actual = cursor.value;
  
            actual['_title'] = newTitle;
            actual['_content'] = newContent;
  
            cursor.update(actual);
          }

          cursor.continue();

        }
      }
    })
  }
}