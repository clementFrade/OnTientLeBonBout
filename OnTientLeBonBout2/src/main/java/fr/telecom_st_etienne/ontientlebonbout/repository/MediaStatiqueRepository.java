package fr.telecom_st_etienne.ontientlebonbout.repository;

import fr.telecom_st_etienne.ontientlebonbout.domain.MediaStatique;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MediaStatique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MediaStatiqueRepository extends JpaRepository<MediaStatique, Long> {

}
