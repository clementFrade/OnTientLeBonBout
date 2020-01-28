package fr.telecom_st_etienne.ontientlebonbout.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Questionnaire.
 */
@Entity
@Table(name = "questionnaire")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Questionnaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("questionnaires")
    private Client client;

    @OneToMany(mappedBy = "questionnaire")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Invite> invites = new HashSet<>();

    @OneToMany(mappedBy = "questionnaire")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Question> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public Questionnaire client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<Invite> getInvites() {
        return invites;
    }

    public Questionnaire invites(Set<Invite> invites) {
        this.invites = invites;
        return this;
    }

    public Questionnaire addInvites(Invite invite) {
        this.invites.add(invite);
        invite.setQuestionnaire(this);
        return this;
    }

    public Questionnaire removeInvites(Invite invite) {
        this.invites.remove(invite);
        invite.setQuestionnaire(null);
        return this;
    }

    public void setInvites(Set<Invite> invites) {
        this.invites = invites;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public Questionnaire questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public Questionnaire addQuestions(Question question) {
        this.questions.add(question);
        question.setQuestionnaire(this);
        return this;
    }

    public Questionnaire removeQuestions(Question question) {
        this.questions.remove(question);
        question.setQuestionnaire(null);
        return this;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Questionnaire)) {
            return false;
        }
        return id != null && id.equals(((Questionnaire) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Questionnaire{" +
            "id=" + getId() +
            "}";
    }
}
