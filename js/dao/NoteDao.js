class NoteDao {
    constructor() {
        this.connection;
        this._init();
    }

    _init() {

        let request = window.indexedDB.open('notes_db', 1);

        request.onupgradeneeded = event => {

            if (!request.result.objectStoreNames.contains("notes")) {
                request
                    .result
                    .createObjectStore('notes', { autoIncrement: true });
            }
        }

        request.onsuccess = event => {

            this.connection = request.result;
        }

    }

    addNote(note) {

        let objectStore = this.connection.transaction(['notes'], 'readwrite').objectStore('notes');

        let request = objectStore.add(note);

        request.onsuccess = event => {
            console.log("nota adiciona com sucesso");
        }
        
    }

    getNotes() {
        
        let objectStore = this.connection.transaction(['notes'], 'readonly').objectStore('notes');

        let noteList = [];

        objectStore.openCursor().onsuccess = function(event) {

            let cursor = event.target.result;

            if (cursor) {
                noteList = noteList.concat(new Note(cursor.value["_title"], cursor.value["_content"]))
                cursor.continue();
            } 
        }

        return noteList;
    }
}