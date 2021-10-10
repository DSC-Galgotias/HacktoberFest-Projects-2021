const ADD = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    notes.forEach(note => {
        addNewNote(note)
    })
}

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            </div>

            <div class="main ${text ? '' : 'hidden'}"></div>
            <textarea class="${text ? 'hidden' : ''}" cols="10" rows="15"></textarea>

        </div>
    `;

    const EDIT = note.querySelector('.edit')
    const DELETE = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text;
    main.innerHTML = marked(text)

    EDIT.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    DELETE.addEventListener('click' , () => {
        note.remove();
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);

        updateLS();
    })

    document.body.appendChild(note);
}


ADD.addEventListener('click' , () => {
    addNewNote();
})

function updateLS () {
    const allNotes = document.querySelectorAll('textarea');
    const notes = [];

    allNotes.forEach((note) => {
        notes.push(note.value)
    })

    localStorage.setItem('notes' , JSON.stringify(notes));
}