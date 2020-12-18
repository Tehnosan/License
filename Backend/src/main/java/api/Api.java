package api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import server.Server;

@RestController
public class Api {
    @Autowired
    private Server server;

    @GetMapping("/login")
    public String getS(){
        System.out.println("all good");

        this.server.f();

        return "all good ui";
    }
}
