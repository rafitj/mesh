package com.rafitj.mesh.io.seeders;

import com.rafitj.mesh.io.entities.*;
import com.rafitj.mesh.io.repos.ClientRepo;
import com.rafitj.mesh.io.repos.DatabaseRepo;
import com.rafitj.mesh.io.repos.ProjectRepo;
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
    @Autowired
    private ProjectRepo projectRepo;

    @Override
    public void run(String... args) throws Exception {
        ServerEntity server = new ServerEntity("main server","gxLarge");
        ServerEntity server2 = new ServerEntity("analytics server","gxMed");
        ServerEntity server3 = new ServerEntity("client server","mxSmall");
        ClientEntity client1 = new ClientEntity("web portal",1000, 75);
        ClientEntity client2 = new ClientEntity("ios app",500, 50);
        ClientEntity client3 = new ClientEntity("android app",250, 50);
        DatabaseEntity db1 = new DatabaseEntity( "user db","Postgres", List.of("Users", "Notes"));
        ConnectsRelationshipEntity connection = new ConnectsRelationshipEntity(1, 10, server2);
        ConnectsRelationshipEntity connection1 = new ConnectsRelationshipEntity(2, 10, server3);
        ConnectsRelationshipEntity connection2 = new ConnectsRelationshipEntity(10, 20, db1);
        server.setConnections(List.of(connection,connection2,connection1));
        ConnectsRelationshipEntity connection3 = new ConnectsRelationshipEntity(1, 5, client1);
        ConnectsRelationshipEntity connection4 = new ConnectsRelationshipEntity(5, 15, client2);
        ConnectsRelationshipEntity connection5 = new ConnectsRelationshipEntity(5, 15, client3);
        server3.setConnections(List.of(connection3,connection4,connection5));
        ResourceOfRelationshipEntity r1 = new ResourceOfRelationshipEntity(server);
        ResourceOfRelationshipEntity r2 = new ResourceOfRelationshipEntity(server2);
        ResourceOfRelationshipEntity r3 = new ResourceOfRelationshipEntity(server3);
        ResourceOfRelationshipEntity r4 = new ResourceOfRelationshipEntity(client1);
        ResourceOfRelationshipEntity r5 = new ResourceOfRelationshipEntity(db1);
        ResourceOfRelationshipEntity r6 = new ResourceOfRelationshipEntity(client2);
        ResourceOfRelationshipEntity r7 = new ResourceOfRelationshipEntity(client3);
        ProjectEntity proj1 = new ProjectEntity("First Project", 10000, List.of(r1,r2,r3,r4,r5,r6,r7));
        proj1.setId("69");
        proj1.setPublic(true);
        serverRepo.deleteAll();
        clientRepo.deleteAll();
        dbRepo.deleteAll();
        projectRepo.deleteAll();
        projectRepo.save(proj1);
        System.out.println("SEEDED RESOURCES");
    }

}
