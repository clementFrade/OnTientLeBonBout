package fr.telecom_st_etienne.ontientlebonbout.web.rest;

import fr.telecom_st_etienne.ontientlebonbout.domain.Invite;
import fr.telecom_st_etienne.ontientlebonbout.repository.InviteRepository;
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
 * REST controller for managing {@link fr.telecom_st_etienne.ontientlebonbout.domain.Invite}.
 */
@RestController
@RequestMapping("/api")
public class InviteResource {

    private final Logger log = LoggerFactory.getLogger(InviteResource.class);

    private static final String ENTITY_NAME = "invite";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InviteRepository inviteRepository;

    public InviteResource(InviteRepository inviteRepository) {
        this.inviteRepository = inviteRepository;
    }

    /**
     * {@code POST  /invites} : Create a new invite.
     *
     * @param invite the invite to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new invite, or with status {@code 400 (Bad Request)} if the invite has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/invites")
    public ResponseEntity<Invite> createInvite(@RequestBody Invite invite) throws URISyntaxException {
        log.debug("REST request to save Invite : {}", invite);
        if (invite.getId() != null) {
            throw new BadRequestAlertException("A new invite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Invite result = inviteRepository.save(invite);
        return ResponseEntity.created(new URI("/api/invites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /invites} : Updates an existing invite.
     *
     * @param invite the invite to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated invite,
     * or with status {@code 400 (Bad Request)} if the invite is not valid,
     * or with status {@code 500 (Internal Server Error)} if the invite couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/invites")
    public ResponseEntity<Invite> updateInvite(@RequestBody Invite invite) throws URISyntaxException {
        log.debug("REST request to update Invite : {}", invite);
        if (invite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Invite result = inviteRepository.save(invite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, invite.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /invites} : get all the invites.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of invites in body.
     */
    @GetMapping("/invites")
    public List<Invite> getAllInvites() {
        log.debug("REST request to get all Invites");
        return inviteRepository.findAll();
    }

    /**
     * {@code GET  /invites/:id} : get the "id" invite.
     *
     * @param id the id of the invite to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the invite, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/invites/{id}")
    public ResponseEntity<Invite> getInvite(@PathVariable Long id) {
        log.debug("REST request to get Invite : {}", id);
        Optional<Invite> invite = inviteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(invite);
    }

    /**
     * {@code DELETE  /invites/:id} : delete the "id" invite.
     *
     * @param id the id of the invite to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/invites/{id}")
    public ResponseEntity<Void> deleteInvite(@PathVariable Long id) {
        log.debug("REST request to delete Invite : {}", id);
        inviteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
