import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import BooksList from './BooksList' 
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books: books,
      }))
    })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        BooksAPI.getAll()
          .then((books) => {
            this.setState(() => ({
              books: books
            }))
          })
      })
  }

  render() {
    let currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading');
    let wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead');
    let read = this.state.books.filter((book) => book.shelf === 'read');

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <BooksList booksOnShelf={this.state.books} handleChange={this.moveBook} />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf 
                books={currentlyReading} 
                title="Currently Reading" 
                onMoveBook={this.moveBook} 
              />
              <BookShelf 
                books={wantToRead} 
                title="Want to Read" 
                onMoveBook={this.moveBook}  
              />
              <BookShelf 
                books={read} 
                title="Read" 
                onMoveBook={this.moveBook}  
              />
            </div>
            <div className="open-search">
              <Link  
                to="/search"
              ></Link>
            </div>
          </div>     
        )} />
      </div>
    )
  }
}        

export default BooksApp
