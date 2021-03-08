package backend.api;

import backend.authentication.model.User;
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

    @GetMapping("/liked-recipes")
    public List<Integer> getRecipesLiked(@RequestParam String user) {
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
        return this.server.getRecipesLikedBy(user);
    }
//
//    @GetMapping("/recipes/{id}")
//    public Re getRe() {
//
//        return new Re(9, "abc");
//    }
//
//    @PutMapping("/recipes")
//    public void update(@RequestBody Re rec) {
//        System.out.println(rec);
//    }
//
//    @PostMapping("/recipes")
//    public Re add(@RequestBody Re rec) {
//        System.out.println(rec);
//        rec.setId(11);
//        return rec;
//    }
//
//    @DeleteMapping("/recipes/{id}")
//    public void delete(@PathVariable String id) {
//        System.out.println("delete" + id);
//    }
//
//    @GetMapping("/recipes/")
//    public List<Re> search(@RequestParam String name) {
//        System.out.println(name);
//        List<Re> l = new ArrayList<>();
//
//        for(int i = 0; i < 3; i++) {
//            l.add(new Re(i, name + i));
//        }
//
//        return l;
//    }
//
}
