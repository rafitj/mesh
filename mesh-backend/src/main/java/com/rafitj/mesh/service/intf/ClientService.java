package com.rafitj.mesh.service.intf;

import com.rafitj.mesh.proto.request.*;
import com.rafitj.mesh.io.dto.shared.ClientDTO;
import com.rafitj.mesh.io.dto.shared.ConnectionDTO;

import java.util.List;

public interface ClientService {
    ClientDTO getClientById(String clientId);
    List<ClientDTO> getClientsByProjectId(String projectId);
    ClientDTO createClient(CreateClientRequest createClientRequest);
    String deleteClient(String id);
    ClientDTO updateClient(PatchClientRequest patchClientRequest, String id);
    ClientDTO duplicateClient(String id);
    ConnectionDTO connectClient(ConnectResourcesRequest connectResourcesRequest);
}
