package com.rafitj.mesh.io.repos;

import com.rafitj.mesh.io.documents.UserDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<UserDocument, String> {
    UserDocument findFirstByUsername(String username);
}
