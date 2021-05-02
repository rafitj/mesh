package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.controller.projections.ServerEntityProjectionDTO;
import com.rafitj.mesh.io.entities.ServerEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServerRepo extends Neo4jRepository<ServerEntity, String> {
    //    TODO: Refactor with connections projection

//    @Query("MATCH (n:Server) WHERE exists((n)-[:RESOURCE_OF]->(:Project {id: $id})) OPTIONAL MATCH (n)-[r:CONNECTS]->(m)" +
//            " RETURN n, collect(r) as connections")
//    List<ServerEntityProjection> getServersByProjectId(String id);

    @Query("MATCH (n:Server)<-[r:CONNECTS]->(m) WHERE exists((n)-[:RESOURCE_OF]->(:Project {id: $id})) " +
            " RETURN n, collect(id(r)) as relationshipIds, collect(r.latency) as latencies, " +
            "collect(r.frequency) as frequencies, collect(m.id) as targets")
    List<ServerEntityProjectionDTO> getServersByProjectId(String id);
}
