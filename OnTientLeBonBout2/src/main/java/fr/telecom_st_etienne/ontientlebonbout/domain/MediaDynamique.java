package fr.telecom_st_etienne.ontientlebonbout.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A MediaDynamique.
 */
@Entity
@Table(name = "media_dynamique")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MediaDynamique implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "duree_seconde")
    private Integer dureeSeconde;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDureeSeconde() {
        return dureeSeconde;
    }

    public MediaDynamique dureeSeconde(Integer dureeSeconde) {
        this.dureeSeconde = dureeSeconde;
        return this;
    }

    public void setDureeSeconde(Integer dureeSeconde) {
        this.dureeSeconde = dureeSeconde;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MediaDynamique)) {
            return false;
        }
        return id != null && id.equals(((MediaDynamique) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MediaDynamique{" +
            "id=" + getId() +
            ", dureeSeconde=" + getDureeSeconde() +
            "}";
    }
}
