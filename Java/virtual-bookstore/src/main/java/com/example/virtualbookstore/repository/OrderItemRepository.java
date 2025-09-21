package com.example.virtualbookstore.repository;

import com.example.virtualbookstore.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
    // Find order items by order ID
    List<OrderItem> findByOrderId(Long orderId);
    
    // Find order items by book ID
    List<OrderItem> findByBookId(Long bookId);
    
    // Find order items by order ID and book ID
    List<OrderItem> findByOrderIdAndBookId(Long orderId, Long bookId);
}