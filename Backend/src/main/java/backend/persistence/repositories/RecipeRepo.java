package backend.persistence.repositories;

import backend.domain.Recipe;
import backend.persistence.database_connectivity.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class RecipeRepo {
    @Autowired
    private JdbcUtils jdbc;

    public RecipeRepo(JdbcUtils jdbc) {
        this.jdbc = jdbc;
    }

    public List<Recipe> getHomeRecipes(String username) {
        Connection connection = this.jdbc.getConnection();
        List<Recipe> recipes = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM Recipes WHERE user != ?")) {
            preparedStatement.setString(1, username);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    Integer id = resultSet.getInt("id");
                    String name = resultSet.getString("name");
                    String url = resultSet.getString("url");
                    String ingredients = resultSet.getString("ingredients");
                    String quantities = resultSet.getString("quantities");
                    String steps = resultSet.getString("steps");
                    String user = resultSet.getString("user");

                    recipes.add(new Recipe(id, name, url, ingredients, quantities, steps, user));
                }
            }

            return recipes;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return null;
    }

    public List<Recipe> getProfileRecipes(String username) {
        Connection connection = this.jdbc.getConnection();
        List<Recipe> recipes = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM Recipes WHERE user = ?")) {
            preparedStatement.setString(1, username);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    Integer id = resultSet.getInt("id");
                    String name = resultSet.getString("name");
                    String url = resultSet.getString("url");
                    String ingredients = resultSet.getString("ingredients");
                    String quantities = resultSet.getString("quantities");
                    String steps = resultSet.getString("steps");
                    String user = resultSet.getString("user");

                    recipes.add(new Recipe(id, name, url, ingredients, quantities, steps, user));
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

        try (PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO Recipes VALUES (?, ?, ?, ?, ?, ?, ?)")) {
            preparedStatement.setNull(1, Types.NULL);
            preparedStatement.setString(2, recipe.getName());
            preparedStatement.setString(3, recipe.getUrl());
            preparedStatement.setString(4, recipe.getIngredients());
            preparedStatement.setString(5, recipe.getQuantities());
            preparedStatement.setString(6, recipe.getSteps());
            preparedStatement.setString(7, recipe.getUser());

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

    public Integer getNumberOfRecipesLikedBy(String user) {
        Connection connection = this.jdbc.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT COUNT(*) FROM Likes WHERE user = ?")) {
            preparedStatement.setString(1, user);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    return resultSet.getInt(1);
                }
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return null;
    }

    public List<Recipe> getRecipesLikedBy(String username) {
        Connection connection = this.jdbc.getConnection();
        List<Recipe> recipes = new ArrayList<>();

        String statement = "select *\n" +
                "from Recipes R\n" +
                "inner join Likes L\n" +
                "on R.id = L.recipeID\n" +
                "where l.user = ?";

        try (PreparedStatement preparedStatement = connection.prepareStatement(statement)) {
            preparedStatement.setString(1, username);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    Integer id = resultSet.getInt("id");
                    String name = resultSet.getString("name");
                    String url = resultSet.getString("url");
                    String ingredients = resultSet.getString("ingredients");
                    String quantities = resultSet.getString("quantities");
                    String steps = resultSet.getString("steps");
                    String user = resultSet.getString("user");

                    recipes.add(new Recipe(id, name, url, ingredients, quantities, steps, user));
                }
            }

            return recipes;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return null;
    }
}
