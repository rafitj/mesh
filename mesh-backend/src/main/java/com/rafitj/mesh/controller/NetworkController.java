package com.rafitj.mesh.controller;

import com.rafitj.mesh.io.entities.PingEntity;
import com.rafitj.mesh.threads.NetworkSimulation;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("http://localhost:3000")
public class NetworkController {

    private final NetworkSimulation networkSimulation;

    public NetworkController(NetworkSimulation networkSimulation) {
        this.networkSimulation = networkSimulation;
    }

    @MessageMapping("/ping.send")
    @SendTo("/topic/public")
    public PingEntity sendPing(@Payload final PingEntity pingMessage) {
        return pingMessage;
    }

    @MessageMapping("/pause")
    @SendTo("/topic/public")
    public void pauseSim() {
        networkSimulation.stop();
    }

    @MessageMapping("/play")
    @SendTo("/topic/public")
    public void playSim() {
        networkSimulation.start();
    }

    @MessageMapping("/reset")
    @SendTo("/topic/public")
    public void resetSim() {
        networkSimulation.reset();
    }
}
