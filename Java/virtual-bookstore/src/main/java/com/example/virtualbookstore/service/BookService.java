package com.example.virtualbookstore.service;

import com.example.virtualbookstore.entity.Book;
import com.example.virtualbookstore.exception.ResourceNotFoundException;
import com.example.virtualbookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    
    private final BookRepository bookRepository;
    
    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }
    
    public Book addBook(Book book) {
        validateBook(book);
        return bookRepository.save(book);
    }
    
    public Book updateBook(Long id, Book bookDetails) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        
        existingBook.setTitle(bookDetails.getTitle());
        existingBook.setAuthor(bookDetails.getAuthor());
        existingBook.setGenre(bookDetails.getGenre());
        existingBook.setPrice(bookDetails.getPrice());
        existingBook.setStock(bookDetails.getStock());
        existingBook.setDescription(bookDetails.getDescription());
        
        return bookRepository.save(existingBook);
    }
    
    public void deleteBook(Long id) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        bookRepository.delete(existingBook);
    }
    
    public List<Book> getBooksByGenre(String genre) {
        return bookRepository.findByGenreContainingIgnoreCase(genre);
    }
    
    public List<Book> getBooksByAuthor(String author) {
        return bookRepository.findByAuthorContainingIgnoreCase(author);
    }
    
    public List<Book> searchBooksByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }
    
    public List<Book> getBooksByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return bookRepository.findByPriceBetween(minPrice, maxPrice);
    }
    
    public List<Book> getAvailableBooks() {
        return bookRepository.findByStockGreaterThan(0);
    }
    
    public Book updateBookStock(Long id, Integer stock) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        
        existingBook.setStock(stock);
        return bookRepository.save(existingBook);
    }
    
    public void updateStock(Long bookId, Integer quantity) {
        Book existingBook = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book", "id", bookId));
        
        if (existingBook.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock for book: " + existingBook.getTitle());
        }
        
        existingBook.setStock(existingBook.getStock() - quantity);
        bookRepository.save(existingBook);
    }
    
    private void validateBook(Book book) {
        if (book.getTitle() == null || book.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Book title is required");
        }
        if (book.getAuthor() == null || book.getAuthor().trim().isEmpty()) {
            throw new IllegalArgumentException("Book author is required");
        }
        if (book.getPrice() == null || book.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Book price must be greater than 0");
        }
        if (book.getStock() == null || book.getStock() < 0) {
            throw new IllegalArgumentException("Book stock cannot be negative");
        }
    }
}
/*
 package com.example.virtualbookstore.service;

import com.example.virtualbookstore.entity.Book;
import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book> getAllBooks();
    Optional<Book> getBookById(Long id);
    Book addBook(Book book);
    Book updateBook(Long id, Book bookDetails);
    void deleteBook(Long id);
    // other methods...
}
 */