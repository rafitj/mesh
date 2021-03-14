package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.io.entities.ServerEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerRepo extends Neo4jRepository<ServerEntity, String> {
}
