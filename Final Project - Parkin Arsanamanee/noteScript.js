document.getElementById('addNote').addEventListener('click', function() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();
    
    if (noteText) {
        addNoteToList(noteText);
        noteInput.value = ''; // Clear the input field
    } else {
        alert("Please enter a note.");
    }
});

function addNoteToList(note) {
    const notesList = document.getElementById('notesList');
    
    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');
    noteItem.textContent = note;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        notesList.removeChild(noteItem); // Remove the note when clicked
    };
    
    noteItem.appendChild(deleteButton);
    notesList.appendChild(noteItem);
}