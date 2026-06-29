package com.credora.repository;

import com.credora.model.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
    Optional<Institution> findByInstitutionEmail(String institutionEmail);
    boolean existsByInstitutionEmail(String institutionEmail);
}
