package com.rafitj.mesh.service.impl;

import com.rafitj.mesh.io.documents.UserDocument;
import com.rafitj.mesh.io.dto.shared.UserDTO;
import com.rafitj.mesh.io.repos.UserRepo;
import com.rafitj.mesh.service.intf.UserService;
import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserServiceImpl  implements UserService {

    private final UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDTO getUser(String username) {
        UserDocument user = userRepo.findFirstByUsername(username);
        UserDTO userDTO = new UserDTO();
        ModelMapper mapper = new ModelMapper();
        if (user == null) {
            UserDocument newUser = new UserDocument(username, new ArrayList<>());
            userRepo.save(newUser);
            mapper.map(newUser,userDTO);
        } else {
            mapper.map(user,userDTO);
        }
        return userDTO;
    }

    @Override
    public boolean checkUsernameAvailability(String username) {
        UserDocument user = userRepo.findFirstByUsername(username);
        return user == null;
    }
}
