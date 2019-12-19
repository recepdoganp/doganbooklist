class Book {
  constructor(title,author,isbn){
    this.title = title,
    this.author = author,
    this.isbn = isbn
  }
}

class UI {
  addBookToList(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    // insert columns
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X</a></td>`;
    list.appendChild(row)
  }
  showAlert(msg, className){
    // create a div
    const msgDiv =document.createElement('div');
    msgDiv.className = `alert ${className}`;
    // add text
    msgDiv.appendChild(document.createTextNode(msg));
    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('.book-form');
    //insert alert
    container.insertBefore(msgDiv,form);
    // dissepear in 3 seconds
    
    setTimeout(function(){
      document.querySelector('.alert').remove();
    },3000)
  }
  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
  }
};

// LOCAL STORAGE CLASS
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books')===null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }
  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI;
      // add book to UI
      ui.addBookToList(book)
    });
  }
  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books))
  }
  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach((book,index)=>{
      if (book.isbn === isbn){
        books.splice(index,1)
      }
    });
    localStorage.setItem('books',JSON.stringify(books))
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded',Store.displayBooks)


// event listener for add book

document.querySelector('.book-form').addEventListener('submit',function(e){
  const title = document.getElementById('title').value,
  author = document.getElementById('author').value,
  isbn = document.getElementById('isbn').value
  // create a new book
  const book = new Book(title,author, isbn);

  const ui = new UI()

  // validate

  if(title === '' || author === '' || isbn === ''){
    // error alert
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    // UI add book to the list
    ui.addBookToList(book)

    // add book to local storage
    Store.addBook(book)

    // show success
    ui.showAlert('Book added','success')

    // clear fields

    ui.clearFields();
  }  
  e.preventDefault();
}
)

// event listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
  const ui = new UI()
  //delete book
  ui.deleteBook(e.target)
  // remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.innerHTML)

  //show message
  ui.showAlert('Book removed!','success');
  e.preventDefault();
})