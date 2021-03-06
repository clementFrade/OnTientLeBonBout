package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.domain.Theme;
import fr.telecom_st_etienne.ontientlebonbout.repository.ThemeRepository;
import fr.telecom_st_etienne.ontientlebonbout.repository.search.ThemeSearchRepository;
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
 * REST controller for managing {@link fr.telecom_st_etienne.ontientlebonbout.domain.Theme}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ThemeResource {

    private final Logger log = LoggerFactory.getLogger(ThemeResource.class);

    private static final String ENTITY_NAME = "theme";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ThemeRepository themeRepository;

    private final ThemeSearchRepository themeSearchRepository;

    public ThemeResource(ThemeRepository themeRepository, ThemeSearchRepository themeSearchRepository) {
        this.themeRepository = themeRepository;
        this.themeSearchRepository = themeSearchRepository;
    }

    /**
     * {@code POST  /themes} : Create a new theme.
     *
     * @param theme the theme to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new theme, or with status {@code 400 (Bad Request)} if the theme has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/themes")
    public ResponseEntity<Theme> createTheme(@RequestBody Theme theme) throws URISyntaxException {
        log.debug("REST request to save Theme : {}", theme);
        if (theme.getId() != null) {
            throw new BadRequestAlertException("A new theme cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Theme result = themeRepository.save(theme);
        themeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/themes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /themes} : Updates an existing theme.
     *
     * @param theme the theme to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated theme,
     * or with status {@code 400 (Bad Request)} if the theme is not valid,
     * or with status {@code 500 (Internal Server Error)} if the theme couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/themes")
    public ResponseEntity<Theme> updateTheme(@RequestBody Theme theme) throws URISyntaxException {
        log.debug("REST request to update Theme : {}", theme);
        if (theme.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Theme result = themeRepository.save(theme);
        themeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, theme.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /themes} : get all the themes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of themes in body.
     */
    @GetMapping("/themes")
    public List<Theme> getAllThemes() {
        log.debug("REST request to get all Themes");
        return themeRepository.findAll();
    }

    /**
     * {@code GET  /themes/:id} : get the "id" theme.
     *
     * @param id the id of the theme to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the theme, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/themes/{id}")
    public ResponseEntity<Theme> getTheme(@PathVariable Long id) {
        log.debug("REST request to get Theme : {}", id);
        Optional<Theme> theme = themeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(theme);
    }

    /**
     * {@code DELETE  /themes/:id} : delete the "id" theme.
     *
     * @param id the id of the theme to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/themes/{id}")
    public ResponseEntity<Void> deleteTheme(@PathVariable Long id) {
        log.debug("REST request to delete Theme : {}", id);
        themeRepository.deleteById(id);
        themeSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/themes?query=:query} : search for the theme corresponding
     * to the query.
     *
     * @param query the query of the theme search.
     * @return the result of the search.
     */
    @GetMapping("/_search/themes")
    public List<Theme> searchThemes(@RequestParam String query) {
        log.debug("REST request to search Themes for query {}", query);
        return StreamSupport
            .stream(themeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
