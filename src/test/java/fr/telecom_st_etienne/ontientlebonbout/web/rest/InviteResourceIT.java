package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.OnTientLeBonBoutApp;
import fr.telecom_st_etienne.ontientlebonbout.domain.Invite;
import fr.telecom_st_etienne.ontientlebonbout.repository.InviteRepository;
import fr.telecom_st_etienne.ontientlebonbout.repository.search.InviteSearchRepository;
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
 * Integration tests for the {@link InviteResource} REST controller.
 */
@SpringBootTest(classes = OnTientLeBonBoutApp.class)
public class InviteResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_MAIL = "BBBBBBBBBB";

    private static final String DEFAULT_MDP = "AAAAAAAAAA";
    private static final String UPDATED_MDP = "BBBBBBBBBB";

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final Integer DEFAULT_POINTS = 1;
    private static final Integer UPDATED_POINTS = 2;

    @Autowired
    private InviteRepository inviteRepository;

    /**
     * This repository is mocked in the fr.telecom_st_etienne.ontientlebonbout.repository.search test package.
     *
     * @see fr.telecom_st_etienne.ontientlebonbout.repository.search.InviteSearchRepositoryMockConfiguration
     */
    @Autowired
    private InviteSearchRepository mockInviteSearchRepository;

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

    private MockMvc restInviteMockMvc;

    private Invite invite;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InviteResource inviteResource = new InviteResource(inviteRepository, mockInviteSearchRepository);
        this.restInviteMockMvc = MockMvcBuilders.standaloneSetup(inviteResource)
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
    public static Invite createEntity(EntityManager em) {
        Invite invite = new Invite();
        invite.setLastName(DEFAULT_NOM);
        invite.setFirstName(DEFAULT_PRENOM);
        invite.setEmail(DEFAULT_MAIL);
        invite.setPassword(DEFAULT_MDP);
        invite.setLogin(DEFAULT_LOGIN);
        invite.points(DEFAULT_POINTS);
        return invite;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Invite createUpdatedEntity(EntityManager em) {
        Invite invite = new Invite();
            invite.setLastName(UPDATED_NOM);
            invite.setFirstName(UPDATED_PRENOM);
            invite.setEmail(UPDATED_MAIL);
            invite.setPassword(UPDATED_MDP);
            invite.setLogin(UPDATED_LOGIN);
            invite.points(UPDATED_POINTS);
        return invite;
    }

    @BeforeEach
    public void initTest() {
        invite = createEntity(em);
    }

    @Test
    @Transactional
    public void createInvite() throws Exception {
        int databaseSizeBeforeCreate = inviteRepository.findAll().size();

        // Create the Invite
        restInviteMockMvc.perform(post("/api/invites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invite)))
            .andExpect(status().isCreated());

        // Validate the Invite in the database
        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeCreate + 1);
        Invite testInvite = inviteList.get(inviteList.size() - 1);
        assertThat(testInvite.getLastName()).isEqualTo(DEFAULT_NOM);
        assertThat(testInvite.getFirstName()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testInvite.getEmail()).isEqualTo(DEFAULT_MAIL);
        assertThat(testInvite.getPassword()).isEqualTo(DEFAULT_MDP);
        assertThat(testInvite.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testInvite.getPoints()).isEqualTo(DEFAULT_POINTS);

        // Validate the Invite in Elasticsearch
        verify(mockInviteSearchRepository, times(1)).save(testInvite);
    }

    @Test
    @Transactional
    public void createInviteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inviteRepository.findAll().size();

        // Create the Invite with an existing ID
        invite.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInviteMockMvc.perform(post("/api/invites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invite)))
            .andExpect(status().isBadRequest());

        // Validate the Invite in the database
        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeCreate);

        // Validate the Invite in Elasticsearch
        verify(mockInviteSearchRepository, times(0)).save(invite);
    }


    @Test
    @Transactional
    public void getAllInvites() throws Exception {
        // Initialize the database
        inviteRepository.saveAndFlush(invite);

        // Get all the inviteList
        restInviteMockMvc.perform(get("/api/invites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(invite.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].mail").value(hasItem(DEFAULT_MAIL)))
            .andExpect(jsonPath("$.[*].mdp").value(hasItem(DEFAULT_MDP)))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN)))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS)));
    }
    
    @Test
    @Transactional
    public void getInvite() throws Exception {
        // Initialize the database
        inviteRepository.saveAndFlush(invite);

        // Get the invite
        restInviteMockMvc.perform(get("/api/invites/{id}", invite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(invite.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.mail").value(DEFAULT_MAIL))
            .andExpect(jsonPath("$.mdp").value(DEFAULT_MDP))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN))
            .andExpect(jsonPath("$.points").value(DEFAULT_POINTS));
    }

    @Test
    @Transactional
    public void getNonExistingInvite() throws Exception {
        // Get the invite
        restInviteMockMvc.perform(get("/api/invites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInvite() throws Exception {
        // Initialize the database
        inviteRepository.saveAndFlush(invite);

        int databaseSizeBeforeUpdate = inviteRepository.findAll().size();

        // Update the invite
        Invite updatedInvite = inviteRepository.findById(invite.getId()).get();
        // Disconnect from session so that the updates on updatedInvite are not directly saved in db
        em.detach(updatedInvite);
        updatedInvite.setLastName(UPDATED_NOM);
        updatedInvite.setFirstName(UPDATED_PRENOM);
        updatedInvite.setEmail(UPDATED_MAIL);
        updatedInvite.setPassword(UPDATED_MDP);
        updatedInvite.setLogin(UPDATED_LOGIN);
        updatedInvite.points(UPDATED_POINTS);

        restInviteMockMvc.perform(put("/api/invites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInvite)))
            .andExpect(status().isOk());

        // Validate the Invite in the database
        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeUpdate);
        Invite testInvite = inviteList.get(inviteList.size() - 1);
        assertThat(testInvite.getLastName()).isEqualTo(UPDATED_NOM);
        assertThat(testInvite.getFirstName()).isEqualTo(UPDATED_PRENOM);
        assertThat(testInvite.getEmail()).isEqualTo(UPDATED_MAIL);
        assertThat(testInvite.getPassword()).isEqualTo(UPDATED_MDP);
        assertThat(testInvite.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testInvite.getPoints()).isEqualTo(UPDATED_POINTS);

        // Validate the Invite in Elasticsearch
        verify(mockInviteSearchRepository, times(1)).save(testInvite);
    }

    @Test
    @Transactional
    public void updateNonExistingInvite() throws Exception {
        int databaseSizeBeforeUpdate = inviteRepository.findAll().size();

        // Create the Invite

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInviteMockMvc.perform(put("/api/invites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(invite)))
            .andExpect(status().isBadRequest());

        // Validate the Invite in the database
        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Invite in Elasticsearch
        verify(mockInviteSearchRepository, times(0)).save(invite);
    }

    @Test
    @Transactional
    public void deleteInvite() throws Exception {
        // Initialize the database
        inviteRepository.saveAndFlush(invite);

        int databaseSizeBeforeDelete = inviteRepository.findAll().size();

        // Delete the invite
        restInviteMockMvc.perform(delete("/api/invites/{id}", invite.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Invite in Elasticsearch
        verify(mockInviteSearchRepository, times(1)).deleteById(invite.getId());
    }

    @Test
    @Transactional
    public void searchInvite() throws Exception {
        // Initialize the database
        inviteRepository.saveAndFlush(invite);
        when(mockInviteSearchRepository.search(queryStringQuery("id:" + invite.getId())))
            .thenReturn(Collections.singletonList(invite));
        // Search the invite
        restInviteMockMvc.perform(get("/api/_search/invites?query=id:" + invite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(invite.getId().intValue())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_MAIL)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_MDP)))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN)))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS)));
    }
}
