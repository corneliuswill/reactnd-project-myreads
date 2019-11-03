import React, { Component } from  'react'
import PropTypes from 'prop-types'

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
                    <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail}` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(event) => onMoveBook(book, event.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                            </select>
                        </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                            <ul className="book-authors-list">
                            {book.authors.map((author, key) => (
                                <li key={key}>{author}</li>
                            ))}
                            </ul>
                        </div>
                    </div>
                    </li>
                    ))}
                </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;