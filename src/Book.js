import React,  { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes ={
        book: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ])
    }

    getBookShelf(book, booksOnShelf) {
        let result = booksOnShelf.filter(b => b.id === book.id)

        if (!Array.isArray(result) || !result.length) {
            return 'none'
        } else {
            return result[0].shelf
        }
    }

    render() {
        const { booksOnShelf, book, handleChange } = this.props;
        let thumbnail = '';
        let shelf;

        if (typeof book.imageLinks !== 'undefined') {
            thumbnail = book.imageLinks.smallThumbnail
        }

        if ("shelf" in book) {
            shelf = book.shelf
        } else {
            shelf = this.getBookShelf(book, booksOnShelf);
        }

        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail}` }}></div>
                <div className="book-shelf-changer">
                    <select value={ shelf } onChange={(event) => handleChange(book, event.target.value)}>
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
                    {book.authors !== undefined && (
                        book.authors.map((author, key) => (
                        <li key={key}>{author}</li>
                        ))
                    )}
                    </ul>
                </div>
            </div>  
        );
    }
}

export default Book;