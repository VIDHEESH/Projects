package com.example.virtualbookstore.controller;

import com.example.virtualbookstore.entity.Book;
import com.example.virtualbookstore.service.BookService;
import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {
    
    private final BookService bookService;
    
    // Constructor for dependency injection
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
    
    // GET /api/books - Get all books
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }
    
    // GET /api/books/{id} - Get book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookService.getBookById(id);
        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    // POST /api/books - Add new book
    @PostMapping
    public ResponseEntity<Book> addBook(@Valid @RequestBody Book book) {
        Book savedBook = bookService.addBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }
    
    // PUT /api/books/{id} - Update book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody Book bookDetails) {
        Book updatedBook = bookService.updateBook(id, bookDetails);
        return ResponseEntity.ok(updatedBook);
    }
    
    // DELETE /api/books/{id} - Delete book
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
    
    // GET /api/books/search - Search books by genre or author
    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        
        List<Book> books;
        
        if (genre != null && !genre.isEmpty()) {
            books = bookService.getBooksByGenre(genre);
        } else if (author != null && !author.isEmpty()) {
            books = bookService.getBooksByAuthor(author);
        } else if (title != null && !title.isEmpty()) {
            books = bookService.searchBooksByTitle(title);
        } else if (minPrice != null && maxPrice != null) {
            books = bookService.getBooksByPriceRange(minPrice, maxPrice);
        } else {
            books = bookService.getAllBooks();
        }
        
        return ResponseEntity.ok(books);
    }
    
    // GET /api/books/available - Get available books (in stock)
    @GetMapping("/available")
    public ResponseEntity<List<Book>> getAvailableBooks() {
        List<Book> books = bookService.getAvailableBooks();
        return ResponseEntity.ok(books);
    }
    
    // PUT /api/books/{id}/stock - Update book stock
    @PutMapping("/{id}/stock")
    public ResponseEntity<Book> updateBookStock(@PathVariable Long id, @RequestParam Integer stock) {
        Book updatedBook = bookService.updateBookStock(id, stock);
        return ResponseEntity.ok(updatedBook);
    }
}