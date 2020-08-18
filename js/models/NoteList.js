class NoteList {
    constructor() {
        this._data = [];
    }

    add(note) {
         
        this._data.push(note)
    }

    exclude(note) {
        this._data.splice(this._data.indexOf(note), 1);
    }
}