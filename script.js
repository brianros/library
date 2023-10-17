const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderLibrary();
}

function renderLibrary() {
  const libraryTable = document.querySelector('table');
  const tableBody = libraryTable.querySelector('tbody');

  // Clear the table body
  tableBody.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;

    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;

    const pagesCell = document.createElement('td');
    pagesCell.textContent = book.pages;

    const readCell = document.createElement('td');
    readCell.textContent = book.isRead ? 'Yes' : 'No';

    const actionsCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeBook(index);
      renderLibrary();
    });

    const toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = 'Toggle Read';
    toggleReadButton.addEventListener('click', () => {
      toggleReadStatus(index);
      renderLibrary();
    });

    actionsCell.appendChild(removeButton);
    actionsCell.appendChild(toggleReadButton);

    // Append cells to the row
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(readCell);
    row.appendChild(actionsCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  renderLibrary();
}

function toggleReadStatus(index) {
  myLibrary[index].isRead = !myLibrary[index].isRead;
  renderLibrary();
}

document.getElementById('new-book').addEventListener('click', () => {
  document.getElementById('book-form').style.display = 'block';
});

document.getElementById('new-book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('is-read').checked;

  const newBook = new Book(title, author, pages, isRead);
  addBookToLibrary(newBook);

  document.getElementById('book-form').style.display = 'none';
});

// Initial rendering of the library
renderLibrary();
