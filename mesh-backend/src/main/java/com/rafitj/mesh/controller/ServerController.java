package com.rafitj.mesh.controller;

import com.rafitj.mesh.proto.request.ConnectResourcesRequest;
import com.rafitj.mesh.proto.request.CreateServerRequest;
import com.rafitj.mesh.proto.request.PatchServerRequest;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;
import com.rafitj.mesh.io.dto.shared.ServerDTO;
import com.rafitj.mesh.service.impl.ServerServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/server")
@CrossOrigin("http://localhost:3000")
public class ServerController {
    private final ServerServiceImpl serverService;

    public ServerController(ServerServiceImpl serverService) {
        this.serverService = serverService;
    }

    @GetMapping("/{id}")
    private ServerDTO getServer(@PathVariable String id) {
        return serverService.getServerById(id);
    }

    @PostMapping
    private ServerDTO createServer(@RequestBody CreateServerRequest createServerRequest) {
        return serverService.createServer(createServerRequest);
    }

    @DeleteMapping("/{id}")
    private String deleteServer(@PathVariable String id) {
        return serverService.deleteServer(id);
    }

    @PatchMapping("/{id}")
    private ServerDTO updateServer(@RequestBody PatchServerRequest patchServerRequest, @PathVariable String id) {
        return serverService.updateServer(patchServerRequest, id);
    }

    @PostMapping("/{id}/duplicate")
    private ServerDTO duplicateServer(@PathVariable String id)  {
        return serverService.duplicateServer(id);
    }

    @PostMapping("/connect")
    private ConnectionDTO connectServer(@RequestBody ConnectResourcesRequest connectResourcesRequest) {
        return serverService.connectServer(connectResourcesRequest);
    }

}
