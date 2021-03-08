package backend.server;

import backend.authentication.model.User;
import backend.authentication.repo.UserRepo;
import backend.domain.Like;
import backend.domain.Recipe;
import backend.persistence.repositories.LikeRepo;
import backend.persistence.repositories.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class Server {
    @Autowired
    private final UserRepo userRepo;
    @Autowired
    private final RecipeRepo recipeRepo;
    @Autowired
    private final LikeRepo likeRepo;

    private List<String> loggedUsers;

    public Server(UserRepo userRepo, RecipeRepo recipeRepo, LikeRepo likeRepo) {
        this.userRepo = userRepo;
        this.recipeRepo = recipeRepo;
        this.likeRepo = likeRepo;

        this.loggedUsers = new ArrayList<>();
    }

    public User login(String username, String password) {
        System.out.println("backend.server - login");

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

    public List<Recipe> getHomeRecipes(String user) {
        return this.recipeRepo.getHomeRecipes(user);
    }

    public List<Recipe> getProfileRecipes(String user) {
        return this.recipeRepo.getProfileRecipes(user);
    }

    public Recipe addRecipe(Recipe recipe) {
        return this.recipeRepo.addRecipe(recipe);
    }

    public Like addLike(Like like) {
        return this.likeRepo.addLike(like);
    }

    public Like deleteLike(Like like) {
        return this.likeRepo.deleteLike(like);
    }

    public List<Integer> getLikedRecipes(String user) {
        return this.likeRepo.getLikedRecipes(user);
    }

    public void updateProfileImage(String username, String imageUrl) {
        this.userRepo.updateProfileImage(username, imageUrl);
    }

    public Integer getRecipesLikedBy(String user) {
        return this.recipeRepo.getRecipesLikedBy(user);
    }

    public List<String> getLoggedUsers(){
        return this.loggedUsers;
    }
}
