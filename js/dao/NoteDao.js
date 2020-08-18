class NoteDao {
    constructor(connection) {
        this.connection = connection;
    }

    addNote(note) {

        // let objectStore = this.connection.transaction(['notes'], 'readwrite').objectStore('notes');

        // let request = objectStore.add(note);

        // request.onsuccess = event => {
        //     console.log("nota adiciona com sucesso");
        // }

        return new Promise((resolve, reject) => {

            resolve(this.connection);
        })
        
    }

    getNotes() {
        
        // let objectStore = this.connection.transaction(['notes'], 'readonly').objectStore('notes');

        // let noteList = [];

        // objectStore.openCursor().onsuccess = function(event) {

        //     let cursor = event.target.result;

        //     if (cursor) {
        //         noteList.push(new Note(cursor.value["_title"], cursor.value["_content"]))
        //         cursor.continue();
        //     } 
        // }

        // return noteList;
    }
}