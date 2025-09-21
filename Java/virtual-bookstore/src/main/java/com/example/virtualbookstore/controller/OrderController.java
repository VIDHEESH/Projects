 //Library\virtualbookstore\src\main\java\com\example\virtualbookstore\controller\OrderController.java
package com.example.virtualbookstore.controller;

import com.example.virtualbookstore.entity.Order;
import com.example.virtualbookstore.entity.OrderItem;
import com.example.virtualbookstore.service.OrderService;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    
    private final OrderService orderService;
    
    //@Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    
    // GET /api/orders - Get all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
    
    // GET /api/orders/{id} - Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.getOrderById(id);
        if (order.isPresent()) {
            return ResponseEntity.ok(order.get());
        }
        return ResponseEntity.notFound().build();
    }
    
    // GET /api/orders/user/{userId} - Get orders by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        List<Order> orders = orderService.getOrdersByUser(userId);
        return ResponseEntity.ok(orders);
    }
    
    // GET /api/orders/status/{status} - Get orders by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable Order.OrderStatus status) {
        List<Order> orders = orderService.getOrdersByStatus(status);
        return ResponseEntity.ok(orders);
    }
    
    // POST /api/orders - Create new order
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest request) {
        Order createdOrder = orderService.createOrder(request.getUserId(), request.getOrderItems());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }
    
    // PUT /api/orders/{id}/status - Update order status
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam Order.OrderStatus status) {
        Order updatedOrder = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(updatedOrder);
    }
    
    // PUT /api/orders/{id}/cancel - Cancel order
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable Long id) {
        Order cancelledOrder = orderService.cancelOrder(id);
        return ResponseEntity.ok(cancelledOrder);
    }
    
    // GET /api/orders/{id}/items - Get order items
    @GetMapping("/{id}/items")
    public ResponseEntity<List<OrderItem>> getOrderItems(@PathVariable Long id) {
        List<OrderItem> orderItems = orderService.getOrderItems(id);
        return ResponseEntity.ok(orderItems);
    }
    
    // GET /api/orders/user/{userId}/total-spending - Get user's total spending
    @GetMapping("/user/{userId}/total-spending")
    public ResponseEntity<BigDecimal> getUserTotalSpending(@PathVariable Long userId) {
        BigDecimal totalSpending = orderService.getUserTotalSpending(userId);
        return ResponseEntity.ok(totalSpending);
    }
    
    // Inner class for create order request
    public static class CreateOrderRequest {
        private Long userId;
        private List<OrderService.OrderItemRequest> orderItems;
        
        // Constructors
        public CreateOrderRequest() {}
        
        // Getters and setters
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public List<OrderService.OrderItemRequest> getOrderItems() { return orderItems; }
        public void setOrderItems(List<OrderService.OrderItemRequest> orderItems) { this.orderItems = orderItems; }
    }
}