const addBookButton = document.querySelector('.addBook');
const library = document.querySelector('.library');
const submitFormButton = document.querySelector('.submitFormButton');
const newBookForm = document.querySelector('#newBookForm');

const myLibrary = [];

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  console.log(
    `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? 'has been read' : 'not read yet'
    }`
  );
};

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

const showForm = function () {
  newBookForm.style.display = 'grid';
};

const addBookToPage = (book, index) => {
  const divEle = document.createElement('div');
  const titleP = document.createElement('p');
  const authorP = document.createElement('p');
  const pagesP = document.createElement('p');
  const readP = document.createElement('p');
  const buttonDiv = document.createElement('div');
  const toggleButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  divEle.className = 'card';
  divEle.dataset.id = index;
  titleP.textContent = book.title;
  authorP.textContent = book.author;
  pagesP.textContent = book.pages;
  readP.textContent = book.read ? 'Read?: ✅' : 'Read?: ❌';
  readP.className = 'readStatus';

  buttonDiv.className = 'buttonContainer';
  buttonDiv.style.display = 'grid';

  toggleButton.textContent = 'Toggle';
  toggleButton.className = 'toggle';
  deleteButton.textContent = 'Delete 🗑️';
  deleteButton.className = 'delete';

  library.prepend(divEle);
  divEle.append(titleP, authorP, pagesP, readP, toggleButton, buttonDiv);
  buttonDiv.append(toggleButton, deleteButton);
};

const parseForm = () =>
  new Book(
    document.querySelector('#title').value,
    document.querySelector('#author').value,
    document.querySelector('#pages').value
  );

const clearEle = (selector) => {
  document.querySelector(selector).value = '';
};

const clearForm = () => {
  clearEle('#title');
  clearEle('#author');
  clearEle('#pages');
};

const init = () => {
  // Create some default books
  const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
  const theLOTR = new Book(
    'The Colour of Magic',
    'Terry Pratchett',
    321,
    false
  );
  addBookToLibrary(theHobbit);
  addBookToLibrary(theLOTR);
  myLibrary.forEach((book, index) => addBookToPage(book, index));
};
init();

// addBookButton.addEventListener('click', showForm);

submitFormButton.addEventListener('click', (e) => {
  // Stop page reloading
  e.preventDefault();
  const book = parseForm();
  addBookToLibrary(book);
  addBookToPage(book, myLibrary.length - 1);
  setTimeout(() => {
    newBookForm.style.display = 'none';
    clearForm();
  }, 2000);
});

library.addEventListener('click', (e) => {
  e.preventDefault();
  const btn = e.target.closest('button');

  if (!btn) return;

  if (btn.classList.contains('addBook')) showForm();

  if (btn.classList.contains('delete')) {
    // work out which book it is (read id)
    const bookId = btn.closest('[data-id]').dataset.id;
    // Find and remove card
    const cardToDelete = btn.closest('.card');
    cardToDelete.remove();
    // delete from library - imperfect as after a deletion the ids don't match
    removeBookFromLibrary(bookId);
  }

  if (btn.classList.contains('toggle')) {
    // work out which book it is (read id)
    const bookId = btn.closest('[data-id]').dataset.id;
    // swap read status in library
    myLibrary.at(bookId).toggleRead();
    // re-draw it / all?
    const readStatusEle = btn.closest('.card').querySelector('.readStatus');

    readStatusEle.textContent =
      readStatusEle.textContent === 'Read?: ❌' ? 'Read?: ✅' : 'Read?: ❌';
  }

  console.log(myLibrary);
});
