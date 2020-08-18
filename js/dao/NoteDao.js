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

                        allNotes.push(new Note(actual['_title'], actual['_content']));

                        cursor.continue();
                    } else {

                        resolve(allNotes)
                    }
                }
        }) 
    }
}