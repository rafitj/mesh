package com.rafitj.mesh.controller;

import com.rafitj.mesh.proto.request.ConnectResourcesRequest;
import com.rafitj.mesh.proto.request.CreateClientRequest;
import com.rafitj.mesh.proto.request.PatchClientRequest;
import com.rafitj.mesh.io.dto.shared.ClientDTO;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;
import com.rafitj.mesh.service.impl.ClientServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client")
@CrossOrigin("http://localhost:3000")
public class ClientController {
    private final ClientServiceImpl clientService;

    public ClientController(ClientServiceImpl clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/{id}")
    private ClientDTO getClient(@PathVariable String id) {
        return clientService.getClientById(id);
    }

    @PostMapping
    private ClientDTO createClient(@RequestBody CreateClientRequest createClientRequest)  {
        return clientService.createClient(createClientRequest);
    }

    @DeleteMapping("/{id}")
    private String deleteClient(@PathVariable String id) {
        return clientService.deleteClient(id);
    }

    @PatchMapping("/{id}")
    private ClientDTO updateClient(@RequestBody PatchClientRequest patchClientRequest, @PathVariable String id) {
        return clientService.updateClient(patchClientRequest, id);
    }

    @PostMapping("/connect")
    private ConnectionDTO connectServer(@RequestBody ConnectResourcesRequest connectResourcesRequest) {
        return clientService.connectClient(connectResourcesRequest);
    }

}
