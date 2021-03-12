package backend.api;

import backend.authentication.model.User;
import backend.domain.Cook;
import backend.domain.Like;
import backend.domain.Recipe;
import backend.server.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200")
//@CrossOrigin(origins="*")
@RequestMapping("/logged")
public class Api {
    @Autowired
    private Server server;

    // get recipes not posted by user
    @GetMapping("/home-recipes")
    public List<Recipe> getHomeRecipes(@RequestParam String user) {
        System.out.println("get home recipes for " + user);
        return this.server.getHomeRecipes(user);
    }

    // get recipes posted by user
    @GetMapping("/profile-recipes")
    public List<Recipe> getProfileRecipes(@RequestParam String user) {
        System.out.println("get profile recipes for " + user);
        return this.server.getProfileRecipes(user);
    }

    // save recipe to db
    @PostMapping("/recipe")
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        System.out.println("add recipe " + recipe.getName());
        return this.server.addRecipe(recipe);
    }

    // save like to db
    @PostMapping("/like")
    public Like like(@RequestBody Like like) {
        System.out.println(like.getUser() + " likes " + like.getRecipeId());
        return this.server.addLike(like);
    }

    // delete like from db
    @DeleteMapping("/like")
    public Like unlike(@RequestParam String recipeId, @RequestParam String user) {
        System.out.println(user + " unlikes " + recipeId);
        return this.server.deleteLike(new Like(Integer.parseInt(recipeId), user));
    }

    // get a list with ids of recipes liked by user
    @GetMapping("/liked-recipes-ids")
    public List<Integer> getIdsOfRecipesLikedBy(@RequestParam String user) {
        System.out.println("get ids of the recipes liked by " + user);
        return this.server.getIdsOfRecipesLikedBy(user);
    }

    // modify profile image of user
    @PutMapping("/profile-image")
    public void updateProfileImage(@RequestBody User user) {
        System.out.println("update profile image for " + user.getUsername());
        this.server.updateProfileImage(user.getUsername(), user.getImageUrl());
    }

    // get how many recipes user liked
    @GetMapping("/liked-recipes-number")
    public Integer getNumberOfRecipesLikedBy(@RequestParam String user) {
        System.out.println("get number of recipes liked by " + user);
        return this.server.getNumberOfRecipesLikedBy(user);
    }

    // get a list of recipes liked by user
    @GetMapping("/liked-recipes")
    public List<Recipe> getRecipesLikedBy(@RequestParam String user) {
        System.out.println("get recipes liked by " + user);
        return this.server.getRecipesLikedBY(user);
    }

    // save cook to db
    @PostMapping("/cook")
    public Cook cook(@RequestBody Cook cook) {
        System.out.println(cook.getUser() + " cooked " + cook.getRecipeId());
        return this.server.addCook(cook);
    }

    // delete cook from db
    @DeleteMapping("/cook")
    public Cook uncook(@RequestParam String recipeId, @RequestParam String user) {
        System.out.println(user + " uncooked " + recipeId);
        return this.server.deleteCook(new Cook(Integer.parseInt(recipeId), user));
    }

    // get a list of ids of recipes cooked by user
    @GetMapping("/cooked-recipes-ids")
    public List<Integer> getIdsOfRecipesCookedBy(@RequestParam String user) {
        System.out.println("get ids of the recipes cooked by " + user);
        return this.server.getIdsOfRecipesCookedBy(user);
    }

    // get how many recipes user cooked
    @GetMapping("/cooked-recipes-number")
    public Integer getNumberOfRecipesCookedBy(@RequestParam String user) {
        System.out.println("get number of recipes cooked by " + user);
        return this.server.getNumberOfRecipesCookedBy(user);
    }

    // get a list of recipes liked by user
    @GetMapping("/cooked-recipes")
    public List<Recipe> getRecipesCookedBy(@RequestParam String user) {
        System.out.println("get recipes cooked by " + user);
        return this.server.getRecipesCookedBY(user);
    }

    // delete like from db
    @DeleteMapping("/recipe")
    public boolean deleteRecipe(@RequestParam String recipeId) {
        System.out.println("delete " + recipeId);
        return this.server.deleteRecipeWithRecipeId(Integer.parseInt(recipeId));
    }

    // update recipe
    @PutMapping("/recipe")
    public Recipe updateRecipe(@RequestBody Recipe recipe) {
        System.out.println("update recipe " + recipe.getName());
        return this.server.updateRecipe(recipe);
    }
}
