class NoteView {
    constructor() {
        this.root = document.querySelector('.notes');
    }

    update(data) {
        this.root.innerHTML = (
            `${data.reduce((acc, cur) => {
                return acc += (
                    `<div class="note">
                        <div class="note-title">${cur.title}</div>
                        <div class="note-content">${cur.content}</div>
                    </div>`
                )
            }, "")}`
        );
    }
}