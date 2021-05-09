package com.rafitj.mesh.service.impl;

import com.rafitj.mesh.io.documents.UserDocument;
import com.rafitj.mesh.io.repos.UserRepo;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepo userRepo;

    public UserDetailsServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        UserDocument user = userRepo.findFirstByUsername(s);

        User.UserBuilder builder;
        if (user != null) {
            builder = org.springframework.security.core.userdetails.User.withUsername(s);
            builder.password(user.getPassword());
            builder.roles("USER");
        } else {
            throw new UsernameNotFoundException("User not found.");
        }

        return builder.build();
    }

}
