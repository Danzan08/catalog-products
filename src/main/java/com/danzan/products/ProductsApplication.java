package com.danzan.products;

import com.danzan.products.models.Product;
import com.danzan.products.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProductsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductsApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(ProductRepository productRepository) {
        return (args) -> {
            productRepository.save(new Product(1, "Французская булочка", "Съешь ещё этих мягких французских булок."));
            productRepository.save(new Product(2, "Чай", "Да выпей же чаю."));
            productRepository.save(new Product(3, "Консервированный борщ", "Прям как у мамы, но это не точно."));
            productRepository.save(new Product(4, "Кофе", "Этот мир не так уж плох, покуда в нем есть кофе."));
            productRepository.save(new Product(5, "Кефир", "Возможно свежий."));
        };
    }

}
