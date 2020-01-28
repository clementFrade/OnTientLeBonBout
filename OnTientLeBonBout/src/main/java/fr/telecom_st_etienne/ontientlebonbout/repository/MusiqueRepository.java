package fr.telecom_st_etienne.ontientlebonbout.repository;

import fr.telecom_st_etienne.ontientlebonbout.domain.Musique;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Musique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MusiqueRepository extends JpaRepository<Musique, Long> {

}
