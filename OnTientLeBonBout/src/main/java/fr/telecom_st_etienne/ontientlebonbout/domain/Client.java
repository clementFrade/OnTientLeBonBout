package fr.telecom_st_etienne.ontientlebonbout.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Client.
 */
@Entity
@Table(name = "client")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Client extends User implements Serializable {

    private static final long serialVersionUID = 1L;

    @OneToMany(mappedBy = "client")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Questionnaire> questionnaires = new HashSet<>();
    public Set<Questionnaire> getQuestionnaires() {
        return questionnaires;
    }

    public Client questionnaires(Set<Questionnaire> questionnaires) {
        this.questionnaires = questionnaires;
        return this;
    }

    public Client addQuestionnaires(Questionnaire questionnaire) {
        this.questionnaires.add(questionnaire);
        questionnaire.setClient(this);
        return this;
    }

    public Client removeQuestionnaires(Questionnaire questionnaire) {
        this.questionnaires.remove(questionnaire);
        questionnaire.setClient(null);
        return this;
    }

    public void setQuestionnaires(Set<Questionnaire> questionnaires) {
        this.questionnaires = questionnaires;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove
/*
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Client)) {
            return false;
        }
        return id != null && id.equals(((Client) o).id);
    }*/

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Client";
    }
}
