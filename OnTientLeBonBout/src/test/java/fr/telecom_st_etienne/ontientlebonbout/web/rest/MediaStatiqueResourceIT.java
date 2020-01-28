package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.OnTientLeBonBoutApp;
import fr.telecom_st_etienne.ontientlebonbout.domain.MediaStatique;
import fr.telecom_st_etienne.ontientlebonbout.repository.MediaStatiqueRepository;
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
 * Integration tests for the {@Link MediaStatiqueResource} REST controller.
 */
@SpringBootTest(classes = OnTientLeBonBoutApp.class)
public class MediaStatiqueResourceIT {

    @Autowired
    private MediaStatiqueRepository mediaStatiqueRepository;

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

    private MockMvc restMediaStatiqueMockMvc;

    private MediaStatique mediaStatique;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MediaStatiqueResource mediaStatiqueResource = new MediaStatiqueResource(mediaStatiqueRepository);
        this.restMediaStatiqueMockMvc = MockMvcBuilders.standaloneSetup(mediaStatiqueResource)
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
    public static MediaStatique createEntity(EntityManager em) {
        MediaStatique mediaStatique = new MediaStatique();
        return mediaStatique;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MediaStatique createUpdatedEntity(EntityManager em) {
        MediaStatique mediaStatique = new MediaStatique();
        return mediaStatique;
    }

    @BeforeEach
    public void initTest() {
        mediaStatique = createEntity(em);
    }

    @Test
    @Transactional
    public void createMediaStatique() throws Exception {
        int databaseSizeBeforeCreate = mediaStatiqueRepository.findAll().size();

        // Create the MediaStatique
        restMediaStatiqueMockMvc.perform(post("/api/media-statiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mediaStatique)))
            .andExpect(status().isCreated());

        // Validate the MediaStatique in the database
        List<MediaStatique> mediaStatiqueList = mediaStatiqueRepository.findAll();
        assertThat(mediaStatiqueList).hasSize(databaseSizeBeforeCreate + 1);
        MediaStatique testMediaStatique = mediaStatiqueList.get(mediaStatiqueList.size() - 1);
    }

    @Test
    @Transactional
    public void createMediaStatiqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mediaStatiqueRepository.findAll().size();

        // Create the MediaStatique with an existing ID
        mediaStatique.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMediaStatiqueMockMvc.perform(post("/api/media-statiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mediaStatique)))
            .andExpect(status().isBadRequest());

        // Validate the MediaStatique in the database
        List<MediaStatique> mediaStatiqueList = mediaStatiqueRepository.findAll();
        assertThat(mediaStatiqueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMediaStatiques() throws Exception {
        // Initialize the database
        mediaStatiqueRepository.saveAndFlush(mediaStatique);

        // Get all the mediaStatiqueList
        restMediaStatiqueMockMvc.perform(get("/api/media-statiques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mediaStatique.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getMediaStatique() throws Exception {
        // Initialize the database
        mediaStatiqueRepository.saveAndFlush(mediaStatique);

        // Get the mediaStatique
        restMediaStatiqueMockMvc.perform(get("/api/media-statiques/{id}", mediaStatique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mediaStatique.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMediaStatique() throws Exception {
        // Get the mediaStatique
        restMediaStatiqueMockMvc.perform(get("/api/media-statiques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMediaStatique() throws Exception {
        // Initialize the database
        mediaStatiqueRepository.saveAndFlush(mediaStatique);

        int databaseSizeBeforeUpdate = mediaStatiqueRepository.findAll().size();

        // Update the mediaStatique
        MediaStatique updatedMediaStatique = mediaStatiqueRepository.findById(mediaStatique.getId()).get();
        // Disconnect from session so that the updates on updatedMediaStatique are not directly saved in db
        em.detach(updatedMediaStatique);

        restMediaStatiqueMockMvc.perform(put("/api/media-statiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMediaStatique)))
            .andExpect(status().isOk());

        // Validate the MediaStatique in the database
        List<MediaStatique> mediaStatiqueList = mediaStatiqueRepository.findAll();
        assertThat(mediaStatiqueList).hasSize(databaseSizeBeforeUpdate);
        MediaStatique testMediaStatique = mediaStatiqueList.get(mediaStatiqueList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingMediaStatique() throws Exception {
        int databaseSizeBeforeUpdate = mediaStatiqueRepository.findAll().size();

        // Create the MediaStatique

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMediaStatiqueMockMvc.perform(put("/api/media-statiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mediaStatique)))
            .andExpect(status().isBadRequest());

        // Validate the MediaStatique in the database
        List<MediaStatique> mediaStatiqueList = mediaStatiqueRepository.findAll();
        assertThat(mediaStatiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMediaStatique() throws Exception {
        // Initialize the database
        mediaStatiqueRepository.saveAndFlush(mediaStatique);

        int databaseSizeBeforeDelete = mediaStatiqueRepository.findAll().size();

        // Delete the mediaStatique
        restMediaStatiqueMockMvc.perform(delete("/api/media-statiques/{id}", mediaStatique.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MediaStatique> mediaStatiqueList = mediaStatiqueRepository.findAll();
        assertThat(mediaStatiqueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MediaStatique.class);
        MediaStatique mediaStatique1 = new MediaStatique();
        mediaStatique1.setId(1L);
        MediaStatique mediaStatique2 = new MediaStatique();
        mediaStatique2.setId(mediaStatique1.getId());
        assertThat(mediaStatique1).isEqualTo(mediaStatique2);
        mediaStatique2.setId(2L);
        assertThat(mediaStatique1).isNotEqualTo(mediaStatique2);
        mediaStatique1.setId(null);
        assertThat(mediaStatique1).isNotEqualTo(mediaStatique2);
    }
}
