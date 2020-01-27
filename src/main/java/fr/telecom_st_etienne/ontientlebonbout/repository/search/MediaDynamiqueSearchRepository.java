package fr.telecom_st_etienne.ontientlebonbout.repository.search;

import fr.telecom_st_etienne.ontientlebonbout.domain.MediaDynamique;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link MediaDynamique} entity.
 */
public interface MediaDynamiqueSearchRepository extends ElasticsearchRepository<MediaDynamique, Long> {
}
