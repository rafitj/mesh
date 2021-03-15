package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.entities.ServerEntity;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/server")
public class ServerController {
    @Autowired
    ServerRepo serverRepo;

    @GetMapping("/all")
    private List<ServerEntity> getServers(){
        return serverRepo.findAll();
    }
}
