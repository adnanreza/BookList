class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //Create tr element
    const row = document.createElement("tr");
    //insert cols
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);
  }

  showAlert(msg, className) {
    //create div
    const div = document.createElement("div");
    //add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(msg));
    //get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    //insert alert
    container.insertBefore(div, form);
    //timeout alert after 3s
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book) {
      const ui = new UI();
      //add book to ui
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event listener for submit
document.querySelector("#book-form").addEventListener("submit", function(e) {
  //Get Form Values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  //Instantiate a book
  const book = new Book(title, author, isbn);
  //Instantiate UI object
  const ui = new UI();

  //Validate
  if (title === "" || author === "" || isbn === "") {
    //error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Add book to list
    ui.addBookToList(book);
    //Add to Local Storage
    Store.addBook(book);
    //Show success
    ui.showAlert("Book Added!", "success");
    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete
document.querySelector("#book-list").addEventListener("click", function(e) {
  //Instantiate ui
  const ui = new UI();
  ui.deleteBook(e.target);

  //remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show message
  ui.showAlert("Book removed!", "success");
  e.preventDefault();
});

// Event listener for clearAll button
document.querySelector("#bookList").addEventListener("submit", function(e) {
  //remove all TRs from ui
  const bookList = document.querySelector("#book-list");
  clearBooks(bookList);

  e.preventDefault();
});

function clearBooks(bookList) {
  //hackyway:
  //bookList.innerHTML = "";
  //loop through and remove first child while it exists
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }
}
