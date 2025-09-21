package com.example.virtualbookstore.service;

import com.example.virtualbookstore.entity.Order;
import com.example.virtualbookstore.entity.OrderItem;
import com.example.virtualbookstore.entity.User;
import com.example.virtualbookstore.entity.Book;
import com.example.virtualbookstore.repository.OrderRepository;
import com.example.virtualbookstore.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final BookService bookService;
    private final UserService userService;
    
    @Autowired
    public OrderService(OrderRepository orderRepository, 
                       OrderItemRepository orderItemRepository,
                       BookService bookService, 
                       UserService userService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.bookService = bookService;
        this.userService = userService;
    }
    
    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    // Get order by ID
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }
    
    // Get orders by user
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }
    
    // Get orders by status
    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }
    
    // Create new order
    @Transactional
    public Order createOrder(Long userId, List<OrderItemRequest> orderItemRequests) {
        // Validate user exists
        Optional<User> user = userService.getUserById(userId);
        if (!user.isPresent()) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        
        // Create order
        Order order = new Order();
        order.setUser(user.get());
        order.setStatus(Order.OrderStatus.PENDING);
        order.setTotalAmount(BigDecimal.ZERO);
        
        // Save order first to get ID
        order = orderRepository.save(order);
        
        BigDecimal totalAmount = BigDecimal.ZERO;
        
        // Process order items
        for (OrderItemRequest itemRequest : orderItemRequests) {
            Optional<Book> book = bookService.getBookById(itemRequest.getBookId());
            if (!book.isPresent()) {
                throw new RuntimeException("Book not found with id: " + itemRequest.getBookId());
            }
            
            Book bookEntity = book.get();
            
            // Check stock availability
            if (bookEntity.getStock() < itemRequest.getQuantity()) {
                throw new RuntimeException("Insufficient stock for book: " + bookEntity.getTitle());
            }
            
            // Create order item
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setBook(bookEntity);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(bookEntity.getPrice());
            
            orderItemRepository.save(orderItem);
            
            // Update book stock
            bookService.updateStock(itemRequest.getBookId(), itemRequest.getQuantity());
            
            // Calculate total
            BigDecimal itemTotal = bookEntity.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            totalAmount = totalAmount.add(itemTotal);
        }
        
        // Update order total
        order.setTotalAmount(totalAmount);
        return orderRepository.save(order);
    }
    
    // Update order status
    public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()) {
            Order existingOrder = order.get();
            existingOrder.setStatus(status);
            return orderRepository.save(existingOrder);
        }
        throw new RuntimeException("Order not found with id: " + orderId);
    }
    
    // Cancel order
    @Transactional
    public Order cancelOrder(Long orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()) {
            Order existingOrder = order.get();
            
            // Only allow cancellation if order is pending or confirmed
            if (existingOrder.getStatus() == Order.OrderStatus.PENDING || 
                existingOrder.getStatus() == Order.OrderStatus.CONFIRMED) {
                
                // Restore book stock
                List<OrderItem> orderItems = orderItemRepository.findByOrderId(existingOrder.getId());
                for (OrderItem item : orderItems) {
                    Book book = item.getBook();
                    book.setStock(book.getStock() + item.getQuantity());
                    bookService.updateBookStock(book.getId(), book.getStock());
                }
                
                existingOrder.setStatus(Order.OrderStatus.CANCELLED);
                return orderRepository.save(existingOrder);
            } else {
                throw new RuntimeException("Cannot cancel order with status: " + existingOrder.getStatus());
            }
        }
        throw new RuntimeException("Order not found with id: " + orderId);
    }
    
    // Get order items for an order
    public List<OrderItem> getOrderItems(Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }
    
    // Calculate user's total spending
    public BigDecimal getUserTotalSpending(Long userId) {
        List<Order> userOrders = orderRepository.findByUserId(userId);
        return userOrders.stream()
                .filter(order -> order.getStatus() != Order.OrderStatus.CANCELLED)
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    // Inner class for order item request
    public static class OrderItemRequest {
        private Long bookId;
        private Integer quantity;
        
        // Constructors
        public OrderItemRequest() {}
        
        public OrderItemRequest(Long bookId, Integer quantity) {
            this.bookId = bookId;
            this.quantity = quantity;
        }
        
        // Getters and setters
        public Long getBookId() { return bookId; }
        public void setBookId(Long bookId) { this.bookId = bookId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }
}