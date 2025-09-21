package com.example.virtualbookstore.repository;

import com.example.virtualbookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Find orders by user ID
    List<Order> findByUserId(Long userId);
    
    // Find orders by status
    List<Order> findByStatus(Order.OrderStatus status);
    
    // Find orders by user ID and status
    List<Order> findByUserIdAndStatus(Long userId, Order.OrderStatus status);
    
    // Find orders by date range
    List<Order> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Find orders by user ID ordered by date (newest first)
    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);
}