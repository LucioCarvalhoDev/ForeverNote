
const noteController = new NoteController();

(function () {

  const $ = document.querySelector.bind(document);
  const $id = document.getElementById.bind(document);

  const sectionModal = $('.modal');

  const addButton = $('.option-icon-add');  

  // Ativa a exibição do modal formulario para adição e edição de notas
  function modal(title, content, action) {

    sectionModal.innerHTML = (
      `
      <div class="overlay">
      <div class="form-note">
        <div class="title">
          <label for="form-note__title">Titulo</label>
          <input type="text" id="form-note__title">
        </div>
        <div class="content">
          <label for="form-note__content">Conteudo</label>
          <textarea type="text" id="form-note__content"></textarea>
        </div>
        <div class="submit">
          <button data-button>Salvar</button>
        </div>
      </div>
      </div>`)

      
      const inputTitle = $id('form-note__title');
      const inputContent = $id('form-note__content');
      
      inputTitle.value = title || '';
      inputContent.value = content || '';

      $('.submit button').onclick = e => {

        action(inputTitle.value, inputContent.value);

        sectionModal.innerHTML = '';
      }

      $('.overlay').onclick = e => {
        if (e.target.classList.contains('overlay')) sectionModal.innerHTML = '';
      }
  }


  addButton.addEventListener('click', event => {

    modal('','', (title, content) => {
      noteController.addNote(title, content);
    });
  })

  // Garante que todas as notas receberão o evento de click
  // Sem que aconteçam registros de evento repetidos
  let observer = new MutationObserver(function () {

    let untrackedNotes = document.querySelectorAll("[data-event='false']");
    let allNotes = Array.from(document.querySelectorAll(".note"));

    untrackedNotes.forEach(item => {

      item.addEventListener('click', event => {

        // Caso o evento de click tenha tido como target um filho de 'note'
        // Sobe na hierarquia até encontrar o elemento correto
        const target = event.target.classList.contains('note') ?
          event.target :
          event.target.parentElement.classList.contains('note') ?
            event.target.parentElement :
            event.target.parentElement.parentElement;

        const idx = allNotes.indexOf(target);
        const note = noteController.noteList.get(idx);

        modal(note['_title'], note['_content'], (title, content) => {
          noteController.editNote(title, content, idx);
        })

        
      })

      item.addEventListener('contextmenu', event => {
        event.preventDefault();

        const target = event.target.classList.contains('note') ?
          event.target :
          event.target.parentElement;


        noteController.deleteNote(allNotes.indexOf(target));
        return false;
      })

      item.dataset.event = true;
    })

  });

  observer.observe(document.querySelector('.notes'), { attributes: false, childList: true, subtree: false })

})()