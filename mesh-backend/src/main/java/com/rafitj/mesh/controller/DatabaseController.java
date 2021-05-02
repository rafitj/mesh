package com.rafitj.mesh.controller;

import com.rafitj.mesh.proto.request.ConnectResourcesRequest;
import com.rafitj.mesh.proto.request.CreateDatabaseRequest;
import com.rafitj.mesh.proto.request.PatchDatabaseRequest;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;
import com.rafitj.mesh.io.dto.shared.DatabaseDTO;
import com.rafitj.mesh.service.intf.DatabaseService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/database")
@CrossOrigin("http://localhost:3000")
public class DatabaseController {
    private final DatabaseService databaseService;

    public DatabaseController(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }

    @GetMapping("/{id}")
    private DatabaseDTO getDatabase(@PathVariable String id) {
        return databaseService.getDatabaseById(id);
    }

    @PostMapping
    private DatabaseDTO createDatabase(@RequestBody CreateDatabaseRequest createDatabaseRequest) {
        return databaseService.createDatabase(createDatabaseRequest);
    }

    @DeleteMapping("/{id}")
    private String deleteDatabase(@PathVariable String id) {
       return databaseService.deleteDatabase(id);
    }

    @PatchMapping("/{id}")
    private DatabaseDTO updateDatabase(@RequestBody PatchDatabaseRequest patchDatabaseRequest, @PathVariable String id) {
        return databaseService.updateDatabase(patchDatabaseRequest, id);
    }

    @PostMapping("/connect")
    private ConnectionDTO connectServer(@RequestBody ConnectResourcesRequest connectResourcesRequest) {
        return databaseService.connectDatabase(connectResourcesRequest);
    }

}
