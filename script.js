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

addBookToLibrary(theHobbit);
addBookToLibrary(theLOTR);
addBookToLibrary(teacherHandbook);
