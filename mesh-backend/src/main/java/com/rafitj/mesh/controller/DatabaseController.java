package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.dto.CreateDatabaseDTO;
import com.rafitj.mesh.io.dto.PatchDatabaseDTO;
import com.rafitj.mesh.io.entities.DatabaseEntity;
import com.rafitj.mesh.io.entities.ProjectEntity;
import com.rafitj.mesh.io.entities.ResourceOfRelationshipEntity;
import com.rafitj.mesh.io.repos.DatabaseRepo;
import com.rafitj.mesh.io.repos.ProjectRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/database")
@CrossOrigin("http://localhost:3000")
public class DatabaseController {
    @Autowired
    DatabaseRepo databaseRepo;
    @Autowired
    ProjectRepo projectRepo;

    @GetMapping("/{id}")
    private DatabaseEntity getDatabase(@PathVariable String id) {
        return databaseRepo.findById(id).orElse(null);
    }

    @PostMapping("/")
    private String createDatabase(@RequestBody CreateDatabaseDTO createDatabaseDTO) {
        try {
            String projectId = createDatabaseDTO.getProjectId();
            ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
            if (projectEntity != null) {
                ModelMapper modelMapper = new ModelMapper();
                DatabaseEntity databaseEntity = new DatabaseEntity();
                modelMapper.map(createDatabaseDTO, databaseEntity);
                ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(databaseEntity);
                projectEntity.addResource(resourceOfRelationshipEntity);
                projectRepo.save(projectEntity);
                return String.format("Success! Database %s has been added.", databaseEntity.getLabel());
            }
            return "Project not found... Try again!";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
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
}
