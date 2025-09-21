# Virtual Bookstore API

A comprehensive RESTful API for managing a virtual bookstore built with **Spring Boot**, **JPA/Hibernate**, and **MySQL**.

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+
- XAMPP (for local development)

### Setup & Run
```bash
# Navigate to project directory
cd Java/virtual-bookstore

# Configure database in application.properties
# Update: spring.datasource.url=jdbc:mysql://localhost:3306/virtual_bookstore

# Run the application
mvn spring-boot:run
```

## 🔗 API Endpoints

### 📚 Books
- `GET /api/books` - Get all books
- `POST /api/books` - Add new book
- `GET /api/books/{id}` - Get book by ID
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### 👥 Users  
- `POST /api/users/register` - Register user
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID

### 🛒 Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders
- `GET /api/orders/user/{userId}` - Get user orders

## 🧪 Test Examples

**Add a Book:**
```bash
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Spring Boot Guide",
    "author": "Tech Author",
    "genre": "Programming",
    "price": 45.99,
    "stock": 20,
    "description": "Complete Spring Boot tutorial"
  }'
```

**Register User:**
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepass123",
    "firstName": "John",
    "lastName": "Developer"
  }'
```

**Create Order:**
```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "orderItems": [{"bookId": 1, "quantity": 2}]
  }'
```

## 🛠️ Technologies

- **Framework:** Spring Boot 3.5.6
- **Database:** MySQL 8.0 with JPA/Hibernate
- **Build:** Maven
- **Validation:** Bean Validation (JSR-303)
- **Architecture:** RESTful API with MVC pattern

## 📊 Database Schema

```sql
-- Books table
CREATE TABLE books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    description TEXT
);

-- Users table  
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders & Order Items tables with foreign keys
```

## 📝 Features Implemented

✅ **CRUD Operations** for Books, Users, Orders  
✅ **Search & Filter** books by genre, author, price  
✅ **Stock Management** with real-time updates  
✅ **Order Processing** with inventory validation  
✅ **Exception Handling** with custom error responses  
✅ **Data Validation** using Bean Validation  
✅ **RESTful Design** following best practices  

## 🔧 Configuration

Key configuration in `application.properties`:
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/virtual_bookstore
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# Server
server.port=8080
```

## 📁 Project Structure

```
src/main/java/com/example/virtualbookstore/
├── controller/     # REST endpoints
├── entity/         # JPA entities  
├── repository/     # Data access layer
├── service/        # Business logic
├── exception/      # Custom exceptions
└── VirtualbookstoreApplication.java
```

---
**Part of:** [Java Projects Collection](../README.md)  
**Author:** VIDHEESH  
**Status:** ✅ Functional & Tested