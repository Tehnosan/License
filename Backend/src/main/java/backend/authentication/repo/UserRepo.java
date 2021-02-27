package backend.authentication.repo;

import backend.persistence.database_connectivity.JdbcUtils;
import backend.authentication.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.*;

@Repository
public class UserRepo {
    @Autowired
    private JdbcUtils jdbc;

    public UserRepo(JdbcUtils jdbc) {
        this.jdbc = jdbc;
    }

    public void save(User user) {
        Connection connection = this.jdbc.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO Users VALUES (?, ?, ?, ?, ?)")) {
            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getPassword());
            preparedStatement.setString(3, user.getFirst_name());
            preparedStatement.setString(4, user.getLast_name());
            preparedStatement.setString(5, user.getImageUrl());

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public User findOne(String username, String password) {
        Connection connection = this.jdbc.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM Users WHERE username = ? AND password = ?")) {
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return new User(username, password, resultSet.getString("first_name"), resultSet.getString("last_name"), resultSet.getString("image"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public User findByUsername(String username) {
        Connection connection = this.jdbc.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM Users WHERE username = ?")) {
            preparedStatement.setString(1, username);

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return new User(username, resultSet.getString("password"), resultSet.getString("first_name"), resultSet.getString("last_name"), resultSet.getString("image"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public boolean existsByUsername(String username) {
        Connection connection = this.jdbc.getConnection();

        final String statement = "SELECT * FROM Users WHERE username = ?";

        try (PreparedStatement preparedStatement = connection.prepareStatement(statement)) {
            preparedStatement.setString(1, username);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    return true;
                }
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return false;
    }

    public String getProfileImage(String username) {
        Connection connection = this.jdbc.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM Users WHERE username = ?")) {
            preparedStatement.setString(1, username);

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getString("image");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public void updateProfileImage(String username, String imageUrl) {
        Connection connection = this.jdbc.getConnection();

        try (PreparedStatement preparedStatement = connection.prepareStatement("UPDATE Users SET image = ? WHERE username = ?")) {
            preparedStatement.setString(1, imageUrl);
            preparedStatement.setString(2, username);

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}