package fr.telecom_st_etienne.ontientlebonbout.repository.search;

import fr.telecom_st_etienne.ontientlebonbout.domain.Media;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Media} entity.
 */
public interface MediaSearchRepository extends ElasticsearchRepository<Media, Long> {
}
