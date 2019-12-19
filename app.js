// book constructor
function Book(title, author, isbn){
  this.title= title;
  this.author = author;
  this.isbn = isbn;
}


// UI constructor

function UI(){}

// add book to list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  // insert columns
  row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class='delete'>X</a></td>`;
  list.appendChild(row)
}

// UI clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';
}

// UI show alert
UI.prototype.showAlert = function(msg,className){
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

// delete book
  UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

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
  //show message
  ui.showAlert('Book removed!','success');
  e.preventDefault();
})