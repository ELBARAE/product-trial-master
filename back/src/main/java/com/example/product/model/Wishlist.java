package com.example.product.model;

import jakarta.persistence.*;
import lombok.Data;
import com.example.product.model.Product;

import java.util.List;

@Data
@Entity
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

//    @ManyToMany
//    private List<Product> products;
}
