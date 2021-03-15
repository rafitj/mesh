package com.rafitj.mesh.io.seeders;

import com.rafitj.mesh.io.entities.ClientEntity;
import com.rafitj.mesh.io.entities.DatabaseEntity;
import com.rafitj.mesh.io.entities.ServerEntity;
import com.rafitj.mesh.io.repos.ClientRepo;
import com.rafitj.mesh.io.repos.DatabaseRepo;
import com.rafitj.mesh.io.repos.ServerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ResourceSeeder implements CommandLineRunner {
    @Autowired
    private ServerRepo serverRepo;
    @Autowired
    private ClientRepo clientRepo ;
    @Autowired
    private DatabaseRepo dbRepo;

    @Override
    public void run(String... args) throws Exception {
        ServerEntity server = new ServerEntity("gxLarge");
        ServerEntity server2 = new ServerEntity("gxMed");
        ServerEntity server3 = new ServerEntity("mxSmall");
        ClientEntity client1 = new ClientEntity(1000, 50);
        DatabaseEntity db1 = new DatabaseEntity("Postgres", List.of("Users", "Notes"));
        server.setResources(List.of(server2,server3,db1));
        server2.setResources(List.of(server,server3,db1));
        server3.setResources(List.of(client1));
        serverRepo.deleteAll();
        clientRepo.deleteAll();
        dbRepo.deleteAll();
        serverRepo.saveAll(List.of(server,server2,server3));
        dbRepo.save(db1);
        clientRepo.save(client1);
    }

}
