package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.dto.shared.UserDTO;
import com.rafitj.mesh.service.impl.UserServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public UserDTO getUser(@RequestBody String username){
        return userService.getUser(username);
    }

    @GetMapping("/check")
    public boolean checkUsernameAvailability(@RequestBody String username){
        return userService.checkUsernameAvailability(username);
    }
}
