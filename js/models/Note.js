class Note {
    constructor(title, content) {
        this._title = title;
        this._content = content;
    }

    get title() {
        return this._title;
    }

    set title(newTitle) {
        this._title = newTitle;
    }

    get content() {
        return this._content;
    }

    isEquals(note2) {
        return JSON.stringify(this) == JSON.stringify(note2);
    }
}