package fr.telecom_st_etienne.ontientlebonbout.repository.search;

import fr.telecom_st_etienne.ontientlebonbout.domain.Questionnaire;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Questionnaire} entity.
 */
public interface QuestionnaireSearchRepository extends ElasticsearchRepository<Questionnaire, Long> {
}
