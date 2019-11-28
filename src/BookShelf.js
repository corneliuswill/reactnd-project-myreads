import React, { Component } from  'react'
import PropTypes from 'prop-types'

import Book from './Book';

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    }
    
    render() {
        let { title, books, onMoveBook } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book, key) => (
                    <li key={key}>
                    <Book book={book} handleChange={onMoveBook}/>
                    </li>
                    ))}
                </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;