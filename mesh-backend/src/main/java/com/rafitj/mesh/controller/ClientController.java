package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.dto.CreateClientDTO;
import com.rafitj.mesh.io.dto.PatchClientDTO;
import com.rafitj.mesh.io.entities.ClientEntity;
import com.rafitj.mesh.io.entities.ProjectEntity;
import com.rafitj.mesh.io.entities.ResourceOfRelationshipEntity;
import com.rafitj.mesh.io.repos.ClientRepo;
import com.rafitj.mesh.io.repos.ProjectRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
@CrossOrigin("http://localhost:3000")
public class ClientController {
    @Autowired
    ClientRepo clientRepo;
    @Autowired
    ProjectRepo projectRepo;

    @GetMapping("/{id}")
    private ClientEntity getClient(@PathVariable String id) {
        return clientRepo.findById(id).orElse(null);
    }

    @PostMapping("/")
    private String createClient(@RequestBody CreateClientDTO createClientDTO) {
        try {
            String projectId = createClientDTO.getProjectId();
            ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
            if (projectEntity != null) {
                ModelMapper modelMapper = new ModelMapper();
                ClientEntity clientEntity = new ClientEntity();
                modelMapper.map(createClientDTO, clientEntity);
                ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(clientEntity);
                projectEntity.addResource(resourceOfRelationshipEntity);
                projectRepo.save(projectEntity);
                return String.format("Success! Client %s has been added.", clientEntity.getLabel());
            }
            return "Project not found... Try again!";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
    }

    @DeleteMapping("/{id}")
    private String deleteClient(@PathVariable String id) {
        try {
            clientRepo.deleteById(id);
            return "Success! Client has been deleted.";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
    }

    @PatchMapping("/{id}")
    private String updateClient(@RequestBody PatchClientDTO patchClientDTO, @PathVariable String id) {
        try {
            ClientEntity clientEntity = new ClientEntity();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(patchClientDTO,clientEntity);
            clientEntity.setId(id);
            clientRepo.save(clientEntity);
            return "Success! Client has been updated.";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
    }
}
