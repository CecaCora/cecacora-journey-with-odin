// library state
let myLibrary = [
  {
    title: 'Welcome to Witchary! \n \n Use the button above to start adding grimoires!',
    author: 'Ceca Cora',
    pages: 1,
    readStatus: 'completed',
  },
  {
    title: 'Side navigation and filters are still being developed! 😳',
    author: 'Ceca Cora',
    pages: 2,
    readStatus: 'plan to read',
  },
  {
    title: 'Lastly, the favourite feature is not available yet either! 😅',
    author: 'Ceca Cora',
    pages: 3,
    readStatus: 'plan to read',
  },
];

// book constructor
function Book(title, author, pages, readStatus, favourite = false) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.readStatus = readStatus),
    (this.favourite = favourite);
}

// modal form
let modal = document.querySelector('.modal');

const openForm = () => {
  modal.style.display = 'flex';
  modal.addEventListener('click', (e) => {
    if (e.target.className === 'modal') {
      modal.style.display = 'none';
    }
  });
};

let newBookButton = document.querySelector('.newBook');
newBookButton.addEventListener('click', openForm);

// push book to library state
const addBookToLibrary = () => {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let readStatus = document.querySelector('#readStatus').value;

  let bookEntry = new Book(title, author, pages, readStatus);
  myLibrary.push(bookEntry);
};

// add book
let addBookButton = document.querySelector('.addBook');
addBookButton.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
  document.querySelector('form').reset();
  modal.style.display = 'none';
  displayBooks();
  saveToLocalStorage();
});

// remove book
const removeBookFromLibrary = (titleToRemove) => {
  myLibrary = myLibrary.filter((item) => item.title !== titleToRemove);
  displayBooks();
  saveToLocalStorage();
};

// toggle read status
const toggleReadStatus = (titleToToggle) => {
  let currentStatus = titleToToggle.target.textContent;
  let newStatus;
  if (currentStatus === 'reading') {
    newStatus = 'completed';
  } else if (currentStatus === 'completed') {
    newStatus = 'plan to read';
  } else {
    newStatus = 'reading';
  }
  let title = titleToToggle.target.parentElement.children[1].firstChild.data;
  for (let i = 0; i < myLibrary.length; i++) {
    if (title === myLibrary[i].title) {
      myLibrary[i].readStatus = newStatus;
    }
  }
  displayBooks();
  saveToLocalStorage();
};

// generate markup for book
const createBook = (entry) => {
  let book = document.createElement('article');

  let removeButton = document.createElement('button');
  removeButton.className = 'remove';
  removeButton.innerText = '×';
  removeButton.addEventListener('click', (e) => {
    removeBookFromLibrary(e.target.nextSibling.firstChild.data);
  });

  let bookTitle = document.createElement('h3');
  let bookAuthor = document.createElement('span');
  bookTitle.innerText = `${entry.title}`;
  bookAuthor.innerText = ` by ${entry.author}`;
  bookTitle.appendChild(bookAuthor);

  let bookPages = document.createElement('p');
  let pageCount = document.createElement('span');
  bookPages.className = 'pages';
  pageCount.innerText = `${entry.pages}`;
  bookPages.appendChild(pageCount);
  let pageWord = document.createTextNode(' pages');
  bookPages.appendChild(pageWord);

  let readStatusToggleButton = document.createElement('button');
  readStatusToggleButton.innerText = `${entry.readStatus}`;
  readStatusToggleButton.className = 'readStatus';
  readStatusToggleButton.addEventListener('click', (e) => {
    toggleReadStatus(e);
  });

  book.appendChild(removeButton);
  book.appendChild(bookTitle);
  book.appendChild(bookPages);
  book.appendChild(readStatusToggleButton);

  book.addEventListener('mouseenter', (e) => {
    e.target.firstChild.style.display = 'block';
  });

  book.addEventListener('mouseleave', (e) => {
    e.target.firstChild.style.display = 'none';
  });

  return book;
};

// add books to view
let bookDisplay = document.querySelector('.bookDisplay');

const displayBooks = () => {
  bookDisplay.innerText = '';
  for (let i = 0; i < myLibrary.length; i++) {
    bookDisplay.appendChild(createBook(myLibrary[i]));
  }
};

// local storage functions

const saveToLocalStorage = () => {
  localStorage.setItem('witchary', JSON.stringify(myLibrary));
};

const loadFromLocalStorage = () => {
  if (localStorage['witchary']) {
    myLibrary = JSON.parse(localStorage.getItem('witchary'));
  }
  displayBooks();
};

loadFromLocalStorage();
