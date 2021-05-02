package com.rafitj.mesh.controller;

import com.rafitj.mesh.proto.request.CreateProjectRequest;
import com.rafitj.mesh.proto.response.GetAllProjectsResponse;
import com.rafitj.mesh.proto.request.PatchProjectRequest;
import com.rafitj.mesh.io.dto.shared.ProjectDTO;
import com.rafitj.mesh.io.dto.shared.ResourceDTO;
import com.rafitj.mesh.service.impl.ProjectServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
@CrossOrigin("http://localhost:3000")
public class ProjectController {
    private final ProjectServiceImpl projectService;

    public ProjectController(ProjectServiceImpl projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/all")
    private List<GetAllProjectsResponse> getProjects() {
       return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    private ProjectDTO getProjectById(@PathVariable String id) {
        return projectService.getProjectById(id);
    }

    @GetMapping("/{id}/resources")
    private List<ResourceDTO> getProjectResourcesById(@PathVariable String id) {
        return projectService.getProjectResources(id);
    }

    @PostMapping
    private ProjectDTO createProject(@RequestBody CreateProjectRequest createProjectRequest) {
        return projectService.createProject(createProjectRequest);
    }

    @PatchMapping
    private ProjectDTO updateProject(@RequestBody PatchProjectRequest patchProjectRequest) {
        return projectService.updateProject(patchProjectRequest);
    }

    @DeleteMapping("/{id}")
    private String deleteProject(@PathVariable String id) {
        return projectService.deleteProject(id);
    }
}
