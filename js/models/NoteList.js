class NoteList {
    constructor() {
        this._data = [];
    }

    add(note) {
        this._data.push(note);
    }

    exclude(note) {
        this._data.splice(this._data.indexOf(note), 1);
    }

    _reset() {
        this._data = [];
    }

    get(id) {
        return this._data[id];
    }

    find(title) {
        return this._data.findIndex(note => {
            return note['_title'] == title;
        })
    }
}