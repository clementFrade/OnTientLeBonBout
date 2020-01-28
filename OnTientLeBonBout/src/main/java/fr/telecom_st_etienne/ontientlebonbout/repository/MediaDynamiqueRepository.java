package fr.telecom_st_etienne.ontientlebonbout.repository;

import fr.telecom_st_etienne.ontientlebonbout.domain.MediaDynamique;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MediaDynamique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MediaDynamiqueRepository extends JpaRepository<MediaDynamique, Long> {

}
