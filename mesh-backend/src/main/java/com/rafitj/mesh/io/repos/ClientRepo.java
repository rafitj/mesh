package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.controller.projections.ClientEntityProjection;
import com.rafitj.mesh.controller.projections.ClientEntityProjectionDTO;
import com.rafitj.mesh.controller.projections.ServerEntityProjectionDTO;
import com.rafitj.mesh.io.entities.ClientEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ClientRepo extends Neo4jRepository<ClientEntity, String> {
    //    TODO: Refactor with connections projection

//    @Query("MATCH (n:Client) WHERE exists((n)-[:RESOURCE_OF]->(:Project {id: $id})) " +
//            "OPTIONAL MATCH (n)<-[r:CONNECTS]->(m) RETURN n, collect({relationId: id(r), latency: r.latency, frequency: " +
//            "r.frequency, target: m.id, src: n.id}) as connections")
//    Collection<ClientEntityProjection> getClientsByProjectId(String id);

    @Query("MATCH (n:Client) WHERE exists((n)-[:RESOURCE_OF]->(:Project {id: $id})) OPTIONAL MATCH (n)<-[r:CONNECTS]->(m)" +
            " RETURN n, collect(id(r)) as relationshipIds, collect(r.latency) as latencies, collect(r.frequency) as frequencies " +
            ", collect(m.id) as targets")
    List<ClientEntityProjectionDTO> getClientsByProjectId(String id);
}

