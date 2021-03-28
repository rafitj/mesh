package com.rafitj.mesh.controller;

import com.rafitj.mesh.controller.projections.ServerEntityProjection;
import com.rafitj.mesh.io.dto.ConnectResourcesDTO;
import com.rafitj.mesh.io.dto.ConnectResourcesResponseDTO;
import com.rafitj.mesh.io.dto.CreateServerDTO;
import com.rafitj.mesh.io.dto.PatchServerDTO;
import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    private ServerEntityProjection createServer(@RequestBody CreateServerDTO createServerDTO) throws Exception {
        String projectId = createServerDTO.getProjectId();
        ProjectEntity projectEntity = projectRepo.findById(projectId).orElse(null);
        if (projectEntity != null) {
            ModelMapper modelMapper = new ModelMapper();
            ServerEntity serverEntity = new ServerEntity();
            ServerEntityProjection serverEntityProjection = new ServerEntityProjection();
            modelMapper.map(createServerDTO,serverEntity);
            serverEntity.setType(ResourceType.SERVER);
            modelMapper.map(serverEntity,serverEntityProjection);
            serverEntityProjection.setConnections(new ArrayList<>());
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
    private String updateServer(@RequestBody PatchServerDTO patchServerDTO, @PathVariable String id) {
        try {
            Optional<ServerEntity> serverEntity = serverRepo.findById(id);
            if (serverEntity.isPresent()) {
                ServerEntity newServerEntity = new ServerEntity();
                ModelMapper modelMapper = new ModelMapper();
                modelMapper.map(patchServerDTO,serverEntity);
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
    private ConnectResourcesResponseDTO connectServer(@RequestBody ConnectResourcesDTO connectResourcesDTO) throws Exception {
        ServerEntity serverEntityA = serverRepo.findById(connectResourcesDTO.getResourceId()).orElse(null);
        ServerEntity serverEntityB = serverRepo.findById(connectResourcesDTO.getServerId()).orElse(null);
        if ( serverEntityA != null && serverEntityB != null) {
            ConnectsRelationshipEntity relationshipEntityA = new ConnectsRelationshipEntity(connectResourcesDTO.getLatency(),serverEntityA);
            ConnectsRelationshipEntity relationshipEntityB = new ConnectsRelationshipEntity(connectResourcesDTO.getLatency(),serverEntityB);
            serverEntityA.addResourceConnection(relationshipEntityB);
            serverEntityB.addResourceConnection(relationshipEntityA);
            serverRepo.saveAll(List.of(serverEntityA,serverEntityB));
            return new ConnectResourcesResponseDTO(connectResourcesDTO.getResourceId(), connectResourcesDTO.getServerId());
        }
        throw new Exception();
    }

}
