package com.rafitj.mesh.service.intf;

import com.rafitj.mesh.io.dto.shared.UserDTO;
import com.rafitj.mesh.proto.request.UserRequest;

public interface UserService {
    UserDTO loginUser(UserRequest userRequest) throws Exception;
    UserDTO registerUser(UserRequest userRequest);
    boolean checkUsernameAvailability(String username);
}
