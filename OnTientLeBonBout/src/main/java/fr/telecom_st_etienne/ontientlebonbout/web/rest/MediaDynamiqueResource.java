package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.domain.MediaDynamique;
import fr.telecom_st_etienne.ontientlebonbout.repository.MediaDynamiqueRepository;
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
 * REST controller for managing {@link fr.telecom_st_etienne.ontientlebonbout.domain.MediaDynamique}.
 */
@RestController
@RequestMapping("/api")
public class MediaDynamiqueResource {

    private final Logger log = LoggerFactory.getLogger(MediaDynamiqueResource.class);

    private static final String ENTITY_NAME = "mediaDynamique";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MediaDynamiqueRepository mediaDynamiqueRepository;

    public MediaDynamiqueResource(MediaDynamiqueRepository mediaDynamiqueRepository) {
        this.mediaDynamiqueRepository = mediaDynamiqueRepository;
    }

    /**
     * {@code POST  /media-dynamiques} : Create a new mediaDynamique.
     *
     * @param mediaDynamique the mediaDynamique to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mediaDynamique, or with status {@code 400 (Bad Request)} if the mediaDynamique has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/media-dynamiques")
    public ResponseEntity<MediaDynamique> createMediaDynamique(@RequestBody MediaDynamique mediaDynamique) throws URISyntaxException {
        log.debug("REST request to save MediaDynamique : {}", mediaDynamique);
        if (mediaDynamique.getId() != null) {
            throw new BadRequestAlertException("A new mediaDynamique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MediaDynamique result = mediaDynamiqueRepository.save(mediaDynamique);
        return ResponseEntity.created(new URI("/api/media-dynamiques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /media-dynamiques} : Updates an existing mediaDynamique.
     *
     * @param mediaDynamique the mediaDynamique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mediaDynamique,
     * or with status {@code 400 (Bad Request)} if the mediaDynamique is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mediaDynamique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/media-dynamiques")
    public ResponseEntity<MediaDynamique> updateMediaDynamique(@RequestBody MediaDynamique mediaDynamique) throws URISyntaxException {
        log.debug("REST request to update MediaDynamique : {}", mediaDynamique);
        if (mediaDynamique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MediaDynamique result = mediaDynamiqueRepository.save(mediaDynamique);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mediaDynamique.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /media-dynamiques} : get all the mediaDynamiques.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mediaDynamiques in body.
     */
    @GetMapping("/media-dynamiques")
    public List<MediaDynamique> getAllMediaDynamiques() {
        log.debug("REST request to get all MediaDynamiques");
        return mediaDynamiqueRepository.findAll();
    }

    /**
     * {@code GET  /media-dynamiques/:id} : get the "id" mediaDynamique.
     *
     * @param id the id of the mediaDynamique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mediaDynamique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/media-dynamiques/{id}")
    public ResponseEntity<MediaDynamique> getMediaDynamique(@PathVariable Long id) {
        log.debug("REST request to get MediaDynamique : {}", id);
        Optional<MediaDynamique> mediaDynamique = mediaDynamiqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mediaDynamique);
    }

    /**
     * {@code DELETE  /media-dynamiques/:id} : delete the "id" mediaDynamique.
     *
     * @param id the id of the mediaDynamique to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/media-dynamiques/{id}")
    public ResponseEntity<Void> deleteMediaDynamique(@PathVariable Long id) {
        log.debug("REST request to delete MediaDynamique : {}", id);
        mediaDynamiqueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
