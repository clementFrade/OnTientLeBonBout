package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.OnTientLeBonBoutApp;
import fr.telecom_st_etienne.ontientlebonbout.domain.Musique;
import fr.telecom_st_etienne.ontientlebonbout.repository.MusiqueRepository;
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
 * Integration tests for the {@Link MusiqueResource} REST controller.
 */
@SpringBootTest(classes = OnTientLeBonBoutApp.class)
public class MusiqueResourceIT {

    private static final String DEFAULT_ARTISTE = "AAAAAAAAAA";
    private static final String UPDATED_ARTISTE = "BBBBBBBBBB";

    @Autowired
    private MusiqueRepository musiqueRepository;

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

    private MockMvc restMusiqueMockMvc;

    private Musique musique;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MusiqueResource musiqueResource = new MusiqueResource(musiqueRepository);
        this.restMusiqueMockMvc = MockMvcBuilders.standaloneSetup(musiqueResource)
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
    public static Musique createEntity(EntityManager em) {
        Musique musique = new Musique()
            .artiste(DEFAULT_ARTISTE);
        return musique;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Musique createUpdatedEntity(EntityManager em) {
        Musique musique = new Musique()
            .artiste(UPDATED_ARTISTE);
        return musique;
    }

    @BeforeEach
    public void initTest() {
        musique = createEntity(em);
    }

    @Test
    @Transactional
    public void createMusique() throws Exception {
        int databaseSizeBeforeCreate = musiqueRepository.findAll().size();

        // Create the Musique
        restMusiqueMockMvc.perform(post("/api/musiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(musique)))
            .andExpect(status().isCreated());

        // Validate the Musique in the database
        List<Musique> musiqueList = musiqueRepository.findAll();
        assertThat(musiqueList).hasSize(databaseSizeBeforeCreate + 1);
        Musique testMusique = musiqueList.get(musiqueList.size() - 1);
        assertThat(testMusique.getArtiste()).isEqualTo(DEFAULT_ARTISTE);
    }

    @Test
    @Transactional
    public void createMusiqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = musiqueRepository.findAll().size();

        // Create the Musique with an existing ID
        musique.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMusiqueMockMvc.perform(post("/api/musiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(musique)))
            .andExpect(status().isBadRequest());

        // Validate the Musique in the database
        List<Musique> musiqueList = musiqueRepository.findAll();
        assertThat(musiqueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMusiques() throws Exception {
        // Initialize the database
        musiqueRepository.saveAndFlush(musique);

        // Get all the musiqueList
        restMusiqueMockMvc.perform(get("/api/musiques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(musique.getId().intValue())))
            .andExpect(jsonPath("$.[*].artiste").value(hasItem(DEFAULT_ARTISTE.toString())));
    }
    
    @Test
    @Transactional
    public void getMusique() throws Exception {
        // Initialize the database
        musiqueRepository.saveAndFlush(musique);

        // Get the musique
        restMusiqueMockMvc.perform(get("/api/musiques/{id}", musique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(musique.getId().intValue()))
            .andExpect(jsonPath("$.artiste").value(DEFAULT_ARTISTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMusique() throws Exception {
        // Get the musique
        restMusiqueMockMvc.perform(get("/api/musiques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMusique() throws Exception {
        // Initialize the database
        musiqueRepository.saveAndFlush(musique);

        int databaseSizeBeforeUpdate = musiqueRepository.findAll().size();

        // Update the musique
        Musique updatedMusique = musiqueRepository.findById(musique.getId()).get();
        // Disconnect from session so that the updates on updatedMusique are not directly saved in db
        em.detach(updatedMusique);
        updatedMusique
            .artiste(UPDATED_ARTISTE);

        restMusiqueMockMvc.perform(put("/api/musiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMusique)))
            .andExpect(status().isOk());

        // Validate the Musique in the database
        List<Musique> musiqueList = musiqueRepository.findAll();
        assertThat(musiqueList).hasSize(databaseSizeBeforeUpdate);
        Musique testMusique = musiqueList.get(musiqueList.size() - 1);
        assertThat(testMusique.getArtiste()).isEqualTo(UPDATED_ARTISTE);
    }

    @Test
    @Transactional
    public void updateNonExistingMusique() throws Exception {
        int databaseSizeBeforeUpdate = musiqueRepository.findAll().size();

        // Create the Musique

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMusiqueMockMvc.perform(put("/api/musiques")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(musique)))
            .andExpect(status().isBadRequest());

        // Validate the Musique in the database
        List<Musique> musiqueList = musiqueRepository.findAll();
        assertThat(musiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMusique() throws Exception {
        // Initialize the database
        musiqueRepository.saveAndFlush(musique);

        int databaseSizeBeforeDelete = musiqueRepository.findAll().size();

        // Delete the musique
        restMusiqueMockMvc.perform(delete("/api/musiques/{id}", musique.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Musique> musiqueList = musiqueRepository.findAll();
        assertThat(musiqueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Musique.class);
        Musique musique1 = new Musique();
        musique1.setId(1L);
        Musique musique2 = new Musique();
        musique2.setId(musique1.getId());
        assertThat(musique1).isEqualTo(musique2);
        musique2.setId(2L);
        assertThat(musique1).isNotEqualTo(musique2);
        musique1.setId(null);
        assertThat(musique1).isNotEqualTo(musique2);
    }
}
