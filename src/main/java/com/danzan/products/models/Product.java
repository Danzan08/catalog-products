package com.danzan.products.models;

import com.sun.istack.NotNull;

import javax.validation.constraints.Size;

import javax.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "product_id")
    private Integer id;

    @NotNull
    @Size(max = 20)
    @Column(name = "title")
    private String title;

    @Size(max = 50)
    @Column(name = "description")
    private String description;



    public Product(Integer id, @Size(max = 20) String title, @Size(max = 50) String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public Product() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
