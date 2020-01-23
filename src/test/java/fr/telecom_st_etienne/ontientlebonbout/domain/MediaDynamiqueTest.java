package fr.telecom_st_etienne.ontientlebonbout.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.telecom_st_etienne.ontientlebonbout.web.rest.TestUtil;

public class MediaDynamiqueTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MediaDynamique.class);
        MediaDynamique mediaDynamique1 = new MediaDynamique();
        mediaDynamique1.setId(1L);
        MediaDynamique mediaDynamique2 = new MediaDynamique();
        mediaDynamique2.setId(mediaDynamique1.getId());
        assertThat(mediaDynamique1).isEqualTo(mediaDynamique2);
        mediaDynamique2.setId(2L);
        assertThat(mediaDynamique1).isNotEqualTo(mediaDynamique2);
        mediaDynamique1.setId(null);
        assertThat(mediaDynamique1).isNotEqualTo(mediaDynamique2);
    }
}
