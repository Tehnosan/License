package backend.persistence.database_connectivity;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Objects;
import java.util.Properties;

@Component
public class JdbcUtils {
    private Connection connection;
    private Properties jdbcProperties;

    public JdbcUtils() {
        this.connection = null;
        this.initializeJDBCProperties();
    }

    private void initializeJDBCProperties() {
        this.jdbcProperties = new Properties();
        try {
            this.jdbcProperties.load(Objects.requireNonNull(JdbcUtils.class.getClassLoader().getResourceAsStream("application.properties")));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Connection getNewConnection() {
        String databaseURL = this.jdbcProperties.getProperty("database.url");

        Connection connection = null;

        try {
            connection = DriverManager.getConnection(this.jdbcProperties.getProperty("database.url"));
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return connection;
    }

    public Connection getConnection() {
        try {
            if (this.connection == null || connection.isClosed()) {
                connection = this.getNewConnection();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return this.connection;
    }
}
