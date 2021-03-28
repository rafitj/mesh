package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.dto.ConnectResourcesDTO;
import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.ClientRepo;
import com.rafitj.mesh.io.repos.DatabaseRepo;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/resource")
@CrossOrigin("http://localhost:3000")
public class ResourceController {
    @Autowired
    ServerRepo serverRepo;
    @Autowired
    DatabaseRepo dbRepo;
    @Autowired
    ClientRepo clientRepo;
    @Autowired
    ProjectRepo projectRepo;

    @PostMapping("/kill/{type}/{id}")
    private String killResource(@PathVariable String type, @PathVariable String id) {
       if (type.equals("server")) {
            ServerEntity s = serverRepo.findById(id).orElse(null);
            if (s != null) {
                s.setAlive(false);
                serverRepo.save(s);
                return "Killed";
            }
       } else if (type.equals("db")) {
           DatabaseEntity d = dbRepo.findById(id).orElse(null);
           if (d != null) {
               d.setAlive(false);
               dbRepo.save(d);
               return "Killed";
           }
       } else {
           ClientEntity c = clientRepo.findById(id).orElse(null);
           if (c != null) {
               c.setAlive(false);
               clientRepo.save(c);
               return "Killed";
           }
       }
       return "Could not find";
    }

    @GetMapping("/start")
    private void startSystem(){

    }

}
