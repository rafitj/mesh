package com.rafitj.mesh.service.intf;

import com.rafitj.mesh.io.dto.UserDto;

public interface UserService {
    UserDto getUser(String id);
}
