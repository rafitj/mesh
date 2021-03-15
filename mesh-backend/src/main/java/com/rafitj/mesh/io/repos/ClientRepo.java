package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.io.entities.ClientEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepo extends Neo4jRepository<ClientEntity, String> {
}
