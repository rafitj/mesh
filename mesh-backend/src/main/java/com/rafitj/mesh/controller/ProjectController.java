package com.rafitj.mesh.controller;

import com.rafitj.mesh.controller.projections.ResourceEntityProjection;
import com.rafitj.mesh.controller.projections.ResourceProjectionDTO;
import com.rafitj.mesh.io.dto.request.CreateProjectRequest;
import com.rafitj.mesh.io.dto.response.GetAllProjectsResponse;
import com.rafitj.mesh.io.dto.request.PatchProjectRequest;
import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.ClientRepo;
import com.rafitj.mesh.io.repos.DatabaseRepo;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/project")
@CrossOrigin("http://localhost:3000")
public class ProjectController {
    @Autowired
    ProjectRepo projectRepo;
    @Autowired
    ServerRepo serverRepo;
    @Autowired
    DatabaseRepo dbRepo;
    @Autowired
    ClientRepo clientRepo;

    @GetMapping("/all")
    private Collection<GetAllProjectsResponse> getProjects() {
        List<ProjectEntity> projectEntities = projectRepo.findAll();
        ModelMapper modelMapper = new ModelMapper();
        return projectEntities
                .stream()
                .map(source -> modelMapper.map(source, GetAllProjectsResponse.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    private Optional<ProjectEntity> getProjectById(@PathVariable String id) {
        return projectRepo.findById(id);
    }

    @GetMapping("/{id}/resources")
    private Collection<ResourceProjectionDTO> getProjectResourcesById(@PathVariable String id) {
        Collection<ResourceProjectionDTO> projectResources = new ArrayList<>();
        projectResources.addAll(serverRepo.getServersByProjectId(id));
        projectResources.addAll(clientRepo.getClientsByProjectId(id));
        projectResources.addAll(dbRepo.getDatabasesByProjectId(id));
        return projectResources;
    }

    @PostMapping
    private ProjectEntity createProject(@RequestBody CreateProjectRequest createProjectRequest) {
        ProjectEntity projectEntity = new ProjectEntity();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(createProjectRequest, projectEntity);
        projectRepo.save(projectEntity);
        return projectEntity;
    }

    @PatchMapping
    private ProjectEntity updateProject(@RequestBody PatchProjectRequest patchProjectRequest) throws Exception {
        Optional<ProjectEntity> projectEntity = projectRepo.findById(patchProjectRequest.getId());
        if (projectEntity.isPresent()) {
            ProjectEntity updatedProjectEntity = new ProjectEntity();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(patchProjectRequest, updatedProjectEntity);
            projectRepo.save(updatedProjectEntity);
            return updatedProjectEntity;
        }
        throw new Exception();
    }

    @DeleteMapping("/{id}")
    private String deleteProject(@PathVariable String id) {
        try {
            projectRepo.deleteById(id);
            return "Success! Project has been deleted.";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Something went wrong... Try again!";
        }
    }
}
