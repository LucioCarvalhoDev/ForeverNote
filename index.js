
const noteController = new NoteController();

(function () {

  const $ = document.querySelector.bind(document);

  const inputTitle = $('#form-note__title');
  const inputContent = $('#form-note__content');

  const addButton = $('.option-icon-add');
  const trashButton = $('.option-icon-trash');

  const submitButton = $('.submit button');

  const modalSection = $('[data-active]');
  const overlay = $('.overlay');

  function closeModal() { modalSection.style.display = "none" }
  function openModal() { modalSection.style.display = "block" }
  function clearModal() {
    inputTitle.value = "";
    inputContent.value = "";
  }

  addButton.addEventListener('click', event => {

    openModal();
  })

  overlay.addEventListener('click', event => {

    if (event.target == overlay) {

      clearModal();
      closeModal();
    }
  })

  submitButton.addEventListener('click', event => {

    noteController.addNote(new Note(inputTitle.value, inputContent.value))

    inputTitle.value = "";
    inputTitle.content = "";

    clearModal();
    closeModal();
  })

  let observer = new MutationObserver(function () {

    let untrackedNotes = document.querySelectorAll("[data-event='false']");
    let allNotes = Array.from(document.querySelectorAll(".note"));

    untrackedNotes.forEach(item => {

      item.addEventListener('click', event => {

        const target = event.target.classList.contains('note') ?
          event.target :
          event.target.parentElement;        

        noteController.editNote(allNotes.indexOf(target));
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