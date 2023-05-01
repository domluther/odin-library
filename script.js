const addBookButton = document.querySelector('.addBook');
const library = document.querySelector('.library');

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

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const theLOTR = new Book('The LotR', 'J.R.R. Tolkien', 1200, false);
const teacherHandbook = new Book(
  "The Lazy Teacher's Handbook",
  'Jim Smith',
  256,
  true
);

const showForm = function () {
  document.querySelector('.newBookForm').style.display = 'grid';
};

addBookButton.addEventListener('click', showForm);

const addBookToPage = (book) => {
  const divEle = document.createElement('div');
  divEle.className = 'card';
  library.prepend(divEle);
  const titleP = document.createElement('p');
  titleP.textContent = book.title;
  divEle.appendChild(titleP);
  const authorP = document.createElement('p');
  authorP.textContent = book.author;
  divEle.appendChild(authorP);
  const pagesP = document.createElement('p');
  pagesP.textContent = book.pages;
  divEle.appendChild(pagesP);
};

const init = () => {
  addBookToLibrary(theHobbit);
  addBookToLibrary(theLOTR);
  addBookToLibrary(teacherHandbook);
  myLibrary.forEach((book) => addBookToPage(book));
};
init();
