package com.example.virtualbookstore.repository;

import com.example.virtualbookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    
    // Search by genre (case-insensitive, partial match)
    List<Book> findByGenreContainingIgnoreCase(String genre);
    
    // Search by author (case-insensitive, partial match)
    List<Book> findByAuthorContainingIgnoreCase(String author);
    
    // Search by title (case-insensitive, partial match)
    List<Book> findByTitleContainingIgnoreCase(String title);
    
    // Search by price range
    List<Book> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    // Find books with stock greater than specified amount
    List<Book> findByStockGreaterThan(Integer stock);
    
    // Optional: Additional useful query methods
    List<Book> findByAuthorAndGenre(String author, String genre);
    List<Book> findByPriceGreaterThan(BigDecimal price);
    List<Book> findByPriceLessThan(BigDecimal price);
}