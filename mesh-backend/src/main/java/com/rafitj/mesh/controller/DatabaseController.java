package com.rafitj.mesh.controller;

import com.rafitj.mesh.controller.projections.DatabaseEntityProjection;
import com.rafitj.mesh.io.dto.ConnectResourcesDTO;
import com.rafitj.mesh.io.dto.ConnectResourcesResponseDTO;
import com.rafitj.mesh.io.dto.CreateDatabaseDTO;
import com.rafitj.mesh.io.dto.PatchDatabaseDTO;
import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.DatabaseRepo;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.List;

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
    private DatabaseEntityProjection createDatabase(@RequestBody CreateDatabaseDTO createDatabaseDTO) throws Exception {
        String projectId = createDatabaseDTO.getProjectId();
        ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
        if (projectEntity != null) {
            ModelMapper modelMapper = new ModelMapper();
            DatabaseEntity databaseEntity = new DatabaseEntity();
            DatabaseEntityProjection databaseEntityProjection = new DatabaseEntityProjection();
            databaseEntity.setType(ResourceType.DATABASE);
            modelMapper.map(createDatabaseDTO, databaseEntity);
            modelMapper.map(databaseEntity,databaseEntityProjection);
            databaseEntityProjection.setConnections(new ArrayList<>());
            ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(databaseEntity);
            projectEntity.addResource(resourceOfRelationshipEntity);
            projectRepo.save(projectEntity);
            return databaseEntityProjection;
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
    private String updateDatabase(@RequestBody PatchDatabaseDTO patchDatabaseDTO, @PathVariable String id) {
        try {
            DatabaseEntity databaseEntity = new DatabaseEntity();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(patchDatabaseDTO,databaseEntity);
            databaseEntity.setId(id);
            databaseRepo.save(databaseEntity);
            return "Success! Database has been updated.";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
    }

    @PostMapping("/connect")
    private ConnectResourcesResponseDTO connectServer(@RequestBody ConnectResourcesDTO connectResourcesDTO) throws Exception {
        DatabaseEntity databaseEntity = databaseRepo.findById(connectResourcesDTO.getResourceId()).orElse(null);
        ServerEntity serverEntity = serverRepo.findById(connectResourcesDTO.getServerId()).orElse(null);
        if (databaseEntity != null && serverEntity != null) {
            databaseEntity.addResourceConnection(new ConnectsRelationshipEntity(connectResourcesDTO.getLatency(),serverEntity));
            serverEntity.addResourceConnection(new ConnectsRelationshipEntity(connectResourcesDTO.getLatency(),databaseEntity));
            serverRepo.save(serverEntity);
            databaseRepo.save(databaseEntity);
            return new ConnectResourcesResponseDTO(connectResourcesDTO.getResourceId(), connectResourcesDTO.getServerId());
        }
        throw new Exception();
    }

}
