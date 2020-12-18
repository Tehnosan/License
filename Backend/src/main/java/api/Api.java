package api;

import domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.Server;

@RestController
public class Api {
    @Autowired
    private Server server;

    @PostMapping("/login")
    public String getS(@RequestBody User user){
        System.out.println(this.server.getLoggedUsers());
        this.server.login(user.getUsername(), user.getPassword());
        System.out.println(this.server.getLoggedUsers());

        return "all good ui";
    }
}
