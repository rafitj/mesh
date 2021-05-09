package com.rafitj.mesh.service.impl;

import com.rafitj.mesh.io.documents.UserDocument;
import com.rafitj.mesh.io.dto.shared.UserDTO;
import com.rafitj.mesh.io.repos.UserRepo;
import com.rafitj.mesh.proto.request.UserRequest;
import com.rafitj.mesh.service.intf.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserServiceImpl  implements UserService {

    private final UserRepo userRepo;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepo userRepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepo = userRepo;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDTO getUser(String username) throws Exception {
        UserDocument user = userRepo.findFirstByUsername(username);
        if (user != null) {
            UserDTO userDTO = new UserDTO();
            ModelMapper mapper = new ModelMapper();
            mapper.map(user,userDTO);
            return userDTO;
        }
        throw new Exception("No user exists");
    }

    @Override
    public UserDTO registerUser(UserRequest userRequest) {
        UserDocument user = new UserDocument(userRequest.getUsername(),
                bCryptPasswordEncoder.encode(userRequest.getPassword()), new ArrayList<>());
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
