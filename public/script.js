const savedText = {};

function deleteNote(id) {
    fetch(`/?id=${id}`, { method: 'DELETE' })
        .then(res => window.location = res.url);
}

function editNote(id, element) {
    const container = element.parentElement
        .parentElement;

    const noteText = container.querySelector('.note-text');
    noteText.contentEditable = true;

    savedText[id] = noteText.innerText;

    setTimeout(() => {
        noteText.focus();

        const range = document.createRange();
        const selection = window.getSelection()
        const childNode = noteText.childNodes[0]; //not valid if multiline
        range.setStart(childNode, childNode.length);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

    }, 0);

    container.querySelectorAll('.buttons>button')
        .forEach(button => button.classList.add('hidden'));
    container.querySelectorAll('.edit')
        .forEach(button => button.classList.remove('hidden'));

    console.log(id, noteText);
}

function saveEdit(id, element) {
    const container = element.parentElement
        .parentElement;

    const noteText = container.querySelector('.note-text');
    noteText.contentEditable = false;

    fetch('/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, note: noteText.innerText })
    });

    container.querySelectorAll('.buttons>button')
        .forEach(button => button.classList.add('hidden'));
    container.querySelectorAll('.standard')
        .forEach(button => button.classList.remove('hidden'));
}

function undoEdit(id, element) {
    const container = element.parentElement
        .parentElement;

    const noteText = container.querySelector('.note-text');
    noteText.contentEditable = false;

    noteText.innerText = savedText[id];
    delete savedText[id];

    container.querySelectorAll('.buttons>button')
        .forEach(button => button.classList.add('hidden'));
    container.querySelectorAll('.standard')
        .forEach(button => button.classList.remove('hidden'));
}