// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  //Create tr element
  const row = document.createElement("tr");
  //insert cols
  row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;
  list.appendChild(row);
};

// Show alerts
UI.prototype.showAlert = function(msg, className) {
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
};

// Delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event listeners
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
    //Add UI to list
    ui.addBookToList(book);
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
  //show message
  ui.showAlert("Book removed!", "success");
  e.preventDefault();
});
