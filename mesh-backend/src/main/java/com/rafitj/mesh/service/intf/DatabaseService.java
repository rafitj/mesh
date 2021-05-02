package com.rafitj.mesh.service.intf;

import com.rafitj.mesh.proto.request.ConnectResourcesRequest;
import com.rafitj.mesh.proto.request.CreateDatabaseRequest;
import com.rafitj.mesh.proto.request.PatchDatabaseRequest;
import com.rafitj.mesh.io.dto.shared.DatabaseDTO;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;

import java.util.List;

public interface DatabaseService {
    DatabaseDTO getDatabaseById(String databaseId);
    List<DatabaseDTO> getDatabasesByProjectId(String projectId);
    DatabaseDTO createDatabase(CreateDatabaseRequest createDatabaseRequest);
    String deleteDatabase(String id);
    DatabaseDTO updateDatabase(PatchDatabaseRequest patchDatabaseRequest, String id);
    DatabaseDTO duplicateDatabase(String id);
    ConnectionDTO connectDatabase(ConnectResourcesRequest connectResourcesRequest);
}
