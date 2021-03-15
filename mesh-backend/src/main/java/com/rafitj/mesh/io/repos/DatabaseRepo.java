package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.io.entities.DatabaseEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseRepo extends Neo4jRepository<DatabaseEntity, String> {
}
