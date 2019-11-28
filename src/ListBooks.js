import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListBooks extends Component {
    state = {
        books: [],
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() });
        BooksAPI.search(query)
            .then((books) => {
                this.setState({ books })
            })
    }

    render() {
        let { booksOnShelf, handleChange } = this.props
        let { books, query } = this.state

        if (books === undefined) {
            books = []
        }
        
        return (
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
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                { books.error !== undefined ? 
                <div className="message">error: {books.error}</div>    
                :
                <ol className="books-grid">
                    {books !== undefined && (
                        books.map((book, key) => ( 
                        <li key={key}>
                            <Book booksOnShelf={booksOnShelf} book={book} handleChange={handleChange}/>                          
                        </li>        
                        ))
                    )}
                </ol>
                }
                </div>
            </div>
        )
    }
}

export default ListBooks;