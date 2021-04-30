package com.rafitj.mesh.controller;

import com.rafitj.mesh.controller.projections.ServerEntityProjection;
import com.rafitj.mesh.io.dto.request.ConnectResourcesRequest;
import com.rafitj.mesh.io.dto.response.ConnectResourcesResponse;
import com.rafitj.mesh.io.dto.request.CreateServerRequest;
import com.rafitj.mesh.io.dto.request.PatchServerRequest;
import com.rafitj.mesh.io.dto.response.CreateServerResponse;
import com.rafitj.mesh.io.dto.response.GetAllProjectsResponse;
import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

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
    private CreateServerResponse createServer(@RequestBody CreateServerRequest createServerRequest) throws Exception {
        String projectId = createServerRequest.getProjectId();
        ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
        if (projectEntity != null) {
            ModelMapper modelMapper = new ModelMapper();
            ServerEntity serverEntity = new ServerEntity();
            CreateServerResponse serverEntityProjection = new CreateServerResponse();
            modelMapper.map(createServerRequest,serverEntity);
            serverEntity.setType(ResourceType.SERVER);
            modelMapper.map(serverEntity,serverEntityProjection);
//            serverEntityProjection.setConnections(new ArrayList<>());
            ResourceOfRelationshipEntity resourceOfRelationshipEntity = new ResourceOfRelationshipEntity(serverEntity);
            projectEntity.addResource(resourceOfRelationshipEntity);
            projectRepo.save(projectEntity);
            return serverEntityProjection;
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
    private String updateServer(@RequestBody PatchServerRequest patchServerRequest, @PathVariable String id) {
        try {
            Optional<ServerEntity> serverEntity = serverRepo.findById(id);
            if (serverEntity.isPresent()) {
                ServerEntity newServerEntity = new ServerEntity();
                ModelMapper modelMapper = new ModelMapper();
                modelMapper.map(patchServerRequest,serverEntity);
                serverRepo.save(newServerEntity);
                return "Success! Server has been updated.";
            }
            return "Something went wrong... Server not found!";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
    }

    @PostMapping("/{id}/duplicate")
    private ServerEntity duplicateServer(@PathVariable String id) throws Exception {
        Optional<ServerEntity> serverEntity = serverRepo.findById(id);
        if (serverEntity.isPresent()) {
            ServerEntity newServerEntity = new ServerEntity();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(serverEntity,newServerEntity);
            serverRepo.save(newServerEntity);
            return newServerEntity;
        }
        throw new Exception();
    }


    @PostMapping("/connect")
    private ConnectResourcesResponse connectServer(@RequestBody ConnectResourcesRequest connectResourcesRequest) throws Exception {
        ServerEntity serverEntityA = serverRepo.findById(connectResourcesRequest.getResourceId()).orElse(null);
        ServerEntity serverEntityB = serverRepo.findById(connectResourcesRequest.getServerId()).orElse(null);
        if (serverEntityA != null && serverEntityB != null) {
            ConnectsRelationshipEntity relationshipEntityA = new ConnectsRelationshipEntity(connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),serverEntityA);
            ConnectsRelationshipEntity relationshipEntityB = new ConnectsRelationshipEntity(connectResourcesRequest.getLatency(), connectResourcesRequest.getFrequency(),serverEntityB);
            serverEntityA.addResourceConnection(relationshipEntityB);
            serverEntityB.addResourceConnection(relationshipEntityA);
            serverRepo.saveAll(List.of(serverEntityA,serverEntityB));
            return new ConnectResourcesResponse(connectResourcesRequest.getResourceId(), connectResourcesRequest.getServerId());
        }
        throw new Exception();
    }

    @GetMapping("/test")
    private List<CreateServerResponse> connectServer() throws Exception {
        List<ServerEntityProjection> serverEntityProjections = serverRepo.getServersByProjectId("69");
        System.out.println(serverEntityProjections.get(0).getConnections());
        System.out.println(serverEntityProjections.get(1).getConnections());
        System.out.println(serverEntityProjections.get(2).getConnections());
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return serverEntityProjections
                .stream()
                .map(source -> modelMapper.map(source, CreateServerResponse.class))
                .collect(Collectors.toList());
    }

}
