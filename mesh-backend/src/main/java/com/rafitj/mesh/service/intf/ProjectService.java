package com.rafitj.mesh.service.intf;


import com.rafitj.mesh.proto.request.CreateProjectRequest;
import com.rafitj.mesh.proto.request.PatchProjectRequest;
import com.rafitj.mesh.proto.response.GetAllProjectsResponse;
import com.rafitj.mesh.io.dto.shared.ProjectDTO;
import com.rafitj.mesh.io.dto.shared.ResourceDTO;

import java.util.List;

public interface ProjectService {
    List<GetAllProjectsResponse> getAllProjectsByUserId(String id);
    ProjectDTO getProjectById(String id);
    List<ResourceDTO> getProjectResources(String id);
    ProjectDTO createProject(CreateProjectRequest createProjectRequest);
    String deleteProject(String id);
    ProjectDTO updateProject(PatchProjectRequest patchProjectRequest, String id);
}
