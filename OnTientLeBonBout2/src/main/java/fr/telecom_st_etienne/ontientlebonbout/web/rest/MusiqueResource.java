package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.domain.Musique;
import fr.telecom_st_etienne.ontientlebonbout.repository.MusiqueRepository;
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
 * REST controller for managing {@link fr.telecom_st_etienne.ontientlebonbout.domain.Musique}.
 */
@RestController
@RequestMapping("/api")
public class MusiqueResource {

    private final Logger log = LoggerFactory.getLogger(MusiqueResource.class);

    private static final String ENTITY_NAME = "musique";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MusiqueRepository musiqueRepository;

    public MusiqueResource(MusiqueRepository musiqueRepository) {
        this.musiqueRepository = musiqueRepository;
    }

    /**
     * {@code POST  /musiques} : Create a new musique.
     *
     * @param musique the musique to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new musique, or with status {@code 400 (Bad Request)} if the musique has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/musiques")
    public ResponseEntity<Musique> createMusique(@RequestBody Musique musique) throws URISyntaxException {
        log.debug("REST request to save Musique : {}", musique);
        if (musique.getId() != null) {
            throw new BadRequestAlertException("A new musique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Musique result = musiqueRepository.save(musique);
        return ResponseEntity.created(new URI("/api/musiques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /musiques} : Updates an existing musique.
     *
     * @param musique the musique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated musique,
     * or with status {@code 400 (Bad Request)} if the musique is not valid,
     * or with status {@code 500 (Internal Server Error)} if the musique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/musiques")
    public ResponseEntity<Musique> updateMusique(@RequestBody Musique musique) throws URISyntaxException {
        log.debug("REST request to update Musique : {}", musique);
        if (musique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Musique result = musiqueRepository.save(musique);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, musique.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /musiques} : get all the musiques.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of musiques in body.
     */
    @GetMapping("/musiques")
    public List<Musique> getAllMusiques() {
        log.debug("REST request to get all Musiques");
        return musiqueRepository.findAll();
    }

    /**
     * {@code GET  /musiques/:id} : get the "id" musique.
     *
     * @param id the id of the musique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the musique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/musiques/{id}")
    public ResponseEntity<Musique> getMusique(@PathVariable Long id) {
        log.debug("REST request to get Musique : {}", id);
        Optional<Musique> musique = musiqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(musique);
    }

    /**
     * {@code DELETE  /musiques/:id} : delete the "id" musique.
     *
     * @param id the id of the musique to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/musiques/{id}")
    public ResponseEntity<Void> deleteMusique(@PathVariable Long id) {
        log.debug("REST request to delete Musique : {}", id);
        musiqueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
