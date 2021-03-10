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

    @GetMapping("/home-recipes")
    public List<Recipe> getHomeRecipes(@RequestParam String user) {
        System.out.println("get home recipes for " + user);
        return this.server.getHomeRecipes(user);
    }

    @GetMapping("/profile-recipes")
    public List<Recipe> getProfileRecipes(@RequestParam String user) {
        System.out.println("get profile recipes for " + user);
        return this.server.getProfileRecipes(user);
    }

    @PostMapping("/recipe")
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        System.out.println("add recipe " + recipe.getName());
        return this.server.addRecipe(recipe);
    }

    @PostMapping("/like")
    public Like like(@RequestBody Like like) {
        System.out.println(like.getUser() + " likes " + like.getRecipeId());
        return this.server.addLike(like);
    }

    @DeleteMapping("/like")
    public Like unlike(@RequestParam String recipeId, @RequestParam String user) {
        System.out.println(user + " unlikes " + recipeId);
        return this.server.deleteLike(new Like(Integer.parseInt(recipeId), user));
    }

    @GetMapping("/liked-recipes-ids")
    public List<Integer> getIdsOfRecipesLikedBy(@RequestParam String user) {
        System.out.println("get ids of the recipes liked by " + user);
        return this.server.getLikedRecipes(user);
    }

    @PutMapping("/profile-image")
    public void updateProfileImage(@RequestBody User user) {
        System.out.println("update profile image for " + user.getUsername());
        this.server.updateProfileImage(user.getUsername(), user.getImageUrl());
    }

    @GetMapping("/liked-recipes-number")
    public Integer getNumberOfRecipesLikedBy(@RequestParam String user) {
        System.out.println("get number of recipes liked by " + user);
        return this.server.getNumberOfRecipesLikedBy(user);
    }

    @GetMapping("/liked-recipes")
    public List<Recipe> getRecipesLikedBy(@RequestParam String user) {
        System.out.println("get recipes liked by " + user);
        return this.server.getRecipesLikedBY(user);
    }

    @PostMapping("/cook")
    public Cook cook(@RequestBody Cook cook) {
        System.out.println(cook.getUser() + " cooked " + cook.getRecipeId());
        return this.server.addCook(cook);
    }

    @DeleteMapping("/cook")
    public Cook uncook(@RequestParam String recipeId, @RequestParam String user) {
        System.out.println(user + " uncooked " + recipeId);
        return this.server.deleteCook(new Cook(Integer.parseInt(recipeId), user));
    }
}
