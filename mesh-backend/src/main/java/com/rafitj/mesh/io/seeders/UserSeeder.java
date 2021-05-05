package com.rafitj.mesh.io.seeders;

import com.rafitj.mesh.io.documents.UserDocument;
import com.rafitj.mesh.io.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class UserSeeder implements CommandLineRunner {
    @Autowired
    private UserRepo userRepo;

    @Override
    public void run(String... args) throws Exception {
        UserDocument user = new UserDocument("Rafit",  "1234", Arrays.asList("69"));
        userRepo.deleteAll();
        userRepo.save(user);
    }

}
