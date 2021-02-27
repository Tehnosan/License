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

    @PostMapping("/home-recipes")
    public List<Recipe> getHomeRecipes(@RequestBody String user) {
        System.out.println("get home recipes");
        return this.server.getHomeRecipes(user);
    }

    @PostMapping("/profile-recipes")
    public List<Recipe> getProfileRecipes(@RequestBody String user) {
        System.out.println("get profile recipes");
        return this.server.getProfileRecipes(user);
    }

    @PostMapping("/add-recipe")
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        System.out.println("add recipe " + recipe.getName());
        return this.server.addRecipe(recipe);
    }

    @PostMapping("/like")
    public Like like(@RequestBody Like like) {
        System.out.println(like.getUser() + " likes " + like.getRecipeId());
        return this.server.addLike(like);
    }

    @PostMapping("/unlike")
    public Like unlike(@RequestBody Like like) {
        System.out.println(like.getUser() + " unlikes " + like.getRecipeId());
        return this.server.deleteLike(like);
    }

    @GetMapping("/recipes-liked/{user}")
    public List<Integer> getRecipesLiked(@PathVariable String user) {
        System.out.println("get liked recipes");
        return this.server.getLikedRecipes(user);
    }

    @PutMapping("/update-profile-image")
    public void updateProfileImage(@RequestBody User user) {
        System.out.println("update profile image for " + user.getUsername());
        this.server.updateProfileImage(user.getUsername(), user.getImageUrl());
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
