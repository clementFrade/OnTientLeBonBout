package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.OnTientLeBonBoutApp;
import fr.telecom_st_etienne.ontientlebonbout.domain.Reponse;
import fr.telecom_st_etienne.ontientlebonbout.repository.ReponseRepository;
import fr.telecom_st_etienne.ontientlebonbout.repository.search.ReponseSearchRepository;
import fr.telecom_st_etienne.ontientlebonbout.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static fr.telecom_st_etienne.ontientlebonbout.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ReponseResource} REST controller.
 */
@SpringBootTest(classes = OnTientLeBonBoutApp.class)
public class ReponseResourceIT {

    private static final String DEFAULT_INTITULE = "AAAAAAAAAA";
    private static final String UPDATED_INTITULE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VALIDE = false;
    private static final Boolean UPDATED_VALIDE = true;

    @Autowired
    private ReponseRepository reponseRepository;

    /**
     * This repository is mocked in the fr.telecom_st_etienne.ontientlebonbout.repository.search test package.
     *
     * @see fr.telecom_st_etienne.ontientlebonbout.repository.search.ReponseSearchRepositoryMockConfiguration
     */
    @Autowired
    private ReponseSearchRepository mockReponseSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restReponseMockMvc;

    private Reponse reponse;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReponseResource reponseResource = new ReponseResource(reponseRepository, mockReponseSearchRepository);
        this.restReponseMockMvc = MockMvcBuilders.standaloneSetup(reponseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reponse createEntity(EntityManager em) {
        Reponse reponse = new Reponse()
            .intitule(DEFAULT_INTITULE)
            .valide(DEFAULT_VALIDE);
        return reponse;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reponse createUpdatedEntity(EntityManager em) {
        Reponse reponse = new Reponse()
            .intitule(UPDATED_INTITULE)
            .valide(UPDATED_VALIDE);
        return reponse;
    }

    @BeforeEach
    public void initTest() {
        reponse = createEntity(em);
    }

    @Test
    @Transactional
    public void createReponse() throws Exception {
        int databaseSizeBeforeCreate = reponseRepository.findAll().size();

        // Create the Reponse
        restReponseMockMvc.perform(post("/api/reponses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isCreated());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeCreate + 1);
        Reponse testReponse = reponseList.get(reponseList.size() - 1);
        assertThat(testReponse.getIntitule()).isEqualTo(DEFAULT_INTITULE);
        assertThat(testReponse.isValide()).isEqualTo(DEFAULT_VALIDE);

        // Validate the Reponse in Elasticsearch
        verify(mockReponseSearchRepository, times(1)).save(testReponse);
    }

    @Test
    @Transactional
    public void createReponseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reponseRepository.findAll().size();

        // Create the Reponse with an existing ID
        reponse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReponseMockMvc.perform(post("/api/reponses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isBadRequest());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeCreate);

        // Validate the Reponse in Elasticsearch
        verify(mockReponseSearchRepository, times(0)).save(reponse);
    }


    @Test
    @Transactional
    public void getAllReponses() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        // Get all the reponseList
        restReponseMockMvc.perform(get("/api/reponses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reponse.getId().intValue())))
            .andExpect(jsonPath("$.[*].intitule").value(hasItem(DEFAULT_INTITULE)))
            .andExpect(jsonPath("$.[*].valide").value(hasItem(DEFAULT_VALIDE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        // Get the reponse
        restReponseMockMvc.perform(get("/api/reponses/{id}", reponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reponse.getId().intValue()))
            .andExpect(jsonPath("$.intitule").value(DEFAULT_INTITULE))
            .andExpect(jsonPath("$.valide").value(DEFAULT_VALIDE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingReponse() throws Exception {
        // Get the reponse
        restReponseMockMvc.perform(get("/api/reponses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();

        // Update the reponse
        Reponse updatedReponse = reponseRepository.findById(reponse.getId()).get();
        // Disconnect from session so that the updates on updatedReponse are not directly saved in db
        em.detach(updatedReponse);
        updatedReponse
            .intitule(UPDATED_INTITULE)
            .valide(UPDATED_VALIDE);

        restReponseMockMvc.perform(put("/api/reponses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReponse)))
            .andExpect(status().isOk());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
        Reponse testReponse = reponseList.get(reponseList.size() - 1);
        assertThat(testReponse.getIntitule()).isEqualTo(UPDATED_INTITULE);
        assertThat(testReponse.isValide()).isEqualTo(UPDATED_VALIDE);

        // Validate the Reponse in Elasticsearch
        verify(mockReponseSearchRepository, times(1)).save(testReponse);
    }

    @Test
    @Transactional
    public void updateNonExistingReponse() throws Exception {
        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();

        // Create the Reponse

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReponseMockMvc.perform(put("/api/reponses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isBadRequest());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Reponse in Elasticsearch
        verify(mockReponseSearchRepository, times(0)).save(reponse);
    }

    @Test
    @Transactional
    public void deleteReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        int databaseSizeBeforeDelete = reponseRepository.findAll().size();

        // Delete the reponse
        restReponseMockMvc.perform(delete("/api/reponses/{id}", reponse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Reponse in Elasticsearch
        verify(mockReponseSearchRepository, times(1)).deleteById(reponse.getId());
    }

    @Test
    @Transactional
    public void searchReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);
        when(mockReponseSearchRepository.search(queryStringQuery("id:" + reponse.getId())))
            .thenReturn(Collections.singletonList(reponse));
        // Search the reponse
        restReponseMockMvc.perform(get("/api/_search/reponses?query=id:" + reponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reponse.getId().intValue())))
            .andExpect(jsonPath("$.[*].intitule").value(hasItem(DEFAULT_INTITULE)))
            .andExpect(jsonPath("$.[*].valide").value(hasItem(DEFAULT_VALIDE.booleanValue())));
    }
}
