class NoteView {
    constructor() {
        this.root = document.querySelector('.notes');
    }

    update(data) {
        //console.log("update chamado")
        if (!data) this.root.innerHTML = "";
        this.root.innerHTML = (
            `${data.reduce((acc, cur) => {
                return acc += (
                    `<div class="note" data-event="false">
                        <div class="note-title">${cur.title}</div>
                        <div class="note-content"><p>${cur.content}</p></div>
                    </div>`
                )
            }, "")}`
        );
    }
}