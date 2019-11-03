import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf'
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
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search"
                to='/'
              ></Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
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
