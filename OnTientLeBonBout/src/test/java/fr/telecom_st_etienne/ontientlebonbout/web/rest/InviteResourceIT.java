package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.OnTientLeBonBoutApp;
import fr.telecom_st_etienne.ontientlebonbout.domain.Invite;
import fr.telecom_st_etienne.ontientlebonbout.repository.InviteRepository;
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
 * Integration tests for the {@Link InviteResource} REST controller.
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
        final InviteResource inviteResource = new InviteResource(inviteRepository);
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
        Invite invite = new Invite()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .mail(DEFAULT_MAIL)
            .mdp(DEFAULT_MDP)
            .login(DEFAULT_LOGIN)
            .points(DEFAULT_POINTS);
        return invite;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Invite createUpdatedEntity(EntityManager em) {
        Invite invite = new Invite()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .mail(UPDATED_MAIL)
            .mdp(UPDATED_MDP)
            .login(UPDATED_LOGIN)
            .points(UPDATED_POINTS);
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
        assertThat(testInvite.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testInvite.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testInvite.getMail()).isEqualTo(DEFAULT_MAIL);
        assertThat(testInvite.getMdp()).isEqualTo(DEFAULT_MDP);
        assertThat(testInvite.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testInvite.getPoints()).isEqualTo(DEFAULT_POINTS);
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
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].mail").value(hasItem(DEFAULT_MAIL.toString())))
            .andExpect(jsonPath("$.[*].mdp").value(hasItem(DEFAULT_MDP.toString())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN.toString())))
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
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.mail").value(DEFAULT_MAIL.toString()))
            .andExpect(jsonPath("$.mdp").value(DEFAULT_MDP.toString()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN.toString()))
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
        updatedInvite
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .mail(UPDATED_MAIL)
            .mdp(UPDATED_MDP)
            .login(UPDATED_LOGIN)
            .points(UPDATED_POINTS);

        restInviteMockMvc.perform(put("/api/invites")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInvite)))
            .andExpect(status().isOk());

        // Validate the Invite in the database
        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeUpdate);
        Invite testInvite = inviteList.get(inviteList.size() - 1);
        assertThat(testInvite.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testInvite.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testInvite.getMail()).isEqualTo(UPDATED_MAIL);
        assertThat(testInvite.getMdp()).isEqualTo(UPDATED_MDP);
        assertThat(testInvite.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testInvite.getPoints()).isEqualTo(UPDATED_POINTS);
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
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Invite.class);
        Invite invite1 = new Invite();
        invite1.setId(1L);
        Invite invite2 = new Invite();
        invite2.setId(invite1.getId());
        assertThat(invite1).isEqualTo(invite2);
        invite2.setId(2L);
        assertThat(invite1).isNotEqualTo(invite2);
        invite1.setId(null);
        assertThat(invite1).isNotEqualTo(invite2);
    }
}
