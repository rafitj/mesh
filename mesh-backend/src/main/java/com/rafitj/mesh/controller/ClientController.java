package com.rafitj.mesh.controller;

import com.rafitj.mesh.controller.projections.ClientEntityProjection;
import com.rafitj.mesh.io.dto.*;
import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.ClientRepo;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/client")
@CrossOrigin("http://localhost:3000")
public class ClientController {
    @Autowired
    ClientRepo clientRepo;
    @Autowired
    ProjectRepo projectRepo;
    @Autowired
    ServerRepo serverRepo;

    @GetMapping("/{id}")
    private ClientEntity getClient(@PathVariable String id) {
        return clientRepo.findById(id).orElse(null);
    }

    @PostMapping
    private ClientEntityProjection createClient(@RequestBody CreateClientDTO createClientDTO) throws Exception {
        String projectId = createClientDTO.getProjectId();
        ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
        if (projectEntity != null) {
            ModelMapper modelMapper = new ModelMapper();
            ClientEntity clientEntity = new ClientEntity();
            ClientEntityProjection clientEntityProjection = new ClientEntityProjection();
            modelMapper.map(createClientDTO, clientEntity);
            clientEntity.setType(ResourceType.CLIENT);
            modelMapper.map(clientEntity,clientEntityProjection);
            clientEntityProjection.setConnections(new ArrayList<>());
            ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(clientEntity);
            projectEntity.addResource(resourceOfRelationshipEntity);
            projectRepo.save(projectEntity);
            return clientEntityProjection;
        }
        throw new Exception();
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

    @PostMapping("/connect")
    private ConnectResourcesResponseDTO connectServer(@RequestBody ConnectResourcesDTO connectResourcesDTO) throws Exception {
        ClientEntity clientEntity = clientRepo.findById(connectResourcesDTO.getResourceId()).orElse(null);
        ServerEntity serverEntity = serverRepo.findById(connectResourcesDTO.getServerId()).orElse(null);
        if (clientEntity != null && serverEntity != null) {
            clientEntity.addResourceConnection(new ConnectsRelationshipEntity(connectResourcesDTO.getLatency(),serverEntity));
            serverEntity.addResourceConnection(new ConnectsRelationshipEntity(connectResourcesDTO.getLatency(),clientEntity));
            serverRepo.save(serverEntity);
            clientRepo.save(clientEntity);
            return new ConnectResourcesResponseDTO(connectResourcesDTO.getResourceId(), connectResourcesDTO.getServerId());
        }
        throw new Exception();
    }

}
