package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.controller.projections.DatabaseEntityProjection;
import com.rafitj.mesh.io.entities.DatabaseEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface DatabaseRepo extends Neo4jRepository<DatabaseEntity, String> {
    @Query("MATCH (n:Database) WHERE exists((n)-[:RESOURCE_OF]->(:Project {id: $id})) " +
            "OPTIONAL MATCH (n)-[r:CONNECTS]->(m) RETURN n, collect(m.id) as connections")
    Collection<DatabaseEntityProjection> getDatabasesByProjectId(String id);
}
