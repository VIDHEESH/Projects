package com.example.virtualbookstore.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Virtual Bookstore API")
                        .version("1.0")
                        .description("REST API for Virtual Bookstore Management System")
                        .contact(new Contact()
                                .name("Bookstore Team")
                                .email("support@virtualbookstore.com")));
    }
}