package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.domain.Video;
import fr.telecom_st_etienne.ontientlebonbout.repository.VideoRepository;
import fr.telecom_st_etienne.ontientlebonbout.repository.search.VideoSearchRepository;
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
 * REST controller for managing {@link fr.telecom_st_etienne.ontientlebonbout.domain.Video}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VideoResource {

    private final Logger log = LoggerFactory.getLogger(VideoResource.class);

    private static final String ENTITY_NAME = "video";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VideoRepository videoRepository;

    private final VideoSearchRepository videoSearchRepository;

    public VideoResource(VideoRepository videoRepository, VideoSearchRepository videoSearchRepository) {
        this.videoRepository = videoRepository;
        this.videoSearchRepository = videoSearchRepository;
    }

    /**
     * {@code POST  /videos} : Create a new video.
     *
     * @param video the video to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new video, or with status {@code 400 (Bad Request)} if the video has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/videos")
    public ResponseEntity<Video> createVideo(@RequestBody Video video) throws URISyntaxException {
        log.debug("REST request to save Video : {}", video);
        if (video.getId() != null) {
            throw new BadRequestAlertException("A new video cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Video result = videoRepository.save(video);
        videoSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/videos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /videos} : Updates an existing video.
     *
     * @param video the video to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated video,
     * or with status {@code 400 (Bad Request)} if the video is not valid,
     * or with status {@code 500 (Internal Server Error)} if the video couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/videos")
    public ResponseEntity<Video> updateVideo(@RequestBody Video video) throws URISyntaxException {
        log.debug("REST request to update Video : {}", video);
        if (video.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Video result = videoRepository.save(video);
        videoSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, video.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /videos} : get all the videos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of videos in body.
     */
    @GetMapping("/videos")
    public List<Video> getAllVideos() {
        log.debug("REST request to get all Videos");
        return videoRepository.findAll();
    }

    /**
     * {@code GET  /videos/:id} : get the "id" video.
     *
     * @param id the id of the video to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the video, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/videos/{id}")
    public ResponseEntity<Video> getVideo(@PathVariable Long id) {
        log.debug("REST request to get Video : {}", id);
        Optional<Video> video = videoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(video);
    }

    /**
     * {@code DELETE  /videos/:id} : delete the "id" video.
     *
     * @param id the id of the video to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/videos/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable Long id) {
        log.debug("REST request to delete Video : {}", id);
        videoRepository.deleteById(id);
        videoSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/videos?query=:query} : search for the video corresponding
     * to the query.
     *
     * @param query the query of the video search.
     * @return the result of the search.
     */
    @GetMapping("/_search/videos")
    public List<Video> searchVideos(@RequestParam String query) {
        log.debug("REST request to search Videos for query {}", query);
        return StreamSupport
            .stream(videoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
