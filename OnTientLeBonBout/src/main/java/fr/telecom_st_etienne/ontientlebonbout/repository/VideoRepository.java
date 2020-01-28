package fr.telecom_st_etienne.ontientlebonbout.repository;

import fr.telecom_st_etienne.ontientlebonbout.domain.Video;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Video entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

}
