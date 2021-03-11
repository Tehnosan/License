package backend.server;

import backend.authentication.model.User;
import backend.authentication.repo.UserRepo;
import backend.domain.Cook;
import backend.domain.Like;
import backend.domain.Recipe;
import backend.persistence.repositories.CookRepo;
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
    @Autowired
    private final CookRepo cookRepo;

    private List<String> loggedUsers;

    public Server(UserRepo userRepo, RecipeRepo recipeRepo, LikeRepo likeRepo, CookRepo cookRepo) {
        this.userRepo = userRepo;
        this.recipeRepo = recipeRepo;
        this.likeRepo = likeRepo;
        this.cookRepo = cookRepo;

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

    // return recipes thar are not posted by user
    public List<Recipe> getHomeRecipes(String user) {
        return this.recipeRepo.getHomeRecipes(user);
    }

    // return recipes posted by user
    public List<Recipe> getProfileRecipes(String user) {
        return this.recipeRepo.getProfileRecipes(user);
    }

    // add recipe to db
    public Recipe addRecipe(Recipe recipe) {
        return this.recipeRepo.addRecipe(recipe);
    }

    // add like to db
    public Like addLike(Like like) {
        return this.likeRepo.addLike(like);
    }

    // delete like from db
    public Like deleteLike(Like like) {
        return this.likeRepo.deleteLike(like);
    }

    // return ids of recipes liked by user
    public List<Integer> getIdsOfRecipesLikedBy(String user) {
        return this.likeRepo.getIdsOfRecipesLikedBy(user);
    }

    // update profile image of user
    public void updateProfileImage(String username, String imageUrl) {
        this.userRepo.updateProfileImage(username, imageUrl);
    }

    // return how many recipes user liked
    public Integer getNumberOfRecipesLikedBy(String user) {
        return this.likeRepo.getNumberOfRecipesLikedBy(user);
    }

    // return recipes liked by user
    public List<Recipe> getRecipesLikedBY(String user) {
        return this.recipeRepo.getRecipesLikedBy(user);
    }

    // save cook to db
    public Cook addCook(Cook cook) {
        return this.cookRepo.addCook(cook);
    }

    // delete cook from db
    public Cook deleteCook(Cook cook) {
        return this.cookRepo.deleteCook(cook);
    }

    // return ids of recipes cooked by user
    public List<Integer> getIdsOfRecipesCookedBy(String user) {
        return this.cookRepo.getIdsOfRecipesCookedBy(user);
    }

    // return how many recipes user cooked
    public Integer getNumberOfRecipesCookedBy(String user) {
        return this.cookRepo.getNumberOfRecipesCookedBy(user);
    }

    // return recipes cooked by user
    public List<Recipe> getRecipesCookedBY(String user) {
        return this.recipeRepo.getRecipesCookedBy(user);
    }

    // delete recipe with recipeId
    public boolean deleteRecipeWithRecipeId(Integer recipeId) {
        return this.recipeRepo.deleteRecipeWithRecipeId(recipeId);
    }

    public List<String> getLoggedUsers(){
        return this.loggedUsers;
    }
}
