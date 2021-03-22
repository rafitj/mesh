package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.controller.projections.ServerEntityProjection;
import com.rafitj.mesh.io.entities.ServerEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface ServerRepo extends Neo4jRepository<ServerEntity, String> {
    @Query("MATCH (n:Server) OPTIONAL MATCH (n)-[r:CONNECTS]->(m) " +
            "WHERE exists((n)-[:RESOURCE_OF]->(:Project {id: $id})) RETURN n, collect(m.id) as connections")
    Collection<ServerEntityProjection> getServersByProjectId(String id);
}
