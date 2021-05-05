package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.io.entities.ProjectEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface ProjectRepo extends Neo4jRepository<ProjectEntity, String> {
    @Query("MATCH (n)-[r]->(m) WHERE (n.id = $idA AND m.id = $idB) OR (n.id = $idB AND m.id = $idA) DELETE r ")
    void deleteConnection(String idA, String idB);

    @Query("MATCH (n:Project) WHERE (n.slug = $slug) RETURN n")
    ProjectEntity findFirstBySlug(String slug);
}
