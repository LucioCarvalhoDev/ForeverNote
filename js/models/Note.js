class Note {
    constructor(title, content) {
        this._title = title || "generic title";
        this._content = content || "generic content";
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