package fr.telecom_st_etienne.ontientlebonbout.repository;

import fr.telecom_st_etienne.ontientlebonbout.domain.Reponse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Reponse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReponseRepository extends JpaRepository<Reponse, Long> {

}
