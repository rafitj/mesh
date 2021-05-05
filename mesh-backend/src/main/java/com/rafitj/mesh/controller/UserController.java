package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.dto.shared.UserDTO;
import com.rafitj.mesh.proto.request.UserRequest;
import com.rafitj.mesh.service.impl.UserServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
public class UserController {
    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public UserDTO userLogin(@RequestBody UserRequest userRequest) throws Exception {
        return userService.loginUser(userRequest);
    }

    @PostMapping("/signup")
    public UserDTO userSignUp(@RequestBody UserRequest userRequest){
        return userService.registerUser(userRequest);
    }

    @GetMapping("/check/{username}")
    public boolean checkUsernameAvailability(@PathVariable String username){
        return userService.checkUsernameAvailability(username);
    }
}
