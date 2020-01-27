package fr.telecom_st_etienne.ontientlebonbout.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.telecom_st_etienne.ontientlebonbout.web.rest.TestUtil;

public class MediaStatiqueTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MediaStatique.class);
        MediaStatique mediaStatique1 = new MediaStatique();
        mediaStatique1.setId(1L);
        MediaStatique mediaStatique2 = new MediaStatique();
        mediaStatique2.setId(mediaStatique1.getId());
        assertThat(mediaStatique1).isEqualTo(mediaStatique2);
        mediaStatique2.setId(2L);
        assertThat(mediaStatique1).isNotEqualTo(mediaStatique2);
        mediaStatique1.setId(null);
        assertThat(mediaStatique1).isNotEqualTo(mediaStatique2);
    }
}
