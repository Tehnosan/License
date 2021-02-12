package persistence.repositories;

import domain.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import persistence.database_connectivity.JDBC;

import java.sql.*;
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
                    String ingredients = resultSet.getString("ingredients");
                    String quantities = resultSet.getString("quantities");
                    String steps = resultSet.getString("steps");

                    recipes.add(new Recipe(id, name, url, ingredients, quantities, steps));
                }
            }

            return recipes;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return null;
    }

    public Recipe addRecipe(Recipe recipe) {
        Connection connection = this.jdbc.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO Recipes VALUES (?, ?, ?, ?, ?, ?)")) {
            preparedStatement.setNull(1, Types.NULL);
            preparedStatement.setString(2, recipe.getName());
            preparedStatement.setString(3, recipe.getUrl());
            preparedStatement.setString(4, recipe.getIngredients());
            preparedStatement.setString(5, recipe.getQuantities());
            preparedStatement.setString(6, recipe.getSteps());

            preparedStatement.executeUpdate();

            try (ResultSet resultSet = preparedStatement.getGeneratedKeys()) {
                resultSet.next();

                recipe.setId(resultSet.getInt(1));
                return recipe;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }
}
