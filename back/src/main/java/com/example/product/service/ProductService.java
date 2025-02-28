package com.example.product.service;

import com.example.product.model.Product;
import com.example.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(long id, Product p) {
        Product product = productRepository.findById(id).orElse(null);

        if (product == null) {
            throw new RuntimeException("Product not found");
        }
        product.setCode(p.getCode());
        product.setName(p.getName());
        product.setDescription(p.getDescription());
        product.setImage(p.getImage());
        product.setCategory(p.getCategory());
        product.setPrice(p.getPrice());
        product.setQuantity(p.getQuantity());
        product.setInternalReference(p.getInternalReference());
        product.setShellId(p.getShellId());
        product.setInventoryStatus(p.getInventoryStatus());
        product.setRating(p.getRating());
        product.setUpdatedAt(System.currentTimeMillis());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

}
