package com.example.virtualbookstore.service;

import com.example.virtualbookstore.entity.User;
import com.example.virtualbookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    private static final String EMAIL_PATTERN = 
        "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    
    private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN);
    
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    // Get user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    // Get user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // Register new user
    public User registerUser(User user) {
        validateUser(user);
        
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists: " + user.getEmail());
        }
        
        // In a real application, you would hash the password here
        // user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        return userRepository.save(user);
    }
    
    // Update user
    public User updateUser(Long id, User userDetails) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            
            // Check if email is being changed and if new email already exists
            if (!user.getEmail().equals(userDetails.getEmail()) && 
                userRepository.existsByEmail(userDetails.getEmail())) {
                throw new RuntimeException("Email already exists: " + userDetails.getEmail());
            }
            
            user.setEmail(userDetails.getEmail());
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            // Don't update password here unless specifically requested
            
            validateUser(user);
            return userRepository.save(user);
        }
        throw new RuntimeException("User not found with id: " + id);
    }
    
    // Delete user
    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
    
    // Update password
    public User updatePassword(Long id, String newPassword) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User existingUser = user.get();
            validatePassword(newPassword);
            // In a real application, you would hash the password here
            // existingUser.setPassword(passwordEncoder.encode(newPassword));
            existingUser.setPassword(newPassword);
            return userRepository.save(existingUser);
        }
        throw new RuntimeException("User not found with id: " + id);
    }
    
    // Authenticate user (basic implementation)
    public Optional<User> authenticateUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            // In a real application, you would compare hashed passwords
            // if (passwordEncoder.matches(password, user.get().getPassword())) {
            if (user.get().getPassword().equals(password)) {
                return user;
            }
        }
        return Optional.empty();
    }
    
    // Validate user data
    private void validateUser(User user) {
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (!isValidEmail(user.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }
        if (user.getFirstName() == null || user.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("First name cannot be empty");
        }
        if (user.getLastName() == null || user.getLastName().trim().isEmpty()) {
            throw new IllegalArgumentException("Last name cannot be empty");
        }
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        validatePassword(user.getPassword());
    }
    
    // Validate email format
    private boolean isValidEmail(String email) {
        return pattern.matcher(email).matches();
    }
    
    // Validate password strength
    private void validatePassword(String password) {
        if (password.length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long");
        }
        // Add more password validation rules as needed
    }
}