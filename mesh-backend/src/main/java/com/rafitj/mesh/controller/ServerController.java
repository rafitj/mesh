package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.dto.CreateServerDTO;
import com.rafitj.mesh.io.dto.PatchServerDTO;
import com.rafitj.mesh.io.entities.ProjectEntity;
import com.rafitj.mesh.io.entities.ResourceOfRelationshipEntity;
import com.rafitj.mesh.io.entities.ServerEntity;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/server")
@CrossOrigin("http://localhost:3000")
public class ServerController {
    @Autowired
    ServerRepo serverRepo;
    @Autowired
    ProjectRepo projectRepo;

    @GetMapping("/{id}")
    private ServerEntity getServer(@PathVariable String id) {
        return serverRepo.findById(id).orElse(null);
    }

    @PostMapping
    private ServerEntity createServer(@RequestBody CreateServerDTO createServerDTO) throws Exception {
        String projectId = createServerDTO.getProjectId();
        ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
        if (projectEntity != null) {
            ModelMapper modelMapper = new ModelMapper();
            ServerEntity serverEntity = new ServerEntity();
            modelMapper.map(createServerDTO,serverEntity);
            ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(serverEntity);
            projectEntity.addResource(resourceOfRelationshipEntity);
            projectRepo.save(projectEntity);
            return serverEntity;
        }
        throw new Exception();
    }

    @DeleteMapping("/{id}")
    private String deleteServer(@PathVariable String id) {
        try {
            serverRepo.deleteById(id);
            return "Success! Server has been deleted.";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
    }

    @PatchMapping("/{id}")
    private String updateServer(@RequestBody PatchServerDTO patchServerDTO, @PathVariable String id) {
        try {
            ServerEntity serverEntity = new ServerEntity();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(patchServerDTO,serverEntity);
            serverEntity.setId(id);
            serverRepo.save(serverEntity);
            return "Success! Server has been updated.";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
    }
}
