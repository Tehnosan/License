package start;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"api", "server"})
public class StartServer {
    public static void main(String[] args) {
        SpringApplication.run(StartServer.class, args);
        System.out.println("Backend started successfully!");
    }
}
