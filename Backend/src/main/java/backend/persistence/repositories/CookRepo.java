package backend.persistence.repositories;

import backend.domain.Cook;
import backend.persistence.database_connectivity.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class CookRepo {
    @Autowired
    private final JdbcUtils jdbcUtils;

    public CookRepo(JdbcUtils jdbcUtils) {
        this.jdbcUtils = jdbcUtils;
    }

    public Cook addCook(Cook cook) {
        Connection connection = this.jdbcUtils.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO Cooked VALUES (?, ?)")) {
            preparedStatement.setInt(1, cook.getRecipeId());
            preparedStatement.setString(2, cook.getUser());

            preparedStatement.executeUpdate();

            return cook;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public Cook deleteCook(Cook cook) {
        Connection connection = this.jdbcUtils.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM Cooked WHERE recipeID = ? AND user  = ?")) {
            preparedStatement.setInt(1, cook.getRecipeId());
            preparedStatement.setString(2, cook.getUser());

            preparedStatement.executeUpdate();

            return cook;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }
}
