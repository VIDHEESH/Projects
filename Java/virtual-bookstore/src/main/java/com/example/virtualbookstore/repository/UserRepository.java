package com.example.virtualbookstore.repository;

import com.example.virtualbookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find user by email
    Optional<User> findByEmail(String email);
    
    // Check if email exists
    boolean existsByEmail(String email);
    
    // Find user by email and password (for authentication)
    Optional<User> findByEmailAndPassword(String email, String password);
    
    // Find users by first name
    Optional<User> findByFirstName(String firstName);
    
    // Find users by last name
    Optional<User> findByLastName(String lastName);
}