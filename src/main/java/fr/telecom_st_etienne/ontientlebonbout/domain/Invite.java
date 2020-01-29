package fr.telecom_st_etienne.ontientlebonbout.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Task entity.\n@author The JHipster team.
 */
@ApiModel(description = "Task entity.\n@author The JHipster team.")
@Entity
//@Inheritance(strategy=InheritanceType.SINGLE_TABLE)		
@Table(name = "invite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "invite")
public class Invite extends User implements Serializable {

    private static final long serialVersionUID = 1L;
/*
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;*/

    @Column(name = "points")
    private Integer points;

    @OneToMany(mappedBy = "invite")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reponse> reponses = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("invites")
    private Questionnaire questionnaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
   /* public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }*/
    public Integer getPoints() {
        return points;
    }

    public Invite points(Integer points) {
        this.points = points;
        return this;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Set<Reponse> getReponses() {
        return reponses;
    }

    public Invite reponses(Set<Reponse> reponses) {
        this.reponses = reponses;
        return this;
    }

    public Invite addReponses(Reponse reponse) {
        this.reponses.add(reponse);
        reponse.setInvite(this);
        return this;
    }

    public Invite removeReponses(Reponse reponse) {
        this.reponses.remove(reponse);
        reponse.setInvite(null);
        return this;
    }

    public void setReponses(Set<Reponse> reponses) {
        this.reponses = reponses;
    }

    public Questionnaire getQuestionnaire() {
        return questionnaire;
    }

    public Invite questionnaire(Questionnaire questionnaire) {
        this.questionnaire = questionnaire;
        return this;
    }

    public void setQuestionnaire(Questionnaire questionnaire) {
        this.questionnaire = questionnaire;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove
/*
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Invite)) {
            return false;
        }
        return id != null && id.equals(((Invite) o).id);
    }
*/
    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Invite{" +
            "points=" + getPoints() +
            "}";
    }
}
