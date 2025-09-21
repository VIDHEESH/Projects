package com.example.virtualbookstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.virtualbookstore.repository")
public class VirtualbookstoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(VirtualbookstoreApplication.class, args);
    }
}