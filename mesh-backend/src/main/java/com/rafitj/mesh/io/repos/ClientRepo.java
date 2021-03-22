package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.controller.ClientEntityProjection;
import com.rafitj.mesh.controller.ServerEntityProjection;
import com.rafitj.mesh.io.entities.ClientEntity;
import com.rafitj.mesh.io.entities.ResourceEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface ClientRepo extends Neo4jRepository<ClientEntity, String> {
    @Query("MATCH (n:Client) OPTIONAL MATCH (n)-[r:CONNECTS]->(m) " +
            "WHERE exists((n)-[:RESOURCE_OF]->(:Project {id: $id})) RETURN n, collect(m.id) as connections")
    Collection<ClientEntityProjection> getClientsByProjectId(String id);
}
