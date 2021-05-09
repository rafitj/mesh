package com.rafitj.mesh.io.seeders;

import com.rafitj.mesh.io.documents.UserDocument;
import com.rafitj.mesh.io.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class UserSeeder implements CommandLineRunner {
    private final UserRepo userRepo;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserSeeder(UserRepo userRepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepo = userRepo;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public void run(String... args) {
        System.out.println(bCryptPasswordEncoder.encode("1234"));
        UserDocument user = new UserDocument("Rafit", bCryptPasswordEncoder.encode("1234") , Arrays.asList("69"));
        System.out.println(user.getPassword());
        userRepo.deleteAll();
        userRepo.save(user);
        UserDocument u = userRepo.findFirstByUsername("Rafit");
        System.out.println(u.getPassword());
    }

}
