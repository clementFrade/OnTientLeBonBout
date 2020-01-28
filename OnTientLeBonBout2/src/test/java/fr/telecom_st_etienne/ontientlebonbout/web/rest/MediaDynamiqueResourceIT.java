package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.OnTientLeBonBoutApp;
import fr.telecom_st_etienne.ontientlebonbout.domain.MediaDynamique;
import fr.telecom_st_etienne.ontientlebonbout.repository.MediaDynamiqueRepository;
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
import java.util.List;

import static fr.telecom_st_etienne.ontientlebonbout.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link MediaDynamiqueResource} REST controller.
 */
@SpringBootTest(classes = OnTientLeBonBoutApp.class)
public class MediaDynamiqueResourceIT {

    private static final Integer DEFAULT_DUREE_SECONDE = 1;
    private static final Integer UPDATED_DUREE_SECONDE = 2;

    @Autowired
    private MediaDynamiqueRepository mediaDynamiqueRepository;

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

    private MockMvc restMediaDynamiqueMockMvc;

    private MediaDynamique mediaDynamique;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MediaDynamiqueResource mediaDynamiqueResource = new MediaDynamiqueResource(mediaDynamiqueRepository);
        this.restMediaDynamiqueMockMvc = MockMvcBuilders.standaloneSetup(mediaDynamiqueResource)
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
    public static MediaDynamique createEntity(EntityManager em) {
        MediaDynamique mediaDynamique = new MediaDynamique()
            .dureeSeconde(DEFAULT_DUREE_SECONDE);
        return mediaDynamique;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MediaDynamique createUpdatedEntity(EntityManager em) {
        MediaDynamique mediaDynamique = new MediaDynamique()
            .dureeSeconde(UPDATED_DUREE_SECONDE);
        return mediaDynamique;
    }

    @BeforeEach
    public void initTest() {
        mediaDynamique = createEntity(em);
    }

    @Test
    @Transactional
    public void createMediaDynamique() throws Exception {
        int databaseSizeBeforeCreate = mediaDynamiqueRepository.findAll().size();

        // Create the MediaDynamique
        restMediaDynamiqueMockMvc.perform(post("/api/media-dynamiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mediaDynamique)))
            .andExpect(status().isCreated());

        // Validate the MediaDynamique in the database
        List<MediaDynamique> mediaDynamiqueList = mediaDynamiqueRepository.findAll();
        assertThat(mediaDynamiqueList).hasSize(databaseSizeBeforeCreate + 1);
        MediaDynamique testMediaDynamique = mediaDynamiqueList.get(mediaDynamiqueList.size() - 1);
        assertThat(testMediaDynamique.getDureeSeconde()).isEqualTo(DEFAULT_DUREE_SECONDE);
    }

    @Test
    @Transactional
    public void createMediaDynamiqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mediaDynamiqueRepository.findAll().size();

        // Create the MediaDynamique with an existing ID
        mediaDynamique.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMediaDynamiqueMockMvc.perform(post("/api/media-dynamiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mediaDynamique)))
            .andExpect(status().isBadRequest());

        // Validate the MediaDynamique in the database
        List<MediaDynamique> mediaDynamiqueList = mediaDynamiqueRepository.findAll();
        assertThat(mediaDynamiqueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMediaDynamiques() throws Exception {
        // Initialize the database
        mediaDynamiqueRepository.saveAndFlush(mediaDynamique);

        // Get all the mediaDynamiqueList
        restMediaDynamiqueMockMvc.perform(get("/api/media-dynamiques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mediaDynamique.getId().intValue())))
            .andExpect(jsonPath("$.[*].dureeSeconde").value(hasItem(DEFAULT_DUREE_SECONDE)));
    }
    
    @Test
    @Transactional
    public void getMediaDynamique() throws Exception {
        // Initialize the database
        mediaDynamiqueRepository.saveAndFlush(mediaDynamique);

        // Get the mediaDynamique
        restMediaDynamiqueMockMvc.perform(get("/api/media-dynamiques/{id}", mediaDynamique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mediaDynamique.getId().intValue()))
            .andExpect(jsonPath("$.dureeSeconde").value(DEFAULT_DUREE_SECONDE));
    }

    @Test
    @Transactional
    public void getNonExistingMediaDynamique() throws Exception {
        // Get the mediaDynamique
        restMediaDynamiqueMockMvc.perform(get("/api/media-dynamiques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMediaDynamique() throws Exception {
        // Initialize the database
        mediaDynamiqueRepository.saveAndFlush(mediaDynamique);

        int databaseSizeBeforeUpdate = mediaDynamiqueRepository.findAll().size();

        // Update the mediaDynamique
        MediaDynamique updatedMediaDynamique = mediaDynamiqueRepository.findById(mediaDynamique.getId()).get();
        // Disconnect from session so that the updates on updatedMediaDynamique are not directly saved in db
        em.detach(updatedMediaDynamique);
        updatedMediaDynamique
            .dureeSeconde(UPDATED_DUREE_SECONDE);

        restMediaDynamiqueMockMvc.perform(put("/api/media-dynamiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMediaDynamique)))
            .andExpect(status().isOk());

        // Validate the MediaDynamique in the database
        List<MediaDynamique> mediaDynamiqueList = mediaDynamiqueRepository.findAll();
        assertThat(mediaDynamiqueList).hasSize(databaseSizeBeforeUpdate);
        MediaDynamique testMediaDynamique = mediaDynamiqueList.get(mediaDynamiqueList.size() - 1);
        assertThat(testMediaDynamique.getDureeSeconde()).isEqualTo(UPDATED_DUREE_SECONDE);
    }

    @Test
    @Transactional
    public void updateNonExistingMediaDynamique() throws Exception {
        int databaseSizeBeforeUpdate = mediaDynamiqueRepository.findAll().size();

        // Create the MediaDynamique

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMediaDynamiqueMockMvc.perform(put("/api/media-dynamiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mediaDynamique)))
            .andExpect(status().isBadRequest());

        // Validate the MediaDynamique in the database
        List<MediaDynamique> mediaDynamiqueList = mediaDynamiqueRepository.findAll();
        assertThat(mediaDynamiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMediaDynamique() throws Exception {
        // Initialize the database
        mediaDynamiqueRepository.saveAndFlush(mediaDynamique);

        int databaseSizeBeforeDelete = mediaDynamiqueRepository.findAll().size();

        // Delete the mediaDynamique
        restMediaDynamiqueMockMvc.perform(delete("/api/media-dynamiques/{id}", mediaDynamique.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MediaDynamique> mediaDynamiqueList = mediaDynamiqueRepository.findAll();
        assertThat(mediaDynamiqueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MediaDynamique.class);
        MediaDynamique mediaDynamique1 = new MediaDynamique();
        mediaDynamique1.setId(1L);
        MediaDynamique mediaDynamique2 = new MediaDynamique();
        mediaDynamique2.setId(mediaDynamique1.getId());
        assertThat(mediaDynamique1).isEqualTo(mediaDynamique2);
        mediaDynamique2.setId(2L);
        assertThat(mediaDynamique1).isNotEqualTo(mediaDynamique2);
        mediaDynamique1.setId(null);
        assertThat(mediaDynamique1).isNotEqualTo(mediaDynamique2);
    }
}
