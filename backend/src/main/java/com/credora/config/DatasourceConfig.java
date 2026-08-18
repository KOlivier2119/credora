package com.credora.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatasourceConfig {

    /**
     * Render injects postgres://user:pass@host/db. Spring Boot needs jdbc:postgresql://...
     * This bean is always primary so auto-config never tries to use the raw postgres:// URL.
     */
    @Bean
    @Primary
    public DataSource dataSource(
            @Value("${DATABASE_URL:}") String databaseUrl,
            @Value("${spring.datasource.url:jdbc:postgresql://localhost:5432/credora}") String fallbackJdbcUrl,
            @Value("${DATABASE_USER:credora}") String usernameFallback,
            @Value("${DATABASE_PASSWORD:credora}") String passwordFallback
    ) {
        String jdbcUrl = fallbackJdbcUrl;
        String username = usernameFallback;
        String password = passwordFallback;
        String source = databaseUrl != null ? databaseUrl.trim() : "";

        if (source.startsWith("postgres://") || source.startsWith("postgresql://")) {
            URI uri = URI.create(source.replaceFirst("^postgres://", "postgresql://"));
            int port = uri.getPort() > 0 ? uri.getPort() : 5432;
            jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + port + uri.getPath();
            if (uri.getQuery() != null && !uri.getQuery().isBlank()) {
                jdbcUrl += "?" + uri.getQuery();
            } else if (!jdbcUrl.contains("sslmode=")) {
                jdbcUrl += "?sslmode=require";
            }
            if (uri.getUserInfo() != null) {
                String[] parts = uri.getUserInfo().split(":", 2);
                username = parts[0];
                if (parts.length > 1) {
                    password = parts[1];
                }
            }
        } else if (source.startsWith("jdbc:")) {
            jdbcUrl = source;
        }

        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(jdbcUrl);
        ds.setUsername(username);
        ds.setPassword(password);
        ds.setDriverClassName("org.postgresql.Driver");
        ds.setMaximumPoolSize(3);
        return ds;
    }
}
