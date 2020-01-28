package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.domain.Reponse;
import fr.telecom_st_etienne.ontientlebonbout.repository.ReponseRepository;
import fr.telecom_st_etienne.ontientlebonbout.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.telecom_st_etienne.ontientlebonbout.domain.Reponse}.
 */
@RestController
@RequestMapping("/api")
public class ReponseResource {

    private final Logger log = LoggerFactory.getLogger(ReponseResource.class);

    private static final String ENTITY_NAME = "reponse";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReponseRepository reponseRepository;

    public ReponseResource(ReponseRepository reponseRepository) {
        this.reponseRepository = reponseRepository;
    }

    /**
     * {@code POST  /reponses} : Create a new reponse.
     *
     * @param reponse the reponse to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reponse, or with status {@code 400 (Bad Request)} if the reponse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reponses")
    public ResponseEntity<Reponse> createReponse(@RequestBody Reponse reponse) throws URISyntaxException {
        log.debug("REST request to save Reponse : {}", reponse);
        if (reponse.getId() != null) {
            throw new BadRequestAlertException("A new reponse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Reponse result = reponseRepository.save(reponse);
        return ResponseEntity.created(new URI("/api/reponses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reponses} : Updates an existing reponse.
     *
     * @param reponse the reponse to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reponse,
     * or with status {@code 400 (Bad Request)} if the reponse is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reponse couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reponses")
    public ResponseEntity<Reponse> updateReponse(@RequestBody Reponse reponse) throws URISyntaxException {
        log.debug("REST request to update Reponse : {}", reponse);
        if (reponse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Reponse result = reponseRepository.save(reponse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reponse.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reponses} : get all the reponses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reponses in body.
     */
    @GetMapping("/reponses")
    public List<Reponse> getAllReponses() {
        log.debug("REST request to get all Reponses");
        return reponseRepository.findAll();
    }

    /**
     * {@code GET  /reponses/:id} : get the "id" reponse.
     *
     * @param id the id of the reponse to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reponse, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reponses/{id}")
    public ResponseEntity<Reponse> getReponse(@PathVariable Long id) {
        log.debug("REST request to get Reponse : {}", id);
        Optional<Reponse> reponse = reponseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reponse);
    }

    /**
     * {@code DELETE  /reponses/:id} : delete the "id" reponse.
     *
     * @param id the id of the reponse to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reponses/{id}")
    public ResponseEntity<Void> deleteReponse(@PathVariable Long id) {
        log.debug("REST request to delete Reponse : {}", id);
        reponseRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
