package com.example.product.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entitys
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String name;
    private String description;
    private String image;
    private String category;
    private float price;
    private int quantity;
    private String internalReference;
    private Long shellId;
    private String inventoryStatus; 
    private double rating;
    private long createdAt;
    private long updatedAt;
}
