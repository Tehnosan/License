package backend.api;

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

    @GetMapping("/recipes")
    public List<Recipe> getR() {
        System.out.println("get recipes");
        return this.server.getRecipes();
    }

    @PostMapping("/add-recipe")
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        System.out.println("add recipe");
        return this.server.addRecipe(recipe);
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
