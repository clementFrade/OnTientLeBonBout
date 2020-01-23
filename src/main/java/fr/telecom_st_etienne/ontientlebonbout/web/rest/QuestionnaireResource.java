package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.domain.Questionnaire;
import fr.telecom_st_etienne.ontientlebonbout.repository.QuestionnaireRepository;
import fr.telecom_st_etienne.ontientlebonbout.repository.search.QuestionnaireSearchRepository;
import fr.telecom_st_etienne.ontientlebonbout.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link fr.telecom_st_etienne.ontientlebonbout.domain.Questionnaire}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class QuestionnaireResource {

    private final Logger log = LoggerFactory.getLogger(QuestionnaireResource.class);

    private static final String ENTITY_NAME = "questionnaire";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuestionnaireRepository questionnaireRepository;

    private final QuestionnaireSearchRepository questionnaireSearchRepository;

    public QuestionnaireResource(QuestionnaireRepository questionnaireRepository, QuestionnaireSearchRepository questionnaireSearchRepository) {
        this.questionnaireRepository = questionnaireRepository;
        this.questionnaireSearchRepository = questionnaireSearchRepository;
    }

    /**
     * {@code POST  /questionnaires} : Create a new questionnaire.
     *
     * @param questionnaire the questionnaire to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new questionnaire, or with status {@code 400 (Bad Request)} if the questionnaire has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/questionnaires")
    public ResponseEntity<Questionnaire> createQuestionnaire(@RequestBody Questionnaire questionnaire) throws URISyntaxException {
        log.debug("REST request to save Questionnaire : {}", questionnaire);
        if (questionnaire.getId() != null) {
            throw new BadRequestAlertException("A new questionnaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Questionnaire result = questionnaireRepository.save(questionnaire);
        questionnaireSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/questionnaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /questionnaires} : Updates an existing questionnaire.
     *
     * @param questionnaire the questionnaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated questionnaire,
     * or with status {@code 400 (Bad Request)} if the questionnaire is not valid,
     * or with status {@code 500 (Internal Server Error)} if the questionnaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/questionnaires")
    public ResponseEntity<Questionnaire> updateQuestionnaire(@RequestBody Questionnaire questionnaire) throws URISyntaxException {
        log.debug("REST request to update Questionnaire : {}", questionnaire);
        if (questionnaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Questionnaire result = questionnaireRepository.save(questionnaire);
        questionnaireSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, questionnaire.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /questionnaires} : get all the questionnaires.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of questionnaires in body.
     */
    @GetMapping("/questionnaires")
    public List<Questionnaire> getAllQuestionnaires() {
        log.debug("REST request to get all Questionnaires");
        return questionnaireRepository.findAll();
    }

    /**
     * {@code GET  /questionnaires/:id} : get the "id" questionnaire.
     *
     * @param id the id of the questionnaire to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the questionnaire, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/questionnaires/{id}")
    public ResponseEntity<Questionnaire> getQuestionnaire(@PathVariable Long id) {
        log.debug("REST request to get Questionnaire : {}", id);
        Optional<Questionnaire> questionnaire = questionnaireRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(questionnaire);
    }

    /**
     * {@code DELETE  /questionnaires/:id} : delete the "id" questionnaire.
     *
     * @param id the id of the questionnaire to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/questionnaires/{id}")
    public ResponseEntity<Void> deleteQuestionnaire(@PathVariable Long id) {
        log.debug("REST request to delete Questionnaire : {}", id);
        questionnaireRepository.deleteById(id);
        questionnaireSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/questionnaires?query=:query} : search for the questionnaire corresponding
     * to the query.
     *
     * @param query the query of the questionnaire search.
     * @return the result of the search.
     */
    @GetMapping("/_search/questionnaires")
    public List<Questionnaire> searchQuestionnaires(@RequestParam String query) {
        log.debug("REST request to search Questionnaires for query {}", query);
        return StreamSupport
            .stream(questionnaireSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
