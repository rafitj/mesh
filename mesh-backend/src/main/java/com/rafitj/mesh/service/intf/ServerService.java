package com.rafitj.mesh.service.intf;

import com.rafitj.mesh.proto.request.ConnectResourcesRequest;
import com.rafitj.mesh.proto.request.CreateServerRequest;
import com.rafitj.mesh.proto.request.PatchServerRequest;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;
import com.rafitj.mesh.io.dto.shared.ServerDTO;

import java.util.List;

public interface ServerService {
    ServerDTO getServerById(String serverId);
    List<ServerDTO> getServersByProjectId(String projectId);
    ServerDTO createServer(CreateServerRequest createServerRequest);
    String deleteServer(String id);
    ServerDTO updateServer(PatchServerRequest patchServerRequest, String id);
    ServerDTO duplicateServer(String id);
    ConnectionDTO connectServer(ConnectResourcesRequest connectResourcesRequest);
}
