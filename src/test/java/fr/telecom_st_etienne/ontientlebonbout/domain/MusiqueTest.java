package fr.telecom_st_etienne.ontientlebonbout.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.telecom_st_etienne.ontientlebonbout.web.rest.TestUtil;

public class MusiqueTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Musique.class);
        Musique musique1 = new Musique();
        musique1.setId(1L);
        Musique musique2 = new Musique();
        musique2.setId(musique1.getId());
        assertThat(musique1).isEqualTo(musique2);
        musique2.setId(2L);
        assertThat(musique1).isNotEqualTo(musique2);
        musique1.setId(null);
        assertThat(musique1).isNotEqualTo(musique2);
    }
}
