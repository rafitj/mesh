package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.entities.PingMessageEntity;
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
    public PingMessageEntity sendPing(@Payload final PingMessageEntity pingMessage) {
        return pingMessage;
    }
}
