package persistence.repositories;

import domain.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import persistence.database_connectivity.JDBC;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RecipeRepo {
    @Autowired
    private JDBC jdbc;

    public RecipeRepo(JDBC jdbc) {
        this.jdbc = jdbc;
    }

    public List<Recipe> getRecipes() {
        Connection connection = this.jdbc.getConnection();
        List<Recipe> recipes = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM Recipes")) {
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    Integer id = resultSet.getInt("id");
                    String name = resultSet.getString("name");
                    String url = resultSet.getString("url");

                    recipes.add(new Recipe(id, name, url));
                }
            }

            return recipes;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return null;
    }
}
