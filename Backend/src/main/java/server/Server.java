package server;

import domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import persistence.repositories.UserRepo;

import java.util.ArrayList;
import java.util.List;

@Service
public class Server {
    @Autowired
    private UserRepo userRepo;

    private List<String> loggedUsers;

    public Server(UserRepo userRepo) {
        this.userRepo = userRepo;
        this.loggedUsers = new ArrayList<>();
    }

    public void login(String username, String password) {
        if(this.userRepo.findOne(username, password) != null) {
            if(this.loggedUsers.contains(username)) {
                System.out.println("Already logged in!");
            }
            this.loggedUsers.add(username);
            System.out.println("user logged in");
        }
        else {
            System.out.println("Authentication failed!");
        }
        System.out.println("server - login");
    }

    public List<String> getLoggedUsers(){
        return this.loggedUsers;
    }
}
