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

    public User login(String username, String password) {
        System.out.println("server - login");

        User user = this.userRepo.findOne(username, password);

        if(user != null) {
            if(this.loggedUsers.contains(username)) {
                System.out.println("Already logged in!");
            }
            else {
                this.loggedUsers.add(username);
                System.out.println("user logged in");
            }
        }
        else {
            System.out.println("Authentication failed!");
        }

        return user;
    }

    public List<String> getLoggedUsers(){
        return this.loggedUsers;
    }
}
