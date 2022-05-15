// Book class : represents a book

class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

const bookOne = new Book("Title", "John Doe", 31371982871)

console.log(bookOne)
// UI Class : Handle UI tasks( displaying the book, remove a book, showing alert)


class UI {
    static displayBooks() {
        const StoredBooks = [ 
        ]
        
        const books = StoredBooks //pretend this to be a localStorage
        
        books.forEach(book => UI.addABookToList(book));
        console.log(books)
    }
    
    static addABookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr'); //creating a table row

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td id="deleteBtn"><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row)
    }

    static deleteABook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();

        }
    }

    static showAlert(message, className){ //custom alert message
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Vanish in 3s
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector('#title').value = ""
        document.querySelector('#author').value = ""
        document.querySelector('#isbn').value = ""
    }

    
}

// Store class : handles storage

// Event : display a book

document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event : add a book 

document.querySelector('#book-form').addEventListener('submit', (e)=>{
    // prevent actual submit
    e.preventDefault();
    //get book values from forms
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value


    if(title === "" || author === "" || isbn === ""){
        UI.showAlert("Fill out all the forms!", "danger")
    }else{
        //make a new book constructor

        const book= new Book(title,author,isbn);
        
        //UI.displayBooks(bookThree)
        console.log(book)
        UI.showAlert("Book added!", "success")
        

        //add book to array 
        UI.addABookToList(book)

        // clear form fields 

        UI.clearFields();
    }
});


// Event : delete a book

document.querySelector('#book-list').addEventListener('click', (e)=> {
    UI.deleteABook(e.target)
})