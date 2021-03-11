package backend.persistence.repositories;

import backend.domain.Cook;
import backend.persistence.database_connectivity.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CookRepo {
    @Autowired
    private final JdbcUtils jdbcUtils;

    public CookRepo(JdbcUtils jdbcUtils) {
        this.jdbcUtils = jdbcUtils;
    }

    // save cook
    public Cook addCook(Cook cook) {
        Connection connection = this.jdbcUtils.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO Cooks VALUES (?, ?)")) {
            preparedStatement.setInt(1, cook.getRecipeId());
            preparedStatement.setString(2, cook.getUser());

            preparedStatement.executeUpdate();

            return cook;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    // delete cook
    public Cook deleteCook(Cook cook) {
        Connection connection = this.jdbcUtils.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM Cooks WHERE recipeID = ? AND user  = ?")) {
            preparedStatement.setInt(1, cook.getRecipeId());
            preparedStatement.setString(2, cook.getUser());

            preparedStatement.executeUpdate();

            return cook;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    // get a list with ids of recipes cooked by user
    public List<Integer> getIdsOfRecipesCookedBy(String user) {
        Connection connection = this.jdbcUtils.getConnection();
        java.util.List<java.lang.Integer> recipesID = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM Cooks WHERE user = ?")){
            preparedStatement.setString(1, user);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    java.lang.Integer recipeId = resultSet.getInt("recipeID");

                    recipesID.add(recipeId);
                }
            }

            return recipesID;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return null;
    }

    // get how many recipes user cooked
    public Integer getNumberOfRecipesCookedBy(String user) {
        Connection connection = this.jdbcUtils.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT COUNT(*) FROM Cooks WHERE user = ?")) {
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
}
