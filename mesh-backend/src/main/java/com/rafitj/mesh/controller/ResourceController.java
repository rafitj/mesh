package com.rafitj.mesh.controller;

import com.rafitj.mesh.proto.request.DisconnectResourcesRequest;
import com.rafitj.mesh.io.repos.ProjectRepo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/resource")
@CrossOrigin("http://localhost:3000")
public class ResourceController {

    private final ProjectRepo projectRepo;

    public ResourceController(ProjectRepo projectRepo) {
        this.projectRepo = projectRepo;
    }

    @DeleteMapping("/disconnect")
    private void disconnectServer(@RequestBody DisconnectResourcesRequest disconnectResourcesRequest)  {
        projectRepo.deleteConnection(disconnectResourcesRequest.getResourceId(), disconnectResourcesRequest.getServerId());
    }

}
