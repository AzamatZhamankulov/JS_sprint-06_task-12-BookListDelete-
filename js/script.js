function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
  
  function UI() {}
  
/* add book */
  UI.prototype.addBook = function (book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
  
    row.innerHTML = `
      <td>${book.title}
      <td>${book.author}
      <td>${book.isbn}
      <td><a href="#" class="delete">X</a></td>`;
  
    list.appendChild(row);
  };

/* alert error */
  UI.prototype.alert = function (msg, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
  
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
  
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  };

/* delete book */
  UI.prototype.deleteBook = function (target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  };

/* clear */
  UI.prototype.clear = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  };
  
  document.getElementById("book-form").addEventListener("submit", function(e) {
    const title = document.getElementById("title").value,
      author = document.getElementById("author").value,
      isbn = document.getElementById("isbn").value;
  
    const book = new Book(title, author, isbn);
    const ui = new UI();
  
    if (title === "" || author === "" || isbn === "") {
      ui.alert("Please, fill the field!", "error");
    } else {
      const book = new Book(title, author, isbn);
      const ui = new UI();
      ui.addBook(book);
      ui.alert("The book is added!", "success");
      ui.clear();
    }
    e.preventDefault();
  });


/* Event Listener for deleting book */
document.getElementById("book-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book Deleted", "success");
  e.preventDefault();
});