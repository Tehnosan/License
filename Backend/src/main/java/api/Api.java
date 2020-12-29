package api;

import domain.Recipe;
import domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.Server;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class Api {
    @Autowired
    private Server server;

    @PostMapping("/login")
    public User login(@RequestBody User user){
        return this.server.login(user.getUsername(), user.getPassword());
    }

    @GetMapping("/recipes")
    public List<Recipe> getR() {
        return this.server.getRecipes();
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
