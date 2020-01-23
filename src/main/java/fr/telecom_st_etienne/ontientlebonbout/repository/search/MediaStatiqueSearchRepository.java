package fr.telecom_st_etienne.ontientlebonbout.repository.search;

import fr.telecom_st_etienne.ontientlebonbout.domain.MediaStatique;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MediaStatique} entity.
 */
public interface MediaStatiqueSearchRepository extends ElasticsearchRepository<MediaStatique, Long> {
}
