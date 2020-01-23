package fr.telecom_st_etienne.ontientlebonbout.repository.search;

import fr.telecom_st_etienne.ontientlebonbout.domain.Musique;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Musique} entity.
 */
public interface MusiqueSearchRepository extends ElasticsearchRepository<Musique, Long> {
}
