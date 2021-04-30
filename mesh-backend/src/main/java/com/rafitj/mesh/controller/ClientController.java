package com.rafitj.mesh.controller;

import com.rafitj.mesh.controller.projections.ClientEntityProjection;
import com.rafitj.mesh.io.dto.request.ConnectResourcesRequest;
import com.rafitj.mesh.io.dto.response.ConnectResourcesResponse;
import com.rafitj.mesh.io.dto.request.CreateClientRequest;
import com.rafitj.mesh.io.dto.request.PatchClientRequest;
import com.rafitj.mesh.io.dto.response.CreateClientResponse;
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
    private CreateClientResponse createClient(@RequestBody CreateClientRequest createClientRequest) throws Exception {
        String projectId = createClientRequest.getProjectId();
        ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
        if (projectEntity != null) {
            ModelMapper modelMapper = new ModelMapper();
            ClientEntity clientEntity = new ClientEntity();
            CreateClientResponse clientResponse = new CreateClientResponse();
            modelMapper.map(createClientRequest, clientEntity);
            clientEntity.setType(ResourceType.CLIENT);
            modelMapper.map(clientEntity,clientResponse);
            clientResponse.setConnections(new ArrayList<>());
            ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(clientEntity);
            projectEntity.addResource(resourceOfRelationshipEntity);
            projectRepo.save(projectEntity);
            return clientResponse;
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
    private String updateClient(@RequestBody PatchClientRequest patchClientRequest, @PathVariable String id) {
        try {
            ClientEntity clientEntity = new ClientEntity();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(patchClientRequest,clientEntity);
            clientEntity.setId(id);
            clientRepo.save(clientEntity);
            return "Success! Client has been updated.";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
    }

    @PostMapping("/connect")
    private ConnectResourcesResponse connectServer(@RequestBody ConnectResourcesRequest connectResourcesRequest) throws Exception {
        ClientEntity clientEntity = clientRepo.findById(connectResourcesRequest.getResourceId()).orElse(null);
        ServerEntity serverEntity = serverRepo.findById(connectResourcesRequest.getServerId()).orElse(null);
        if (clientEntity != null && serverEntity != null) {
            clientEntity.addResourceConnection(new ConnectsRelationshipEntity(connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(), serverEntity));
            serverEntity.addResourceConnection(new ConnectsRelationshipEntity(connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(), clientEntity));
            serverRepo.save(serverEntity);
            clientRepo.save(clientEntity);
            return new ConnectResourcesResponse(connectResourcesRequest.getResourceId(), connectResourcesRequest.getServerId());
        }
        throw new Exception();
    }

}
