package com.rafitj.mesh.service.impl;

import com.rafitj.mesh.io.documents.UserDocument;
import com.rafitj.mesh.io.dto.shared.UserDTO;
import com.rafitj.mesh.io.repos.UserRepo;
import com.rafitj.mesh.proto.request.UserRequest;
import com.rafitj.mesh.service.intf.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserServiceImpl  implements UserService {

    private final UserRepo userRepo;

    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDTO loginUser(UserRequest userRequest) throws Exception {
        UserDocument user = userRepo.findFirstByUsername(userRequest.getUsername());
        if (user != null && user.getPin().equals(userRequest.getPin())) {
            UserDTO userDTO = new UserDTO();
            ModelMapper mapper = new ModelMapper();
            mapper.map(user,userDTO);
            return userDTO;
        }
        throw new Exception("Incorrect credentials");
    }

    @Override
    public UserDTO registerUser(UserRequest userRequest) {
        UserDocument user = new UserDocument(userRequest.getUsername(), userRequest.getPin(), new ArrayList<>());
        userRepo.save(user);
        UserDTO userDTO = new UserDTO();
        ModelMapper mapper = new ModelMapper();
        mapper.map(user,userDTO);
        return userDTO;
    }


    @Override
    public boolean checkUsernameAvailability(String username) {
        UserDocument user = userRepo.findFirstByUsername(username);
        return user == null;
    }
}
