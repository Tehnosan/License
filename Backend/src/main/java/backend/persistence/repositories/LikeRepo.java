package backend.persistence.repositories;

import backend.domain.Like;
import backend.domain.Recipe;
import backend.persistence.database_connectivity.JdbcUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class LikeRepo {
    @Autowired
    private final JdbcUtils jdbc;

    public LikeRepo(JdbcUtils jdbc) {
        this.jdbc = jdbc;
    }

    // save like to Likes table
    public Like addLike(Like like) {
        Connection connection = this.jdbc.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO Likes VALUES (?, ?)")) {
            preparedStatement.setInt(1, like.getRecipeId());
            preparedStatement.setString(2, like.getUser());

            preparedStatement.executeUpdate();

            return like;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    // delete like from Likes table
    public Like deleteLike(Like like) {
        Connection connection = this.jdbc.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM Likes WHERE recipeID = ? AND user = ?")){
            preparedStatement.setInt(1, like.getRecipeId());
            preparedStatement.setString(2, like.getUser());

            preparedStatement.executeUpdate();

            return like;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return null;
    }

    // get a list with recipes ids liked by user
    public List<Integer> getIdsOfRecipesLikedBy(String user) {
        Connection connection = this.jdbc.getConnection();
        List<Integer> recipesID = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM Likes WHERE user = ?")){
            preparedStatement.setString(1, user);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    Integer recipeId = resultSet.getInt("recipeID");

                    recipesID.add(recipeId);
                }
            }

            return recipesID;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return null;
    }

    // get how many recipes user liked
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
}
