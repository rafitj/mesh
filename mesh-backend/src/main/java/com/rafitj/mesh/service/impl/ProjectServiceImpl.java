package com.rafitj.mesh.service.impl;

import com.rafitj.mesh.proto.request.CreateProjectRequest;
import com.rafitj.mesh.proto.request.PatchProjectRequest;
import com.rafitj.mesh.proto.response.GetAllProjectsResponse;
import com.rafitj.mesh.io.dto.shared.ProjectDTO;
import com.rafitj.mesh.io.dto.shared.ResourceDTO;
import com.rafitj.mesh.io.entities.ProjectEntity;
import com.rafitj.mesh.io.repos.ProjectRepo;
import com.rafitj.mesh.service.intf.ClientService;
import com.rafitj.mesh.service.intf.DatabaseService;
import com.rafitj.mesh.service.intf.ProjectService;
import com.rafitj.mesh.service.intf.ServerService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final  ProjectRepo projectRepo;
    private final  ServerService serverService;
    private final ClientService clientService;
    private final DatabaseService databaseService;

    public ProjectServiceImpl(ProjectRepo projectRepo, ServerService serverService, ClientService clientService,
                              DatabaseService databaseService) {
        this.projectRepo = projectRepo;
        this.serverService = serverService;
        this.clientService = clientService;
        this.databaseService = databaseService;
    }

    @Override
    public List<GetAllProjectsResponse> getAllProjects() {
        List<ProjectEntity> projectEntities = projectRepo.findAll();
        ModelMapper modelMapper = new ModelMapper();
        return projectEntities
                .stream()
                .map(source -> modelMapper.map(source, GetAllProjectsResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProjectDTO getProjectById(String id) {
        Optional<ProjectEntity> projectEntity = projectRepo.findById(id);
        if (projectEntity.isPresent()) {
            ProjectDTO projectDTO = new ProjectDTO();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(projectEntity,projectDTO);
            return projectDTO;
        }
        return null;
    }

    @Override
    public List<ResourceDTO> getProjectResources(String id) {
        List<ResourceDTO> projectResources = new ArrayList<>();
        projectResources.addAll(serverService.getServersByProjectId(id));
        projectResources.addAll(clientService.getClientsByProjectId(id));
        projectResources.addAll(databaseService.getDatabasesByProjectId(id));
        return projectResources;
    }

    @Override
    public ProjectDTO createProject(CreateProjectRequest createProjectRequest) {
        ProjectEntity projectEntity = new ProjectEntity();
        ProjectDTO projectDTO = new ProjectDTO();
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.map(createProjectRequest, projectEntity);
        modelMapper.map(projectEntity, projectDTO);
        projectRepo.save(projectEntity);
        return projectDTO;
    }

    @Override
    public String deleteProject(String id) {
        try {
            projectRepo.deleteById(id);
            return "Success! Project has been deleted.";
        } catch (Exception e) {
            return "Something went wrong... Try again!";
        }
    }

    @Override
    public ProjectDTO updateProject(PatchProjectRequest patchProjectRequest) {
        Optional<ProjectEntity> projectEntity = projectRepo.findById(patchProjectRequest.getId());
        if (projectEntity.isPresent()) {
            ProjectEntity updatedProjectEntity = new ProjectEntity();
            ProjectDTO projectDTO = new ProjectDTO();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.map(patchProjectRequest, updatedProjectEntity);
            modelMapper.map(updatedProjectEntity, projectDTO);
            projectRepo.save(updatedProjectEntity);
            return projectDTO;
        }
        return null;
    }
}
