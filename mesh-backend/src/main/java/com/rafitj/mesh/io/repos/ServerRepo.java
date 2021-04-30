package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.controller.projections.ServerEntityProjection;
import com.rafitj.mesh.io.entities.ServerEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServerRepo extends Neo4jRepository<ServerEntity, String> {
    @Query("MATCH (n:Server) WHERE exists((n)-[:RESOURCE_OF]->(:Project {id: $id})) OPTIONAL MATCH (n)-[r:CONNECTS]->(m)" +
            " RETURN n, collect({relationId: id(r), latency: r.latency, frequency: r.frequency, target: m.id, src: n.id}) " +
            "as connections")
    List<ServerEntityProjection> getServersByProjectId(String id);
}
