package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.controller.projections.DatabaseEntityProjectionDTO;
import com.rafitj.mesh.io.entities.DatabaseEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DatabaseRepo extends Neo4jRepository<DatabaseEntity, String> {
//    TODO: Refactor with connections projection

//    @Query("MATCH (n:Database) WHERE exists((n)-[:RESOURCE_OF]->(:Project {id: $id})) " +
//            "OPTIONAL MATCH (n)<-[r:CONNECTS]->(m) RETURN n, collect({relationId: id(r), latency: r.latency, frequency: " +
//            "r.frequency, target: m.id, src: n.id}) as connections")
//    Collection<DatabaseEntityProjection> getDatabasesByProjectId(String id);

    @Query("MATCH (n:Database) WHERE exists((n)-[:RESOURCE_OF]->(:Project {id: $id})) OPTIONAL MATCH (n)<-[r:CONNECTS]->(m)" +
            " RETURN n, collect(id(r)) as relationshipIds, collect(r.latency) as latencies, collect(r.frequency) as frequencies " +
            ", collect(m.id) as targets, collect(r) as connections")
    List<DatabaseEntityProjectionDTO> getDatabasesByProjectId(String id);
}
