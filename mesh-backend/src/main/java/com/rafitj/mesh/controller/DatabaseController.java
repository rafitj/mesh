package com.rafitj.mesh.controller;

import com.rafitj.mesh.controller.projections.DatabaseEntityProjection;
import com.rafitj.mesh.io.dto.request.ConnectResourcesRequest;
import com.rafitj.mesh.io.dto.response.ConnectResourcesResponse;
import com.rafitj.mesh.io.dto.request.CreateDatabaseRequest;
import com.rafitj.mesh.io.dto.request.PatchDatabaseRequest;
import com.rafitj.mesh.io.dto.response.CreateDatabaseResponse;
import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.DatabaseRepo;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/database")
@CrossOrigin("http://localhost:3000")
public class DatabaseController {
    @Autowired
    DatabaseRepo databaseRepo;
    @Autowired
    ProjectRepo projectRepo;
    @Autowired
    ServerRepo serverRepo;

    @GetMapping("/{id}")
    private DatabaseEntity getDatabase(@PathVariable String id) {
        return databaseRepo.findById(id).orElse(null);
    }

    @PostMapping
    private CreateDatabaseResponse createDatabase(@RequestBody CreateDatabaseRequest createDatabaseRequest) throws Exception {
        String projectId = createDatabaseRequest.getProjectId();
        ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
        if (projectEntity != null) {
            ModelMapper modelMapper = new ModelMapper();
            DatabaseEntity databaseEntity = new DatabaseEntity();
            CreateDatabaseResponse databaseResponse = new CreateDatabaseResponse();
            databaseEntity.setType(ResourceType.DATABASE);
            modelMapper.map(createDatabaseRequest, databaseEntity);
            modelMapper.map(databaseEntity,databaseResponse);
//            databaseEntityProjection.setConnections(new ArrayList<>());
            ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(databaseEntity);
            projectEntity.addResource(resourceOfRelationshipEntity);
            projectRepo.save(projectEntity);
            return databaseResponse;
        }
        throw new Exception();
    }

    @DeleteMapping("/{id}")
    private String deleteDatabase(@PathVariable String id) {
        try {
            databaseRepo.deleteById(id);
            return "Success! Database has been deleted.";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
    }

    @PatchMapping("/{id}")
    private String updateDatabase(@RequestBody PatchDatabaseRequest patchDatabaseRequest, @PathVariable String id) {
        try {
            DatabaseEntity databaseEntity = new DatabaseEntity();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(patchDatabaseRequest,databaseEntity);
            databaseEntity.setId(id);
            databaseRepo.save(databaseEntity);
            return "Success! Database has been updated.";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
    }

    @PostMapping("/connect")
    private ConnectResourcesResponse connectServer(@RequestBody ConnectResourcesRequest connectResourcesRequest) throws Exception {
        DatabaseEntity databaseEntity = databaseRepo.findById(connectResourcesRequest.getResourceId()).orElse(null);
        ServerEntity serverEntity = serverRepo.findById(connectResourcesRequest.getServerId()).orElse(null);
        if (databaseEntity != null && serverEntity != null) {
            databaseEntity.addResourceConnection(new ConnectsRelationshipEntity(connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),serverEntity));
            serverEntity.addResourceConnection(new ConnectsRelationshipEntity(connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),databaseEntity));
            serverRepo.save(serverEntity);
            databaseRepo.save(databaseEntity);
            return new ConnectResourcesResponse(connectResourcesRequest.getResourceId(), connectResourcesRequest.getServerId());
        }
        throw new Exception();
    }

}
