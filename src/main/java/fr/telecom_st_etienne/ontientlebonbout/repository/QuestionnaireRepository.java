package fr.telecom_st_etienne.ontientlebonbout.repository;

import fr.telecom_st_etienne.ontientlebonbout.domain.Questionnaire;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Questionnaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Long> {

}
