package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.entities.PingEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("http://localhost:3000")
public class PingController {
    @MessageMapping("/ping.send")
    @SendTo("/topic/public")
    public PingEntity sendPing(@Payload final PingEntity pingMessage) {
        return pingMessage;
    }
}
