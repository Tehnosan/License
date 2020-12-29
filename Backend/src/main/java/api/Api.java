package api;

import domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.Server;

import java.io.Serializable;
import java.util.ArrayList;
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

//    @GetMapping("/recipes")
//    public List<Re> getR() {
//        List<Re> l = new ArrayList<>();
//        l.add(new Re(1, "name 1"));
//        l.add(new Re(2, "name 2"));
//        l.add(new Re(3, "name 3"));
//        l.add(new Re(4, "name 4"));
//        l.add(new Re(5, "name 5"));
//        l.add(new Re(6, "name 6"));
//
//        return l;
//    }
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
//    private static class Re implements Serializable {
//        private Integer id;
//        private String name;
//
//        public Re(Integer id, String name) {
//            this.id = id;
//            this.name = name;
//        }
//
//        public Re() {
//        }
//
//        public Integer getId() {
//            return id;
//        }
//
//        public void setId(Integer id) {
//            this.id = id;
//        }
//
//        public String getName() {
//            return name;
//        }
//
//        public void setName(String name) {
//            this.name = name;
//        }
//
//        @Override
//        public String toString() {
//            return "Re{" +
//                    "id=" + id +
//                    ", name='" + name + '\'' +
//                    '}';
//        }
//    }
}
