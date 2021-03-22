package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.io.entities.ProjectEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ProjectRepo extends Neo4jRepository<ProjectEntity, String> {
}
