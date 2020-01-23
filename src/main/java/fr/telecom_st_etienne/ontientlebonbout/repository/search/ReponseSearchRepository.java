package fr.telecom_st_etienne.ontientlebonbout.repository.search;

import fr.telecom_st_etienne.ontientlebonbout.domain.Reponse;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Reponse} entity.
 */
public interface ReponseSearchRepository extends ElasticsearchRepository<Reponse, Long> {
}
