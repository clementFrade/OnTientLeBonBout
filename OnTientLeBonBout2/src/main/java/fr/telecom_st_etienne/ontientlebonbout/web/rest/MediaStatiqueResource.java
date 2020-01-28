package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.domain.MediaStatique;
import fr.telecom_st_etienne.ontientlebonbout.repository.MediaStatiqueRepository;
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
 * REST controller for managing {@link fr.telecom_st_etienne.ontientlebonbout.domain.MediaStatique}.
 */
@RestController
@RequestMapping("/api")
public class MediaStatiqueResource {

    private final Logger log = LoggerFactory.getLogger(MediaStatiqueResource.class);

    private static final String ENTITY_NAME = "mediaStatique";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MediaStatiqueRepository mediaStatiqueRepository;

    public MediaStatiqueResource(MediaStatiqueRepository mediaStatiqueRepository) {
        this.mediaStatiqueRepository = mediaStatiqueRepository;
    }

    /**
     * {@code POST  /media-statiques} : Create a new mediaStatique.
     *
     * @param mediaStatique the mediaStatique to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mediaStatique, or with status {@code 400 (Bad Request)} if the mediaStatique has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/media-statiques")
    public ResponseEntity<MediaStatique> createMediaStatique(@RequestBody MediaStatique mediaStatique) throws URISyntaxException {
        log.debug("REST request to save MediaStatique : {}", mediaStatique);
        if (mediaStatique.getId() != null) {
            throw new BadRequestAlertException("A new mediaStatique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MediaStatique result = mediaStatiqueRepository.save(mediaStatique);
        return ResponseEntity.created(new URI("/api/media-statiques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /media-statiques} : Updates an existing mediaStatique.
     *
     * @param mediaStatique the mediaStatique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mediaStatique,
     * or with status {@code 400 (Bad Request)} if the mediaStatique is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mediaStatique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/media-statiques")
    public ResponseEntity<MediaStatique> updateMediaStatique(@RequestBody MediaStatique mediaStatique) throws URISyntaxException {
        log.debug("REST request to update MediaStatique : {}", mediaStatique);
        if (mediaStatique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MediaStatique result = mediaStatiqueRepository.save(mediaStatique);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mediaStatique.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /media-statiques} : get all the mediaStatiques.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mediaStatiques in body.
     */
    @GetMapping("/media-statiques")
    public List<MediaStatique> getAllMediaStatiques() {
        log.debug("REST request to get all MediaStatiques");
        return mediaStatiqueRepository.findAll();
    }

    /**
     * {@code GET  /media-statiques/:id} : get the "id" mediaStatique.
     *
     * @param id the id of the mediaStatique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mediaStatique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/media-statiques/{id}")
    public ResponseEntity<MediaStatique> getMediaStatique(@PathVariable Long id) {
        log.debug("REST request to get MediaStatique : {}", id);
        Optional<MediaStatique> mediaStatique = mediaStatiqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mediaStatique);
    }

    /**
     * {@code DELETE  /media-statiques/:id} : delete the "id" mediaStatique.
     *
     * @param id the id of the mediaStatique to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/media-statiques/{id}")
    public ResponseEntity<Void> deleteMediaStatique(@PathVariable Long id) {
        log.debug("REST request to delete MediaStatique : {}", id);
        mediaStatiqueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
