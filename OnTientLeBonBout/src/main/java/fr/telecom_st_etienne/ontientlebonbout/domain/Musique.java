package fr.telecom_st_etienne.ontientlebonbout.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Musique.
 */
@Entity
@Table(name = "musique")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Musique implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "artiste")
    private String artiste;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getArtiste() {
        return artiste;
    }

    public Musique artiste(String artiste) {
        this.artiste = artiste;
        return this;
    }

    public void setArtiste(String artiste) {
        this.artiste = artiste;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Musique)) {
            return false;
        }
        return id != null && id.equals(((Musique) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Musique{" +
            "id=" + getId() +
            ", artiste='" + getArtiste() + "'" +
            "}";
    }
}
