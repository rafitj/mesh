package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.documents.UserDocument;
import com.rafitj.mesh.io.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepo userRepo;

    public UserController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/all")
    public List<UserDocument> getUser(){
       return userRepo.findAll();
    }
}
