package com.rafitj.mesh.service.intf;

import com.rafitj.mesh.io.dto.shared.UserDTO;

public interface UserService {
    UserDTO getUser(String username);
    boolean checkUsernameAvailability(String username);
}
