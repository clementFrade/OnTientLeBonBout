package fr.telecom_st_etienne.ontientlebonbout.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link MusiqueSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class MusiqueSearchRepositoryMockConfiguration {

    @MockBean
    private MusiqueSearchRepository mockMusiqueSearchRepository;

}
