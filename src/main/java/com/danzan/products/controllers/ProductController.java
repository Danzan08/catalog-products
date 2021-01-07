package com.danzan.products.controllers;

import com.danzan.products.models.Product;
import com.danzan.products.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api")

public class ProductController {
    @Autowired

    private ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @RequestMapping("/")
    public String mainPage() {
        return "index";
    }

    @GetMapping("/products")
    public ResponseEntity<Iterable<Product>> getAllProducts(@RequestParam(required = false) String title) {
        if(title == null) {
            return ResponseEntity.ok(productRepository.findAllNative());
        } else {
            return ResponseEntity.ok(productRepository.findByTitleContainingIgnoreCase(title));
        }
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent())
            return ResponseEntity.ok(product.get());

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/products/{id}")
    public ResponseEntity<Product> setDescription(@PathVariable Integer id, @RequestBody Product productDetails) {
        Optional<Product> product = productRepository.findById(id);
        if (!product.isPresent())
            return ResponseEntity.notFound().build();

        Product result = product.get();
        result.setDescription(productDetails.getDescription());
        productRepository.save(result);
        return ResponseEntity.ok().build();

    }

    @PostMapping(value = "/products", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public Product addProduct(@RequestBody Product product) {

        return productRepository.save(product);

    }


}
